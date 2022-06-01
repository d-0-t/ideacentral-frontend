//prettier-ignore
const writtenMonths = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
//prettier-ignore
const daysOfWeek = [ "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday" ];

const twoDigitNumerics = (n: number) => {
  return String(n).length === 1 ? `0${n}` : n;
};

export default function dateParser(
  originalDate: string | Date,
  month: "numeric" | "written" | "written short" = "numeric",
  day: boolean = false,
  time: boolean = false,
  seconds: boolean = false
) {
  let newDate = new Date(originalDate);
  //@ts-ignore
  //eslint-disable-next-line
  if (!newDate || newDate == "Invalid Date") return null;

  //prettier-ignore
  let parsedDate =
      month === "numeric"
            ? newDate.getFullYear() + "-" +
              twoDigitNumerics(newDate.getMonth() + 1) + "-" +
              twoDigitNumerics(newDate.getDate())
    : month === "written"
            ? newDate.getFullYear() + " " +
              writtenMonths[newDate.getMonth()] + " " +
              twoDigitNumerics(newDate.getDate())
    : month === "written short"
            ? newDate.getFullYear() + " " +
              writtenMonths[newDate.getMonth()].slice(0, 3) + " " +
              twoDigitNumerics(newDate.getDate())
    : null;

  parsedDate += !day ? "" : `, ${daysOfWeek[newDate.getDay()]}`;

  parsedDate += !time
    ? ""
    : " " +
      twoDigitNumerics(newDate.getHours()) +
      ":" +
      twoDigitNumerics(newDate.getMinutes());

  parsedDate += !seconds ? "" : ":" + twoDigitNumerics(newDate.getSeconds());

  return parsedDate;
}
