import { useSelector } from "react-redux";
import { RootState } from "../../types/typesOfState";

function Footer() {
  const { theme } = useSelector((state: RootState) => state.themeReducer);
  let otherTheme = "footer";
  if (theme === "other") {
    otherTheme = "darktheme__footer";
  }

  return (
    <footer className={otherTheme}>
      <div className="footer__text">Ⓒ All rights reserved by me in 2022.</div>
      <div className="footerlinks">
        <a
          href="https://www.linkedin.com/in/dora-sukolova-94420821b/"
          className="footerlinks__link"
          target="_blank"
          rel="noreferrer"
        >
          <div className="contacttype footerlinks__link">
            <img
              className="contacticon footerlinks__link__icon"
              src="https://cdn4.iconfinder.com/data/icons/social-icons-16/512/LinkedIn_alt-256.png"
              alt="LinkedIn icon"
            />
          </div>
        </a>

        <a
          href="https://github.com/d-0-t"
          className="footerlinks__link"
          target="_blank"
          rel="noreferrer"
        >
          <div className="contacttype footerlinks__link">
            <img
              className="contacticon footerlinks__link__icon invert"
              src="https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-social-github-256.png"
              alt="GitHub icon"
            />
          </div>
        </a>

        <a
          href="mailto:dsklv13@gmail.com"
          className="footerlinks__link"
          target="_blank"
          rel="noreferrer"
        >
          <div className="contacttype footerlinks__link">
            <img
              className="contacticon footerlinks__link__icon"
              src="https://cdn4.iconfinder.com/data/icons/logos-and-brands-1/512/147_Gmail_logo_logos-256.png"
              alt="E-mail icon"
            />
          </div>
        </a>
      </div>
    </footer>
  );
}

export default Footer;
