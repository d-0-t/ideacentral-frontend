import axios from "axios";
import jwtDecode from "jwt-decode";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import OneIdea from "../../components/Idea/OneIdea";
import Loading from "../../components/Utility/Loading";
import { getMyUser } from "../../redux/actions/actionUser";
import { IdeaDocument } from "../../types/typesOfModels/IdeaType";
import { RootState } from "../../types/typesOfState";
import { AuthType } from "../../types/typesOfUtility";

export default function IdeasPublic() {
  let token: any = localStorage.getItem("token");
  let auth: AuthType = jwtDecode(token);
  const navigate = useNavigate();

  let query = new URLSearchParams(useLocation().search);
  let mode = query.get("mode") || "myIdeas";

  let pageTitle: string =
    mode === "myIdeas"
      ? "My ideas"
      : mode === "favorites"
      ? "My favorites"
      : mode === "upvotes"
      ? "My upvotes"
      : mode === "downvotes"
      ? "My downvotes"
      : "Oops.";

  const { theme } = useSelector((state: RootState) => state.themeReducer);
  let buttonTheme = "btn";
  if (theme === "other") {
    buttonTheme += " darktheme__btn";
  }
  const [ideas, setIdeas] = useState<IdeaDocument[] | null>();
  const dispatch = useDispatch();
  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    axios
      .get(`${API_URL}api/v1/users/${auth.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((data: any) => {
        dispatch(getMyUser(data.data));
        if (mode === "myIdeas") {
          setIdeas(data.data.ideas);
        } else {
          setIdeas(data.data.interactions[mode]);
        }
        document.title = `Ideas - IdeaCentral`;
      })
      .catch(function (error) {
        if (error?.response?.data) console.log(error.response.data);
      });
  }, [API_URL, auth.id, dispatch, token, mode]);

  if (!ideas) return <Loading />;

  return (
    <div className="App">
      <div>
        <button className={buttonTheme} onClick={() => navigate(`/ideas/new/`)}>
          New idea
        </button>
        <button
          className={buttonTheme}
          onClick={() => navigate("/ideas/public")}
        >
          Public ideas
        </button>{" "}
        <button
          className={buttonTheme}
          onClick={() => navigate("/ideas/manager?mode=myIdeas")}
        >
          My ideas
        </button>{" "}
        <button
          className={buttonTheme}
          onClick={() => navigate("/ideas/manager?mode=favorites")}
        >
          Favorites
        </button>{" "}
        <button
          className={buttonTheme}
          onClick={() => navigate("/ideas/manager?mode=upvotes")}
        >
          Upvotes
        </button>{" "}
        <button
          className={buttonTheme}
          onClick={() => navigate("/ideas/manager?mode=downvotes")}
        >
          Downvotes
        </button>
      </div>
      <h1>{pageTitle}</h1>
      {Array.isArray(ideas) &&
        ideas.map((idea: IdeaDocument) => {
          return <OneIdea idea={idea} showAuthor={false} key={idea._id} />;
        })}
      {ideas.length === 0 && (
        <div className="no-content break-word">
          You haven't added anything here yet.
        </div>
      )}
    </div>
  );
}
