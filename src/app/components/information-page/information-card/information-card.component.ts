import { Component, Input, signal } from '@angular/core';
import { InfoMetric, Metric } from '../../../shared/interfaces/interfaces';

@Component({
  selector: 'app-information-card',
  imports: [],
  standalone: true,
  templateUrl: './information-card.component.html',
  styleUrl: './information-card.component.scss',
})
export class InformationCardComponent {
  @Input() infoMetric!: InfoMetric;

  public year = signal<string>('2020');

  public getMetricByYear(): Metric[] {
    return this.infoMetric.data.filter((metric) => metric.year === this.year());
  }

  public setYear(year: string): void {
    this.year.set(year);
  }
}
