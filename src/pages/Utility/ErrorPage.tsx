import { useSelector } from "react-redux";
import { RootState } from "../../types/typesOfState";
import { ErrorResponseType } from "../../types/typesOfUtility";

const gif404 = require("../../assets/images/404-error.gif");

function ErrorPage({ error }: ErrorResponseType | any) {
  const { theme } = useSelector((state: RootState) => state.themeReducer);
  let gifTheme = "";
  if (theme === "other") {
    gifTheme = "darktheme__error404gif";
  }
  return (
    <div className="App">
      <main className="error404">
        <div className="error404__text">
          <h1 className="error404__text__title">{error.status}</h1>
          <p className="error404__text__description">
            {error.message ? error.message : error.statusText}
          </p>
          <p className="error404__text__description error404__text__description__ascii">
            ¯\_(ツ)_/¯
          </p>
        </div>
        <div className="error404__gifcontainer">
          <img
            alt="error 404 gif"
            src={gif404}
            className={`error404__gifcontainer__img ${gifTheme}`}
          />
        </div>
      </main>
    </div>
  );
}

export default ErrorPage;
