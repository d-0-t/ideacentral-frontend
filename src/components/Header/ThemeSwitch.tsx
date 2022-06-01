import { useDispatch, useSelector } from "react-redux";
import { getTheme } from "../../redux/actions/actionTheme";
import { RootState } from "../../types/typesOfState";

function ThemeSwitcher() {
  const { theme } = useSelector((state: RootState) => state.themeReducer);
  const dispatch = useDispatch();
  let otherTheme = "";
  if (theme === "other") {
    otherTheme = "darktheme__header__themeswitcher";
  }
  function handleClick() {
    if (theme === "") {
      dispatch(getTheme("other"));
    } else if (theme === "other") {
      dispatch(getTheme(""));
    }
  }
  return (
    <div className={`btn--theme-switcher ${otherTheme}`} onClick={handleClick}>
      💡
    </div>
  );
}

export default ThemeSwitcher;
