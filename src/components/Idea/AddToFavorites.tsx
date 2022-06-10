import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getMyUser } from "../../redux/actions/actionUser";

type FavType = {
  myUserId: string | null;
  ideaId: string;
  //isAuthor: boolean;
  isFavorite: boolean;
  withoutText?: boolean;
};

export default function AddToFavorites({
  myUserId,
  ideaId,
  //isAuthor,
  isFavorite,
  withoutText = false,
}: FavType) {
  let token: any = localStorage.getItem("token");
  const dispatch = useDispatch();

  const [favorited, setFavorited] = useState<boolean>(isFavorite);

  const API_URL = process.env.REACT_APP_API_URL;
  function favorite() {
    if (!token || myUserId === null) {
      alert(`You must be logged in to favorite an idea.`);
      return;
    }
    let mode = isFavorite ? "unfav" : "fav";
    axios
      .patch(
        `${API_URL}api/v1/ideas/${ideaId}/${mode}/${myUserId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((favData: any) => {
        // update stuff in case they don't reload
        if (mode === "fav") setFavorited(true);
        if (mode === "unfav") setFavorited(false);

        // re-fetch my user data as well
        axios
          .get(`${API_URL}api/v1/users/${myUserId}`, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((myUserData: any) => {
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

  let btnText = isFavorite ? "Remove from favorites" : "Add to favorites";
  let heartTheme = "heart-shape";
  if (favorited) heartTheme += " heart-shape--active";

  return (
    <div className="favorite" onClick={() => favorite()}>
      {!withoutText && <span className="favorite__title">{btnText}</span>}
      <div className={heartTheme}></div>
    </div>
  );
}
