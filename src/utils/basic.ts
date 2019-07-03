export const getToday = () => {
  const local = new Date();
  local.setMinutes(local.getMinutes() - local.getTimezoneOffset());
  return local.toJSON().slice(0, 10);
};

export const formattedDate = (d = new Date()) => {
  d = new Date(d || new Date().getTime());
  let month = "" + (d.getMonth() + 1);
  let day = "" + d.getDate();
  const year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
};

export const formattedTime = (d = new Date()) => {
  d = new Date(d || new Date().getTime());
  let m = "" + d.getMinutes();
  let h = "" + d.getHours();

  if (m.length < 2) m = "0" + m;
  if (h.length < 2) h = "0" + h;

  return [h, m].join(":");
};

export const formattedTimeStamp = (d = new Date()) => {
  return `${formattedDate(d)} ${formattedTime(d)}:00`;
};

export const toFriendlyCellValue = c => {
  return c.value
    ? c.id.toLowerCase().includes("time")
      ? formattedTimeStamp(new Date(c.value))
      : c.value
    : "NA";
};
