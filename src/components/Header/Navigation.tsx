import ButtonNavigation from "../Buttons/ButtonNavigation";

function Navigation() {
  let btnClass = "nav__item__btn";
  let token = localStorage.getItem("token");

  if (token)
    return (
      <nav>
        <ul className="nav">
          <ButtonNavigation
            classToApply={btnClass}
            linkToPath="/"
            buttonText="Home"
          />
          <ButtonNavigation
            classToApply={btnClass}
            linkToPath="/ideas/public"
            buttonText="Ideas"
          />
          <ButtonNavigation
            classToApply={btnClass}
            linkToPath="/profile"
            buttonText="Profile"
          />
          <ButtonNavigation
            classToApply={btnClass}
            linkToPath="/auth"
            buttonText="Log out"
          />
        </ul>
      </nav>
    );
  else {
    return (
      <nav>
        <ul className="nav">
          <ButtonNavigation
            classToApply={btnClass}
            linkToPath="/"
            buttonText="Home"
          />
          <ButtonNavigation
            classToApply={btnClass}
            linkToPath="/ideas/public"
            buttonText="Ideas"
          />
          <ButtonNavigation
            classToApply={btnClass}
            linkToPath="/auth"
            buttonText="Log in"
          />
        </ul>
      </nav>
    );
  }
}

export default Navigation;
