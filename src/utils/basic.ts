import dayjs from "dayjs";

export const getToday = () => {
  return dayjs().format("YYYY-MM-DD");
};

export const formattedDate = (d = new Date()) => {
  return dayjs(d).format("YYYY-MM-DD");
};

export const formattedTime = (d = new Date()) => {
  return dayjs(d).format("HH:mm");
};

export const camelCaseToStartCase = camelCase => {
  if (!camelCase) {
    return "";
  }
  var pascalCase = camelCase.charAt(0).toUpperCase() + camelCase.substr(1);
  return pascalCase
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/([A-Z])([A-Z][a-z])/g, "$1 $2")
    .replace(/([a-z])([0-9])/gi, "$1 $2")
    .replace(/([0-9])([a-z])/gi, "$1 $2")
    .replace("Grn", "GRN");
};

export const formattedTimeStamp = (d = new Date()) => {
  return dayjs(d).format("YYYY-MM-DD HH:mm:ss");
};

export const toFriendlyCellValue = c => {
  return c.value
    ? c.id.toLowerCase().includes("time", " on")
      ? formattedTimeStamp(utc2local(c.value))
      : c.value
    : "NA";
};

export const toUTCDateTime = modalData => {
  const d = dayjs(`${modalData.date} ${modalData.time}`, "MM-DD-YYYY HH:mm");
  return local2utc(d.toDate().getTime()).getTime();
};

/*
 * Returns UTC date object from given local timestamp
 * If not passed returns ready to send UTC timestamp
 */
export const local2utc = (localTimeStamp?) => {
  const dateInLocal = !localTimeStamp ? new Date() : new Date(localTimeStamp);
  return new Date(
    dateInLocal.getTime() + dateInLocal.getTimezoneOffset() * 60 * 1000
  );
};

/*
 * Returns Local date object from given UTC timestamp typically comes from server side
 */
export const utc2local = (utcTimeStamp?) => {
  const dateInUtc = !utcTimeStamp ? local2utc() : new Date(utcTimeStamp);
  return new Date(
    dateInUtc.getTime() - dateInUtc.getTimezoneOffset() * 60 * 1000
  );
};
