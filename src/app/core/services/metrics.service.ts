import { Injectable, computed, inject, signal } from '@angular/core';
import { CreditDataService } from './credit-data.service';
import {
  ITopUser,
  InfoMetric,
  Metric,
} from '../../shared/interfaces/interfaces';

@Injectable({
  providedIn: 'root',
})
export class MetricsService {
  private creditDate: CreditDataService = inject(CreditDataService);

  public dataMetric = computed(() => {
    return this.creditDate.users();
  });
  public infoMetric = signal<InfoMetric>(this.getCreditsByMonth());

  public setInfoMetric(type: string): void {
    let metric = this.getCreditsByMonth();
    switch (type) {
      case 'credits':
        metric = this.getCreditsByMonth();
        break;
      case 'creditAmountAverage':
        metric = this.getCreditAmountByMonth('average');
        break;
      case 'creditAmountTotal':
        metric = this.getCreditAmountByMonth('total');
        break;
      case 'totalPercent':
        metric = this.getTotalPercentByMonth();
        break;
      case 'returnedCredits':
        metric = this.getReturnedCreditsByMonth();
        break;
    }

    this.infoMetric.set(metric);
  }

  private extractYearMonth(date: string): {
    month: string;
    year: string;
    key: string;
  } {
    const d = new Date(date);
    const month = d.toLocaleString('uk-UA', { month: 'long' });
    const year = d.getFullYear().toString();
    return { month, year, key: `${month} ${year}` };
  }

  private collectMetric(
    items: any[],
    getValue: (item: any) => number,
    filter?: (item: any) => boolean
  ): { data: { [key: string]: Metric }; years: string[] } {
    const years: string[] = [];
    const data: { [key: string]: Metric } = {};

    items.forEach((item) => {
      if (filter && !filter(item)) return;

      const { month, year, key } = this.extractYearMonth(item.issuance_date);
      years.push(year);

      if (!data[key]) {
        data[key] = { month, year, counter: 0, sum: 0 };
      }

      const value = getValue(item);
      data[key].counter += value;
      data[key].sum++;
    });

    return { data, years };
  }

  private getCreditsByMonth(): InfoMetric {
    const title = 'Загальна сума виданих кредитів';
    const { data, years } = this.collectMetric(this.dataMetric(), () => 1);

    return {
      title,
      years: [...new Set(years)],
      data: Object.values(data),
    };
  }

  private getCreditAmountByMonth(value: 'total' | 'average'): InfoMetric {
    const { data, years } = this.collectMetric(
      this.dataMetric(),
      (user) => user.body
    );
    const title =
      value === 'average' ? 'Середня сума кредитів' : 'Загальна сума кредитів';

    const metricData =
      value === 'average'
        ? Object.values(data).map((metric) => ({
            ...metric,
            counter: +(metric.counter / metric.sum).toFixed(2),
          }))
        : Object.values(data);

    return {
      title,
      years: [...new Set(years)],
      data: metricData,
    };
  }

  private getTotalPercentByMonth(): InfoMetric {
    const title = 'Загальна сума нарахованих відсотків';
    const { data, years } = this.collectMetric(
      this.dataMetric(),
      (user) => user.percent
    );

    return {
      title,
      years: [...new Set(years)],
      data: Object.values(data),
    };
  }

  private getReturnedCreditsByMonth(): InfoMetric {
    const title = 'Загальна кількість повернених кредитів';
    const { data, years } = this.collectMetric(
      this.dataMetric(),
      () => 1,
      (user) => !!user.actual_return_date
    );

    return {
      title,
      years: [...new Set(years)],
      data: Object.values(data),
    };
  }

  public getTopUsersByCredits(): ITopUser[] {
    const userCounts: { [user: string]: number } = {};

    this.dataMetric().forEach((metric) => {
      userCounts[metric.user] = (userCounts[metric.user] || 0) + 1;
    });

    return Object.entries(userCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 10)
      .map(([user, counter]) => ({ user, counter }));
  }

  public getTopUsersByPercent(): ITopUser[] {
    const userPercents: { [user: string]: number } = {};

    this.dataMetric().forEach((metric) => {
      if (metric.actual_return_date) {
        userPercents[metric.user] =
          (userPercents[metric.user] || 0) + metric.percent;
      }
    });
    return Object.entries(userPercents)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 10)
      .map(([user, counter]) => ({ user, counter }));
  }

  public getTopUsersByPercentRatio(): ITopUser[] {
    const userRatios: { [user: string]: number } = {};
    this.dataMetric().forEach((metric) => {
      if (metric.actual_return_date) {
        userRatios[metric.user] =
          (userRatios[metric.user] || 0) + metric.percent / metric.body;
      }
    });
    return Object.entries(userRatios)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 10)
      .map(([user, counter]) => ({ user, counter }));
  }
}
