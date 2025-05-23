import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { InformationCardComponent } from '../information-card/information-card.component';
import { TopCardComponent } from '../top-card/top-card.component';
import { MetricsService } from '../../../core/services/metrics.service';

@Component({
  selector: 'app-info-container',
  standalone: true,
  imports: [InformationCardComponent, TopCardComponent],
  templateUrl: './info-container.component.html',
  styleUrl: './info-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InfoContainerComponent {
  metrics = inject(MetricsService);
  activeBtn = '';

  metricData: { key: string; title: string }[] = [
    { key: 'credits', title: 'Загальна кількість виданих кредитів' },
    { key: 'creditAmountAverage', title: 'Середня сума видачі кредитів' },
    { key: 'creditAmountTotal', title: 'Загальна сума виданих кредитів' },
    {
      key: 'totalPercent',
      title: 'Загальна сума нарахованих відсотків',
    },
    {
      key: 'returnedCredits',
      title: 'Загальна кількість повернених кредитів',
    },
  ];

  selectMetric(type: string): void {
    this.activeBtn = type;
    this.metrics.setInfoMetric(type);
  }
}
