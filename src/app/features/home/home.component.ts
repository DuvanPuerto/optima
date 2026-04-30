import { Component } from '@angular/core';
import { HeroComponent } from './sections/hero/hero.component';
import { StatsComponent } from './sections/stats/stats.component';
import { EntidadesComponent } from './sections/entidades/entidades.component';
import { ServicesComponent } from './sections/services/services.component';
import { AboutComponent } from './sections/about/about.component';
import { ResumeComponent } from './sections/resume/resume.component';
import { CalculatorsPreviewComponent } from './sections/calculators-preview/calculators-preview.component';
import { ResourcesComponent } from './sections/resources/resources.component';
import { FaqComponent } from './sections/faq/faq.component';
import { ContactComponent } from './sections/contact/contact.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeroComponent,
    StatsComponent,
    EntidadesComponent,
    ServicesComponent,
    AboutComponent,
    ResumeComponent,
    CalculatorsPreviewComponent,
    ResourcesComponent,
    FaqComponent,
    ContactComponent,
  ],
  template: `
    <app-hero />
    <app-stats />
    <app-entidades />
    <app-services />
    <app-about />
    <app-resume />
    <app-calculators-preview />
    <app-resources />
    <app-faq />
    <app-contact />
  `,
})
export class HomeComponent {}
