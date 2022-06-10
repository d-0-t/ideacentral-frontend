import axios, { AxiosError } from "axios";
import jwtDecode from "jwt-decode";
import { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import ButtonGoBack from "../../components/Buttons/ButtonGoBack";
import ButtonToPath from "../../components/Buttons/ButtonToPath";
import NewComment from "../../components/Comment/NewComment";
import OneComment from "../../components/Comment/OneComment";
import AddToFavorites from "../../components/Idea/AddToFavorites";
import AuthorLabel from "../../components/Idea/AuthorLabel";
import RandomIdeaHeadline from "../../components/Idea/RandomIdeaHeadline";
import Tags from "../../components/Idea/Tags";
import Voting from "../../components/Idea/Voting";
import Loading from "../../components/Utility/Loading";
import dateParser from "../../functions/dateParser";
import { errorResponseObjectConstructor } from "../../functions/errorResponseObjectConstructor";
import populatedIncludesId from "../../functions/populatedIncludesId";
import { getMyUser } from "../../redux/actions/actionUser";
import { CommentDocument } from "../../types/typesOfModels/CommentType";
import { IdeaDocument } from "../../types/typesOfModels/IdeaType";
import { RootState } from "../../types/typesOfState";
import { AuthType, ErrorResponseType } from "../../types/typesOfUtility";
import ErrorPage from "../Utility/ErrorPage";

function IdeaPage() {
  let token: any = localStorage.getItem("token");
  let auth: AuthType | null = token ? jwtDecode(token) : null;

  const { myUser } = useSelector((state: RootState) => state.userReducer);
  let { ideaId } = useParams();

  const dispatch = useDispatch();

  // Theme init
  const { theme } = useSelector((state: RootState) => state.themeReducer);
  let ideaTitleTheme = "idea__title break-word";
  if (theme === "other") {
    ideaTitleTheme += " darktheme__idea__title";
  }

  const [failedRequest, setFailedRequest] = useState<
    ErrorResponseType | undefined
  >();

  const [idea, setIdea] = useState<IdeaDocument | null>();

  const API_URL = process.env.REACT_APP_API_URL;
  useEffect(() => {
    if (!myUser && auth) {
      axios
        .get(`${API_URL}api/v1/users/${auth.id}`)
        .then((data: any) => {
          dispatch(getMyUser(data.data));
        })
        .catch(function (error) {
          if (error?.response?.data) console.log(error.response.data);
        });
    }

    axios
      .get(`${API_URL}api/v1/ideas/${ideaId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((data: any) => {
        setIdea(data.data);
        if (data.data.title.length > 18) {
          document.title = `${data.data.title.slice(0, 15)}... - IdeaCentral`;
        } else {
          document.title = `${data.data.title} - IdeaCentral`;
        }
      })
      .catch(function (error) {
        console.log(error);
        let err: any = errorResponseObjectConstructor(error as AxiosError);
        setFailedRequest(err);
      });
  }, [dispatch, auth, token, API_URL, ideaId, myUser]);

  while (failedRequest) return <ErrorPage error={failedRequest} />;
  if (!failedRequest) {
    if ((!myUser && token) || !idea || !ideaId) return <Loading />;
  }

  if (idea && typeof idea.author !== "string" && ideaId) {
    //prettier-ignore
    let postedAt: string | null = dateParser(idea.createdAt, "written", true, true, true);
    //prettier-ignore
    let updatedAt: string | null = dateParser(idea.updatedAt, "written", true, true, true);
    return (
      <div className="App idea">
        <div className="idea__head">
          <RandomIdeaHeadline />
          <div className="idea__head__buttons">
            <ButtonGoBack />
            {myUser?._id === idea.author._id ? (
              <ButtonToPath
                title="Edit"
                linkToPath={`/ideas/${idea._id}/edit`}
              />
            ) : (
              <AddToFavorites
                myUserId={myUser?._id || null}
                ideaId={ideaId}
                isFavorite={populatedIncludesId(
                  idea.stats.favorites.users,
                  myUser?._id || null
                )}
              />
            )}
          </div>
        </div>
        <div className="box max-800-wide">
          <div>
            <div className="idea__titlebox">
              <Voting
                isUpvoted={populatedIncludesId(
                  idea.stats.upvotes.users,
                  myUser?._id || null
                )}
                isDownvoted={populatedIncludesId(
                  idea.stats.downvotes.users,
                  myUser?._id || null
                )}
                isAuthor={idea.author._id === myUser?._id}
                upvotes={idea.stats.upvotes.count}
                downvotes={idea.stats.downvotes.count}
                ideaId={idea._id}
                myUserId={myUser?._id || null}
              />
              <h2 className={ideaTitleTheme}>{idea.title}</h2>
            </div>
            <AuthorLabel
              username={idea.author.login?.username || "Anonymous"}
              avatar={idea.author.personal?.avatar || ""}
              power={idea.author.power || 0}
              userId={idea.author._id}
              myUserId={myUser?._id || null}
              anonymous={idea.anonymous}
            />
            <div className="idea__description break-word preserveLinebreak">
              {idea.description}
            </div>
            <div className="idea__time">
              <b>Posted at:</b> {postedAt}
            </div>
            {updatedAt !== postedAt && (
              <div className="idea__time">
                <b>Last activity:</b> {updatedAt}
              </div>
            )}
            {Array.isArray(idea.tags) && (
              <div className="tags">
                <div className="tags__title">Tags: </div>
                <Tags tags={idea.tags} />
              </div>
            )}
          </div>
          <div className="comments">
            <div className="comments__title">Comments</div>
            {auth ? (
              <NewComment ideaId={idea._id} authorId={auth.id} />
            ) : (
              <div className="comment--new">
                You must be logged in to write a new comment.
              </div>
            )}
            <div className="comments__comments">
              {
                //@ts-ignore
                idea.comments.map((comment: CommentDocument, i: number) => {
                  return <OneComment comment={comment} key={i} />;
                })
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
  return <div className="box">Something went wrong.</div>;
}

export default memo(IdeaPage);
