export function dateToString(date: Date, format: string): string {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  return format
    .replace("YYYY", year.toString())
    .replace("MM", month.toString().padStart(2, "0"))
    .replace("DD", day.toString().padStart(2, "0"))
    .replace("hh", hours.toString().padStart(2, "0"))
    .replace("mm", minutes.toString().padStart(2, "0"))
    .replace("ss", seconds.toString().padStart(2, "0"));
}

export function extractDate(date: Date): string {
  return dateToString(date, "YYYY-MM-DD");
}

export function extractTime(date: Date): string {
  return dateToString(date, "hh:mm:ss");
}

export function addDays(date: Date, days: number): Date {
  const newDate = new Date(date);
  newDate.setDate(date.getDate() + days);
  return newDate;
}

export function addMonths(date: Date, months: number): Date {
  const newDate = new Date(date);
  newDate.setMonth(date.getMonth() + months);
  return newDate;
}

export function addYears(date: Date, years: number): Date {
  const newDate = new Date(date);
  newDate.setFullYear(date.getFullYear() + years);
  return newDate;
}

export function isBefore(date: Date, compare: Date): boolean {
  return date.getTime() < compare.getTime();
}

export function isAfter(date: Date, compare: Date): boolean {
  return date.getTime() > compare.getTime();
}

export function isSame(date: Date, compare: Date): boolean {
  return date.getTime() === compare.getTime();
}

export function isBetween(date: Date, start: Date, end: Date): boolean {
  return date.getTime() >= start.getTime() && date.getTime() <= end.getTime();
}

export function isValidDate(date: Date): boolean {
  return !isNaN(date.getTime());
}

export function isValidDateString(date: string): boolean {
  return isValidDate(new Date(date));
}
