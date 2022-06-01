import { useSelector } from "react-redux";
import { RootState } from "../../types/typesOfState";

export default function FieldError({ error, touched }: any) {
  const { theme } = useSelector((state: RootState) => state.themeReducer);
  let themeError = "formfield__error";
  if (theme === "other") themeError += " darktheme__fieldError";

  if (error && touched) {
    return (
      <div className={themeError}>{error}</div>
    );
  }
  return <></>;
}
