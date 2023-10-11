export function P2e(dataCountPe) {
  if (dataCountPe === undefined) return dataCountPe;
  let en = dataCountPe.replace(/[۰-۹]/g, (d) => "۰۱۲۳۴۵۶۷۸۹".indexOf(d));
  return en;
}
export function E2p(dataCountEn) {
  if (dataCountEn === undefined) return dataCountEn;
  let pe = dataCountEn.replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[d]);
  return pe;
}
