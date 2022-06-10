import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { getMyUser } from "../../redux/actions/actionUser";

type VotingType = {
  isUpvoted: boolean;
  isDownvoted: boolean;
  isAuthor: boolean;
  upvotes: number;
  downvotes: number;
  ideaId: string;
  myUserId: string | null;
  listing?: boolean;
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

  const [upvotedState, setUpvotedState] = useState<boolean>(isUpvoted);
  const [downvotedState, setDownvotedState] = useState<boolean>(isDownvoted);
  const [votes, setVotes] = useState<number>(upvotes - downvotes);

  const [upvoteTheme, setUpvoteTheme] = useState<string>("votes__upvote");
  const [downvoteTheme, setDownvoteTheme] = useState<string>("votes__downvote");
  useEffect(() => {
    if (isAuthor) {
      setUpvoteTheme("votes__upvote votes__upvote--inactive");
      setDownvoteTheme("votes__downvote votes__downvote--inactive");
    } else {
      if (upvotedState) setUpvoteTheme("votes__upvote votes__upvote--upvoted");
      else setUpvoteTheme("votes__upvote");
      if (downvotedState)
        setDownvoteTheme("votes__downvote votes__downvote--downvoted");
      else setDownvoteTheme("votes__downvote");
    }
  }, [
    setUpvoteTheme,
    setDownvoteTheme,
    upvotedState,
    downvotedState,
    isAuthor,
    downvoteTheme,
    upvoteTheme,
  ]);

  const API_URL = process.env.REACT_APP_API_URL;
  function vote(
    mode: "upvote" | "downvote" | "upvote-remove" | "downvote-remove"
  ) {
    if (isAuthor) return;
    if (!token) {
      alert(`You must be logged in to ${mode} an idea.`);
      return;
    }
    if (mode === "upvote" && upvotedState) mode += "-remove";
    if (mode === "downvote" && downvotedState) mode += "-remove";

    axios
      .patch(
        `${API_URL}api/v1/ideas/${ideaId}/${mode}/${myUserId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((voteData: any) => {
        // some optimistic rendering
        switch (mode) {
          case "upvote":
            setUpvoteTheme("votes__upvote votes__upvote--upvoted");
            if (downvotedState) {
              setDownvoteTheme("votes__downvote");
              setDownvotedState(false);
              setUpvotedState(true);
              setVotes(votes + 2);
              break;
            }
            setUpvotedState(true);
            setVotes(votes + 1);
            break;
          case "downvote":
            setDownvoteTheme("votes__downvote votes__downvote--downvoted");
            if (upvotedState) {
              setUpvoteTheme("votes__upvote");
              setUpvotedState(false);
              setDownvotedState(true);
              setVotes(votes - 2);
              break;
            }
            setDownvotedState(true);
            setVotes(votes - 1);
            break;
          case "upvote-remove":
            setUpvoteTheme("votes__upvote");
            setUpvotedState(false);
            setVotes(votes - 1);
            break;
          case "downvote-remove":
            setDownvoteTheme("votes__downvote");
            setDownvotedState(false);
            setVotes(votes + 1);
            break;
          default:
            break;
        }
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
      <div className="votes__number">{votes}</div>
      <div className={downvoteTheme} onClick={() => vote("downvote")} />
    </div>
  );
}
