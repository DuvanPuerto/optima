import { Directive, ElementRef, HostBinding, HostListener, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

/**
 * Directive that formats currency inputs with thousands separators (Colombian locale).
 * Binds to reactive form controls and emits plain numeric values.
 * Usage: <input appCurrencyInput formControlName="amount" ...>
 */
@Directive({
  selector: 'input[appCurrencyInput]',
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CurrencyInputDirective),
      multi: true,
    },
  ],
})
export class CurrencyInputDirective implements ControlValueAccessor {
  @HostBinding('attr.inputmode') readonly inputmode = 'numeric';
  @HostBinding('type') readonly type = 'text';
  @HostBinding('autocomplete') readonly autocomplete = 'off';

  private onChange: (v: number | null) => void = () => {};
  private onTouched: () => void = () => {};

  constructor(private el: ElementRef<HTMLInputElement>) {}

  @HostListener('input', ['$event'])
  onInput(event: Event): void {
    const raw = (event.target as HTMLInputElement).value;
    const digits = raw.replace(/\D/g, '');
    const num = digits.length > 0 ? parseInt(digits, 10) : null;

    // Keep cursor stable relative to right edge
    const prevLen = this.el.nativeElement.value.length;
    const cursorFromEnd = prevLen - (this.el.nativeElement.selectionStart ?? prevLen);

    const formatted = num !== null ? this.format(num) : '';
    this.el.nativeElement.value = formatted;

    const newPos = Math.max(0, formatted.length - cursorFromEnd);
    this.el.nativeElement.setSelectionRange(newPos, newPos);

    this.onChange(num);
  }

  @HostListener('blur')
  onBlur(): void {
    this.onTouched();
  }

  writeValue(value: number | null): void {
    this.el.nativeElement.value = value != null ? this.format(value) : '';
  }

  registerOnChange(fn: (v: number | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(disabled: boolean): void {
    this.el.nativeElement.disabled = disabled;
  }

  private format(v: number): string {
    return new Intl.NumberFormat('es-CO').format(v);
  }
}
