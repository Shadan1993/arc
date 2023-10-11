/* eslint-disable */
export default {
  MaterialUnit: (key = "") => {
    if (key !== "" && key !== undefined) {
      return { KG: "کیلوگرم", NU: "عدد", MT: "متر", LT: "لیتر" }[key];
    } else {
      return [
        { value: "KG", name: "کیلوگرم" },
        { value: "NU", name: "عدد" },
        { value: "MT", name: "متر" },
        { value: "LT", name: "لیتر" },
      ];
    }
  },
  Resource: (key = "") => {
    if (key !== "" && key !== undefined) {
      return { SU: "سرپرست", OF: "شرکت", ST: "انبار" }[key];
    } else {
      return [
        { value: "SU", name: "سرپرست" },
        { value: "OF", name: "شرکت" },
        { value: "ST", name: "انبار" },
      ];
    }
  },
  ResourceCost: (key = "") => {
    if (key !== "" && key !== undefined) {
      return { SU: "سرپرست", OF: "شرکت" }[key];
    } else {
      return [
        { value: "SU", name: "سرپرست" },
        { value: "OF", name: "شرکت" },
      ];
    }
  },
};
