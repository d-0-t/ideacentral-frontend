import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import OneIdea from "../../components/Idea/OneIdea";
import Loading from "../../components/Utility/Loading";
import { errorResponseObjectConstructor } from "../../functions/errorResponseObjectConstructor";
import { IdeaDocument } from "../../types/typesOfModels/IdeaType";
import { RootState } from "../../types/typesOfState";
import { ErrorResponseType } from "../../types/typesOfUtility";
import ErrorPage from "../Utility/ErrorPage";

export default function IdeasPublic() {
  let token: any = localStorage.getItem("token");
  const navigate = useNavigate();

  const { theme } = useSelector((state: RootState) => state.themeReducer);
  let buttonTheme = "btn";
  if (theme === "other") {
    buttonTheme += " darktheme__btn";
  }
  const [failedRequest, setFailedRequest] = useState<
    ErrorResponseType | undefined
  >();

  const [ideas, setIdeas] = useState<IdeaDocument[] | null>();

  const API_URL = process.env.REACT_APP_API_URL;
  useEffect(() => {
    axios
      .get(`${API_URL}api/v1/ideas/published`)
      .then((data: any) => {
        setIdeas(data.data.reverse());
        document.title = `Ideas - IdeaCentral`;
      })
      .catch(function (error) {
        console.log(error);
        let err: any = errorResponseObjectConstructor(error as AxiosError);
        setFailedRequest(err);
      });
  }, [API_URL]);

  while (failedRequest) return <ErrorPage error={failedRequest} />;
  if (!failedRequest) {
    if (!ideas) return <Loading />;
  }
  return (
    <div className="App">
      <h1>Ideas</h1>
      {token && (
        <div>
          <button
            className={buttonTheme}
            onClick={() => navigate(`/ideas/new/`)}
          >
            New idea
          </button>
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
      )}
      {Array.isArray(ideas) &&
        ideas.map((idea: IdeaDocument) => {
          return <OneIdea idea={idea} key={idea._id} />;
        })}
    </div>
  );
}
