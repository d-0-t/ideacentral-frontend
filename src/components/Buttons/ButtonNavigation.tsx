import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ButtonNavigationType } from "../../types/typesOfButtons";
import { RootState } from "../../types/typesOfState";

function ButtonNavigation({
  linkToPath,
  classToApply,
  buttonText,
}: ButtonNavigationType) {
  let navigate = useNavigate();

  const { theme } = useSelector((state: RootState) => state.themeReducer);
  let navTheme = "";
  let navThemeActive = "";
  if (theme === "other") {
    navTheme = " darktheme__nav-item";
    navThemeActive = " darktheme__nav-item--active";
    classToApply += " darktheme__nav-item__btn";
  }

  let isItActive = "nav__item";
  if (
    linkToPath === window.location.pathname ||
    linkToPath + "/" === window.location.pathname
  ) {
    isItActive += " nav__item--active" + navThemeActive;
  } else {
    isItActive += navTheme;
  }

  function logOut() {
    localStorage.removeItem("token");
  }

  if (buttonText === "Log out")
    return (
      <li className={isItActive}>
        <a className={classToApply} onClick={logOut} href="/">
          {buttonText}
        </a>
      </li>
    );

  return (
    <li className={isItActive}>
      <div className={classToApply} onClick={() => navigate(linkToPath)}>
        {buttonText}
      </div>
    </li>
  );
}

export default ButtonNavigation;
