import axios from "axios";
import jwtDecode from "jwt-decode";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Avatar from "../../components/Profile/Avatar";
import ProfileRow from "../../components/Profile/ProfileRow";
import Loading from "../../components/Utility/Loading";
import dateParser from "../../functions/dateParser";
import { getMyUser } from "../../redux/actions/actionUser";
import { RootState } from "../../types/typesOfState";
import { AuthType } from "../../types/typesOfUtility";

function Profile() {
  let token: any = localStorage.getItem("token");
  let auth: AuthType = jwtDecode(token);

  const { myUser } = useSelector((state: RootState) => state.userReducer);
  const dispatch = useDispatch();
  const API_URL = process.env.REACT_APP_API_URL;
  useEffect(() => {
    axios
      .get(`${API_URL}api/v1/users/${auth.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((data: any) => {
        dispatch(getMyUser(data.data));
      })
      .catch(function (error) {
        if (error?.response?.data) console.log(error.response.data);
      });
  }, [API_URL, auth.id, dispatch, token]);

  const navigate = useNavigate();

  const { theme } = useSelector((state: RootState) => state.themeReducer);
  let dataSectionTheme = "data-section";
  let buttonTheme = "btn";
  if (theme === "other") {
    dataSectionTheme += " darktheme__data-section";
    buttonTheme += " darktheme__btn";
  }

  while (myUser === null)
    return (
      <div className="App">
        <Loading />
      </div>
    );
  document.title = `My profile - IdeaCentral`;
  return (
    <div className="profile box max-800-wide">
      <div className="profile__head">
        <h1>My profile</h1>
        <div>
          <button
            className={buttonTheme}
            onClick={() => navigate(`/user/${auth.id}/`)}
          >
            View public profile
          </button>
          <button
            className={buttonTheme}
            onClick={() => navigate("/profile/edit")}
          >
            Edit
          </button>
        </div>
      </div>
      <div className="profile__body">
        <div className="profile__body__data">
          <div className="profile__avatar data-section__data">
            <Avatar
              username={myUser.login.username}
              url={myUser.personal.avatar}
              size="medium"
            />
          </div>
          <div className={dataSectionTheme + " data-section--stats"}>
            <div className="data-section__data data-section__data--stats">
              <ProfileRow title="Ideas" data={myUser.ideas.length} />
              <ProfileRow title="Power level" data={myUser.power} />
              <ProfileRow
                title="Comments"
                data={myUser.interactions.comments.length}
              />
              <ProfileRow
                title="Favorites"
                data={myUser.interactions.favorites.length}
              />
            </div>
            <div className="data-section__data data-section__data--stats">
              <ProfileRow
                title="Followers"
                data={myUser.follow.followers.count}
              />
              <ProfileRow
                title="Following"
                data={myUser.follow.following.count}
              />
            </div>
          </div>
        </div>
        <div className="profile__body__data">
          <div className={dataSectionTheme}>
            <h3>Registered information</h3>

            <div className="data-section__data">
              <ProfileRow title="Username" data={myUser.login.username} />
              <ProfileRow
                title="Email (registered)"
                data={myUser.login.email}
                publicity={false}
              />
            </div>
          </div>
          <div className={dataSectionTheme}>
            <h3>Personal information</h3>

            <div className="data-section__data">
              <ProfileRow
                title="Full name"
                data={
                  myUser.personal.name.firstName +
                  " " +
                  myUser.personal.name.lastName
                }
                publicity={myUser.personal.name.public}
              />
              <ProfileRow
                title="Location"
                data={myUser.personal.location.country.name}
                publicity={myUser.personal.location.country.public}
              />
              <ProfileRow
                title="Birthday"
                data={dateParser(
                  myUser.personal.birthday.date,
                  "written short"
                )}
                publicity={myUser.personal.birthday.public}
              />
            </div>
          </div>
          <div className={dataSectionTheme}>
            <h3>Contacts</h3>
            <div className="data-section__data">
              <ProfileRow
                title="Email"
                data={myUser.personal.contacts.email.data}
                publicity={myUser.personal.contacts.email.public}
              />
              <ProfileRow
                title="Phone"
                data={myUser.personal.contacts.phone.data}
                publicity={myUser.personal.contacts.phone.public}
              />
              {
                <ProfileRow
                  title="Links"
                  data={myUser.personal.contacts.links}
                />
              }
            </div>
          </div>
        </div>
        <div className="profile__body__data">
          <div className={dataSectionTheme}>
            <h3>Bio</h3>
            <ProfileRow
              title="Bio"
              data={myUser.personal.bio}
              publicity={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
