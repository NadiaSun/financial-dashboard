// export interface Environment {
//   production: boolean;
//   apiUrl: string;
// }

export interface User {
  id: number;
  user: string;
  issuance_date: string;
  return_date: string;
  actual_return_date: string;
  body: number;
  percent: number;
}

export interface Metric {
  month: string;
  counter: number;
  year: string;
  sum: number;
}

export interface InfoMetric {
  title: string;
  years: string[];
  data: Metric[];
}

export interface ITopUser {
  user: string;
  counter: number;
}
