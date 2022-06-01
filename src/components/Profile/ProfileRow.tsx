import { useSelector } from "react-redux";
import { UserContactLinkType } from "../../types/typesOfModels/UserType";
import { RootState } from "../../types/typesOfState";

type ProfileRowType = {
  title?: string;
  data?: any;
  publicity?: string | boolean | undefined;
};

export default function ProfileRow({
  title,
  data,
  publicity = "none",
}: ProfileRowType) {
  if (typeof data === "undefined" || data.length === 0 || data === " ")
    data = "unset";
  if (title === "Birthday" && data === "1000-01-01T00:00:00.000Z")
    data = new Date(data).toDateString();
  if (title === "Birthday" && data === "Wed Jan 01 1000") data = "unset";

  let visibility: string =
    data === "unset"
      ? "(private)"
      : publicity !== "none" && publicity
      ? "(public)"
      : publicity !== "none" && !publicity
      ? "(private)"
      : data === "unset"
      ? "(private)"
      : "";

  const { theme } = useSelector((state: RootState) => state.themeReducer);
  let titleTheme = "profile__row__title";
  let linkTheme = "profile__row__data--links";
  let rowTheme = "profile__row__data";
  if (theme === "other") {
    titleTheme += " darktheme__data--title";
    linkTheme += " darktheme__data--link";
  }

  let statsArray = [
    "Comments",
    "Favorites",
    "Followers",
    "Following",
    "Ideas",
    "Power level",
  ];
  rowTheme +=
    title && statsArray.includes(title) ? " profile__row__data--stats" : "";

  if (title === "Links") {
    return (
      <div className="profile__row">
        {title ? (
          <span className={titleTheme}>
            {title}
            <span className="profile__row__visibility">{visibility}</span>
          </span>
        ) : null}
        {Array.isArray(data) &&
          data.map((link: UserContactLinkType, i: number) => {
            return (
              link.title &&
              link.url && (
                <span key={i} className={rowTheme}>
                  <a
                    href={link.url}
                    className={linkTheme}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    [{link.title}]
                  </a>
                </span>
              )
            );
          })}
      </div>
    );
  }
  if (title === "Bio")
    return (
      <div className="profile__row">
        {data.split("\n").map((paragraph: string, i: number) => {
          return (
            <p
              key={i}
              className="profile__row__data profile__row__data--bio break-word preserveLinebreak"
            >
              {paragraph}
            </p>
          );
        })}
      </div>
    );

  return (
    <div className="profile__row">
      {title ? (
        <span className={titleTheme}>
          {title}
          <span className="profile__row__visibility">{visibility}</span>
        </span>
      ) : null}
      <p className={rowTheme}>{data}</p>
    </div>
  );
}
