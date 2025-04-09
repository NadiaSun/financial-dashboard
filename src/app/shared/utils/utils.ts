import { NgbDate } from '@ng-bootstrap/ng-bootstrap';

export function parseDate(date: string): Date {
  return new Date(date);
}

export function parseNullableDate(value: string | null): Date | null {
  if (value) {
    return parseDate(value);
  } else {
    return null;
  }
}

export function getDate(obj: NgbDate): string {
  const date = Object.values(obj);
  return date.join('-');
}

export function checkDate(value: string): boolean {
  const date = new Date(value);
  return !isNaN(date.getTime());
}
