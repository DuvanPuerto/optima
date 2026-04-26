import { Component } from '@angular/core';
import { ENTITIES, TOOLS } from '../../../../config/content.config';

@Component({
  selector: 'app-entidades',
  standalone: true,
  templateUrl: './entidades.component.html',
})
export class EntidadesComponent {
  readonly entities = ENTITIES;
  readonly tools = TOOLS;
}
