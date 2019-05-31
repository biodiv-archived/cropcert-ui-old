export const getToday = () => {
  const local = new Date();
  local.setMinutes(local.getMinutes() - local.getTimezoneOffset());
  return local.toJSON().slice(0, 10);
};

export const formattedDate = d => {
  d = new Date(d || new Date().getTime());
  let month = "" + (d.getMonth() + 1);
  let day = "" + d.getDate();
  const year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
};

export const formattedTime = d => {
  d = new Date(d || new Date().getTime());
  let m = "" + d.getMinutes();
  let h = "" + d.getHours();

  if (m.length < 2) m = "0" + m;
  if (h.length < 2) h = "0" + h;

  return [h, m].join(":");
};

export const toFriendlyCellValue = c => {
  if (["perchmentQuantity", "processingTime"].includes(c.info.header)) {
    return c.value || "NA";
  }
  const d = new Date(c.value);
  if (d.getFullYear() < 2000) {
    return c.value;
  }
  let mm: any = d.getMonth() + 1;
  if (mm < 9) mm = "0" + mm;
  let dd: any = d.getDay() + 1;
  if (dd < 9) dd = "0" + dd;
  return `${d.getFullYear()}-${mm}-${dd} ${d.getHours()}:${d.getMinutes()}`;
};
