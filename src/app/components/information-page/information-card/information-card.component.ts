import { Component, Input, signal } from '@angular/core';
import { InfoMetric, Metric } from '../../../shared/interfaces/interfaces';

@Component({
  selector: 'app-information-card',
  imports: [],
  templateUrl: './information-card.component.html',
  styleUrl: './information-card.component.scss',
})
export class InformationCardComponent {
  public year = signal<string>('2020');

  @Input() infoMetric!: InfoMetric;

  getMetricByYear(): Metric[] {
    return this.infoMetric.data.filter((metric) => metric.year === this.year());
  }

  setYear(year: string) {
    this.year.set(year);
  }
}
