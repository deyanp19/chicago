function formatCST(dateInput) {
  const date = new Date(dateInput);

  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Chicago",
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }).format(date);
}

export default {
    formatCST
}