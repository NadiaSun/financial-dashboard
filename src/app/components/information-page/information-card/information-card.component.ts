import {
  ChangeDetectionStrategy,
  Component,
  Input,
  input,
  signal,
} from '@angular/core';
import { InfoMetric, Metric } from '../../../shared/interfaces/interfaces';

@Component({
  selector: 'app-information-card',
  imports: [],
  standalone: true,
  templateUrl: './information-card.component.html',
  styleUrl: './information-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InformationCardComponent {
  infoMetric = input<InfoMetric>();

  year = signal<string>('2020');

  getMetricByYear(): Metric[] {
    const metric = this.infoMetric();

    if (metric) {
      return metric.data.filter((m) => m.year === this.year());
    }
    return [];
  }

  setYear(year: string): void {
    this.year.set(year);
  }
}
