const dateFormatter = new Intl.DateTimeFormat("sr-Latn-RS", {
  dateStyle: "long",
  timeZone: "UTC",
});

export function formatDate(date: string): string {
  return dateFormatter.format(new Date(date));
}
