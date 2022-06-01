import { useSelector } from "react-redux";
import { RootState } from "../../types/typesOfState";

function ContactForm() {
  const { theme } = useSelector((state: RootState) => state.themeReducer);
  let appTheme = "";
  let btnTheme = "";
  let formTheme = "";
  let labelTheme = "";
  if (theme === "other") {
    appTheme = "darktheme__input";
    btnTheme = "darktheme__btn";
    formTheme = "darktheme__post";
    labelTheme = "darktheme__header__brand";
  }

  return (
    <div id="page-contact">
      <h2>Contact me!</h2>
      <form className={`form ${formTheme}`}>
        <div className="formfield">
          <label
            htmlFor="form-email"
            className={`formfield__label ${labelTheme}`}
            id="label-email"
          >
            Email:
          </label>
          <input
            type="email"
            className={`formfield__input ${appTheme}`}
            name="form-email"
            id="form-email"
            placeholder="Your email address"
            required
          ></input>
        </div>
        <div className="formfield">
          <label
            htmlFor="form-name"
            className={`formfield__label ${labelTheme}`}
            id="label-name"
          >
            Name:
          </label>
          <input
            type="text"
            className={`formfield__input ${appTheme}`}
            name="form-name"
            id="form-name"
            placeholder="Your name"
            required
          ></input>
        </div>
        <div className="formfield">
          <label
            htmlFor="form-message"
            className={`formfield__label ${labelTheme}`}
            id="label-text"
          >
            Message:
          </label>
          <div className="formfield__textarea-display">
            <textarea
              className={`formfield__textarea-display__textarea ${appTheme}`}
              name="form-message"
              id="form-message"
              placeholder="Don't use this form, it doesn't do anything. Nobody will see your message if you press the (disabled) Submit button."
              required
            ></textarea>
          </div>
        </div>
        <button
          className={`btn formfield__button ${btnTheme}`}
          type="submit"
          value="submit"
          disabled
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default ContactForm;
