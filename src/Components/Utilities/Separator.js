export function Separator(numStr) {
  if (numStr === "") return "";
  if (numStr > "9223372036854776000") {
    Notification("warning", "مقدار وارد شده اشتباه است");
    return "";
  }
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 0,
  }).format(numStr);
}
