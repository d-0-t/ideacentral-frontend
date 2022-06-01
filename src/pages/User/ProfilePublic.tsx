import axios, { AxiosError } from "axios";
import jwtDecode from "jwt-decode";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import OneIdea from "../../components/Idea/OneIdea";
import Avatar from "../../components/Profile/Avatar";
import ProfileRow from "../../components/Profile/ProfileRow";
import Loading from "../../components/Utility/Loading";
import dateParser from "../../functions/dateParser";
import {
  errorNotFound,
  errorResponseObjectConstructor,
} from "../../functions/errorResponseObjectConstructor";
import { getMyUser } from "../../redux/actions/actionUser";
import { UserDocument } from "../../types/typesOfModels/UserType";
import { RootState } from "../../types/typesOfState";
import { AuthType, ErrorResponseType } from "../../types/typesOfUtility";
import ErrorPage from "../Utility/ErrorPage";

function ProfilePublic() {
  let token: any = localStorage.getItem("token");
  let auth: AuthType = jwtDecode(token);
  const dispatch = useDispatch();

  let { userId } = useParams();
  const [user, setUser] = useState<UserDocument | null>();

  const [failedRequest, setFailedRequest] = useState<
    ErrorResponseType | undefined
  >();

  const API_URL = process.env.REACT_APP_API_URL;
  let fetchAnotherUserData = useCallback(() => {
    //prettier-ignore
    axios.get(`${API_URL}api/v1/users/${userId}/public`,
             { headers: { Authorization: `Bearer ${token}` }
    }).then((data: any) => {
      setUser(data.data);
      if (data.data === null) setFailedRequest(errorNotFound);
      })
      .catch(function (error) {
        console.log(error);
        let err: any = errorResponseObjectConstructor(error as AxiosError);
        setFailedRequest(err);
      });
  }, [API_URL, token, userId]);

  useEffect(() => {
    fetchAnotherUserData();
  }, [fetchAnotherUserData]);

  const [followStatus, setFollowStatus] = useState(false);

  function followCheck(usersIFollow: Partial<UserDocument>[]) {
    let found: boolean = false;
    usersIFollow.forEach((person) => {
      if (
        (typeof person === "object" && person._id === userId) ||
        (typeof person === "string" && person === userId)
      ) {
        found = true;
      }
    });
    setFollowStatus(found);
  }

  function following(mode: "follow" | "unfollow") {
    //prettier-ignore
    axios
      .patch(
        `${API_URL}api/v1/users/${userId}/${mode}/${auth.id}`,
        {}, {headers: { Authorization: `Bearer ${token}` }}
      )
      .then((anotherUserData: any) => {
        fetchAnotherUserData();
        // re-fetch my user data as well
        axios
        .get(`${API_URL}api/v1/users/${auth.id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((myUserData: any) => {
          followCheck(myUserData.data.follow.following.users)
          dispatch(getMyUser(myUserData.data));
        })
        .catch(function (error) {
          if (error?.response?.data) console.log(error.response.data);
        });
      })
      .catch(function (error) {
        if (error?.response?.data) console.log(error.response.data);
      });
  }

  const { theme } = useSelector((state: RootState) => state.themeReducer);
  let dataSectionTheme = "data-section";
  let buttonTheme = "btn";
  if (theme === "other") {
    dataSectionTheme += " darktheme__data-section";
    buttonTheme += " darktheme__btn";
  }

  while (failedRequest) return <ErrorPage error={failedRequest} />;

  while (user === null || typeof user === "undefined")
    return (
      <div className="App">
        <Loading />
      </div>
    );

  document.title = `${user.login.username}'s profile - IdeaCentral`;
  return (
    <div className="profile box max-800-wide">
      <div className="profile__head">
        <h1>{user.login.username}'s profile</h1>
        {userId !== auth.id && (
          <div>
            {!followStatus ? (
              <button
                className={buttonTheme}
                onClick={() => following("follow")}
              >
                Follow
              </button>
            ) : (
              <button
                className={buttonTheme}
                onClick={() => following("unfollow")}
              >
                Unfollow
              </button>
            )}
          </div>
        )}
      </div>
      <div className="profile__body">
        <div className="profile__body__data">
          <div className="profile__avatar data-section__data">
            <Avatar
              username={user.login.username}
              url={user.personal.avatar}
              size="medium"
            />
          </div>
          <div className={dataSectionTheme + " data-section--stats"}>
            <div className="data-section__data data-section__data--stats">
              <ProfileRow title="Power level" data={user.power} />
              <ProfileRow title="Ideas" data={user.ideas.length} />
              <ProfileRow
                title="Followers"
                data={user.follow.followers.count}
              />
              <ProfileRow
                title="Following"
                data={user.follow.following.count}
              />
            </div>
          </div>
        </div>
        <div className="profile__body__data">
          <div className={dataSectionTheme}>
            <h3>Bio</h3>
            <ProfileRow title="Bio" data={user.personal.bio} publicity={true} />
          </div>
        </div>
        <div className="profile__body__data">
          <div className={dataSectionTheme}>
            <h3>Personal information</h3>

            <div className="data-section__data">
              {user.personal.name && user.personal.name.public && (
                <ProfileRow
                  title="Full name"
                  data={
                    user.personal.name.firstName +
                    " " +
                    user.personal.name.lastName
                  }
                />
              )}
              {user.personal.location?.country &&
                user.personal.location?.country.public && (
                  <ProfileRow
                    title="Location"
                    data={user.personal.location.country.name}
                  />
                )}
              {user.personal.birthday && user.personal.birthday.public && (
                <ProfileRow
                  title="Birthday"
                  data={dateParser(
                    user.personal.birthday.date,
                    "written short"
                  )}
                />
              )}
            </div>
          </div>
          <div className={dataSectionTheme}>
            <h3>Contacts</h3>
            <div className="data-section__data">
              {user.personal.contacts?.email &&
                user.personal.contacts.email.public && (
                  <ProfileRow
                    title="Email"
                    data={user.personal.contacts.email.data}
                  />
                )}
              {user.personal.contacts?.phone &&
                user.personal.contacts.phone.public && (
                  <ProfileRow
                    title="Phone"
                    data={user.personal.contacts.phone.data}
                  />
                )}
              {user.personal.contacts?.links?.length !== 0 && (
                <ProfileRow title="Links" data={user.personal.contacts.links} />
              )}
            </div>
          </div>
          <div className="profile__body__data">
            <div className={dataSectionTheme}>
              <h3>Ideas</h3>
              <div className="max-800-wide margin-auto">
                {Array.isArray(user.ideas) &&
                  user.ideas.map((idea: any, i: number) => {
                    return <OneIdea idea={idea} showAuthor={false} key={i} />;
                  })}
                {user.ideas.length === 0 && (
                  <div className="no-content break-word">
                    This user has no public ideas.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePublic;
