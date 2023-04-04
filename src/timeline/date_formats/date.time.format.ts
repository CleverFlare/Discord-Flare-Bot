export function dateTimeValidator(date: string) {
  const regex = new RegExp(
    `\d{1,2}(-|/)\d{1,2}(-|/)\d{4}(\s\d{1,2}:\d{1,2}:\d{1,2}(:\d{1,2})?)?`,
    "gi"
  );
  if (regex.test(date)) return true;
  return false;
}

export default function dateTimeFormat(date: string): Date {
  if (isNaN(Date.parse(date))) throw Error("Incorrect Date Time Format");
  return new Date(date);
}
