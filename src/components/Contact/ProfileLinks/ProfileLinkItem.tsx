import { useSelector } from "react-redux";
import { RootState } from "../../../types/typesOfState";

function ProfileLinkItem(props: any) {
  const { theme } = useSelector((state: RootState) => state.themeReducer);
  let appTheme = "";
  if (theme === "other") {
    appTheme = "darktheme__contacttype";
  }
  return (
    <a href={props.href} className="link" target="_blank" rel="noreferrer">
      <div className={`contacttype ${appTheme}`}>
        <img
          className="contacticon"
          src={props.image}
          alt={props.title + " icon"}
        />
        {props.title}
      </div>
    </a>
  );
}

export default ProfileLinkItem;
