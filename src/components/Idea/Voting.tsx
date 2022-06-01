import axios from "axios";
import { useDispatch } from "react-redux";
import { getMyUser } from "../../redux/actions/actionUser";

type VotingType = {
  isUpvoted: boolean;
  isDownvoted: boolean;
  isAuthor: boolean;
  upvotes: number;
  downvotes: number;
  ideaId: string;
  myUserId: string;
};

export default function Voting({
  isUpvoted,
  isDownvoted,
  isAuthor,
  upvotes,
  downvotes,
  ideaId,
  myUserId,
}: VotingType) {
  let token: any = localStorage.getItem("token");
  const dispatch = useDispatch();

  let upvoteTheme = "votes__upvote";
  let downvoteTheme = "votes__downvote";

  if (isAuthor) {
    upvoteTheme += " votes__upvote--inactive";
    downvoteTheme += " votes__downvote--inactive";
  } else {
    upvoteTheme += isUpvoted ? " votes__upvote--upvoted" : "";
    downvoteTheme += isDownvoted ? " votes__downvote--downvoted" : "";
  }

  const API_URL = process.env.REACT_APP_API_URL;
  function vote(mode: "upvote" | "downvote") {
    if (mode === "upvote" && isUpvoted) mode += "-remove";
    if (mode === "downvote" && isDownvoted) mode += "-remove";

    axios
      .patch(
        `${API_URL}api/v1/ideas/${ideaId}/${mode}/${myUserId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((voteData: any) => {
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

  return (
    <div className="votes">
      <div className={upvoteTheme} onClick={() => vote("upvote")} />
      <div className="votes__number">{upvotes - downvotes}</div>
      <div className={downvoteTheme} onClick={() => vote("downvote")} />
    </div>
  );
}
