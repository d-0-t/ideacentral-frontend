import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../types/typesOfState";

function ButtonGoBack() {
  let navigate = useNavigate();

  const { theme } = useSelector((state: RootState) => state.themeReducer);
  let btnTheme = "btn nobreak";
  if (theme === "other") {
    btnTheme += " darktheme__btn darktheme__btn--back";
  }

  return (
    <div className={btnTheme} onClick={() => navigate(-1)}>
      ˂˂ Go back
    </div>
  );
}

export default ButtonGoBack;
