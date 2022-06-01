import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "../components/Auth/LoginForm";
import RegistrationForm from "../components/Auth/RegistrationForm";

function Auth() {
  document.title = "Log in - IdeaCentral"
  const token = localStorage.getItem("token");

  const [regVisibility, setRegVisibility]: any = useState("hidden");
  function toggleRegistration(): void {
    if (regVisibility === "hidden") return setRegVisibility("visible");
    if (regVisibility === "visible") return setRegVisibility("hidden");
  }

  const navigate = useNavigate();
  if (token) {
    setTimeout(() => navigate("/profile"), 3000);
    return (
      <div className="App">
        <div className="prompt">You're logged in. Redirecting...</div>
      </div>
    );
  }

  return (
    <div className="App">
      {regVisibility === "visible" ? (
        <div>
          <div className="prompt">
            <span className="prompt__action" onClick={toggleRegistration}>
              Click here
            </span>{" "}
            to log in!
          </div>
          <RegistrationForm />
        </div>
      ) : (
        <div>
          <div className="prompt">
            <LoginForm />
            If you don't have an account,{" "}
            <span className="prompt__action" onClick={toggleRegistration}>
              click here
            </span>{" "}
            to register!
          </div>
        </div>
      )}
    </div>
  );
}

export default Auth;
