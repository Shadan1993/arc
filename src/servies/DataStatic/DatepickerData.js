import { P2e } from "../../Components/Utilities/ConvertCountFaToEn";
import {
  GergorianToPersian,
  GetYear,
} from "../../Components/Utilities/DateTime";
export function DatepickerData() {
  const opttt = {
    day: [],
    month: [
      { value: "01", label: "فروردین" },
      { value: "02", label: "اردیبهشت" },
      { value: "03", label: "خرداد" },
      { value: "04", label: "تیر" },
      { value: "05", label: "مرداد" },
      { value: "06", label: "شهریور" },
      { value: "07", label: "مهر" },
      { value: "08", label: "آبان" },
      { value: "09", label: "آذر" },
      { value: "10", label: "دی" },
      { value: "11", label: "بهمن" },
      { value: "12", label: "اسفند" },
    ],
    year: [],
  };
  let temp = [];
  var dateArrayMi = [];
  var dateArrayShi = [];
  for (let index = -2; index <= 4; index++) {
    var date = new Date();
    var tmp = new Date(date.setDate(date.getDate() + index));
    dateArrayMi.push(tmp);
    dateArrayShi.push(GergorianToPersian(tmp, "dddd D M MMMM YYYY"));
    opttt.day.push({
      value: P2e(GergorianToPersian(tmp, "DD")),
      label: GergorianToPersian(tmp, "dddd D"),
    });
  }
  for (let y = -1; y <= 1; y++) {
    let a = parseInt(GetYear(dateArrayMi[0]));
    opttt.year.push({ value: String(a + y), label: String(a + y) });
  }
  return opttt;
}
