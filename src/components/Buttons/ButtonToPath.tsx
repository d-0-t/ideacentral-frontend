import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../types/typesOfState";

function ButtonToPath({ linkToPath, title }: any) {
  let navigate = useNavigate();

  const { theme } = useSelector((state: RootState) => state.themeReducer);
  let btnTheme = "btn";
  if (theme === "other") {
    btnTheme += " darktheme__btn darktheme__btn--back";
  }

  return (
    <div className={btnTheme} onClick={() => navigate(linkToPath)}>
      {title}
    </div>
  );
}

export default ButtonToPath;
