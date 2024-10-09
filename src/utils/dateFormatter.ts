import {formatRelative, isValid} from 'date-fns';

export function dateFormatter(date: Date): string {
  const parsedDate = typeof date === 'string' ? new Date(date) : date;
  if (!isValid(parsedDate)) {
    return 'Invalid date';
  }
  return formatRelative(parsedDate, new Date());
}