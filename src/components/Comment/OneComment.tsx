import axios from "axios";
import jwtDecode from "jwt-decode";

import dateParser from "../../functions/dateParser";
import Avatar from "../Profile/Avatar";
import { AuthType } from "../../types/typesOfUtility";
import { CommentDocument } from "../../types/typesOfModels/CommentType";
import { useState } from "react";
import EditComment from "./EditComment";

function OneComment({ comment }: { comment: CommentDocument }) {
  let token: any = localStorage.getItem("token");
  let auth: AuthType | null = token ? jwtDecode(token) : null;

  const API_URL = process.env.REACT_APP_API_URL;
  function deleteComment() {
    axios
      .delete(`${API_URL}api/v1/comments/${comment._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((data: any) => {
        window.location.reload();
      })
      .catch(function (error) {
        if (error?.response?.data) console.log(error.response.data);
      });
  }

  const [editing, setEditing] = useState<boolean>(false);
  function editComment(status: boolean) {
    if (status) setEditing(true);
    else setEditing(false);
  }

  //prettier-ignore
  let postedAt: string | null = dateParser(comment.createdAt, "numeric", false, true, true);

  if (typeof comment.author === "string")
    return <div className="comment">Error.</div>;
  return (
    <div className="comment">
      <div className="comment__body">
        <div className="comment__body__author">
          <div className="comment__body__authorBlock">
            <Avatar
              username={comment.author.login?.username}
              url={comment.author.personal?.avatar}
              size="tiny"
              userId={comment.author._id}
            />{" "}
            <a
              href={`/user/${comment.author._id}`}
              className="link--nostyle comment__body__author__username"
            >
              {comment.author.login?.username}:
            </a>
          </div>
          {auth?.id === comment.author._id && (
            <div className="comment__buttons">
              <div
                className="comment__buttons__btn comment__buttons__btn--edit"
                onClick={() => editComment(true)}
              >
                Edit
              </div>
              <div
                className="comment__buttons__btn comment__buttons__btn--delete"
                onClick={() => deleteComment()}
              >
                Delete
              </div>
            </div>
          )}
        </div>{" "}
        <div className="comment__body__comment">{comment.comment}</div>
      </div>
      <div className="comment__time">({postedAt})</div>
      {editing && (
        <div className="comment__body__edit">
          <span className="comment__body__edit__title">Editing comment:</span>
          <EditComment commentId={comment._id} comment={comment.comment} />
          <div className="comment__buttons">
            <div
              className="comment__buttons__btn comment__buttons__btn--cancel"
              onClick={() => editComment(false)}
            >
              Cancel
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default OneComment;
