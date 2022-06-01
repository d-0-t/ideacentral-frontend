import Navigation from "./Navigation";
import Branding from "./Branding";
import { useSelector } from "react-redux";
import { RootState } from "../../types/typesOfState";

function Header() {
  const { theme } = useSelector((state: RootState) => state.themeReducer);
  let otherTheme = "";
  if (theme === "other") {
    otherTheme = "darktheme__header";
  }

  return (
    <header>
      <div className={`header-navigation ${otherTheme}`}>
        <Branding />
        <Navigation />
        <div className="hamburger">
          <img
            className="hamburger__icon" alt="hamburger icon"
            src="https://cdn4.iconfinder.com/data/icons/wirecons-free-vector-icons/32/menu-alt-128.png"
          />
          <Navigation />
        </div>
      </div>
    </header>
  );
}

export default Header;
