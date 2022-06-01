import jwtDecode from "jwt-decode";
import { memo } from "react";
import { useSelector } from "react-redux";

import ButtonToPath from "../Buttons/ButtonToPath";
import AddToFavorites from "./AddToFavorites";
import AuthorLabel from "./AuthorLabel";
import Tags from "./Tags";
import Voting from "./Voting";
import dateParser from "../../functions/dateParser";
import populatedIncludesId from "../../functions/populatedIncludesId";
import { IdeaDocument } from "../../types/typesOfModels/IdeaType";
import { RootState } from "../../types/typesOfState";
import { AuthType } from "../../types/typesOfUtility";
import { useNavigate } from "react-router-dom";

type IdeaComponentType = { idea: IdeaDocument; showAuthor?: boolean };

function OneIdea({ idea, showAuthor = true }: IdeaComponentType) {
  let token: any = localStorage.getItem("token");
  let auth: AuthType = jwtDecode(token);
  const { myUser } = useSelector((state: RootState) => state.userReducer);
  const { theme } = useSelector((state: RootState) => state.themeReducer);
  let ideaTitleTheme =
    "idea__title idea__title--oneIdea break-word cursor-pointer";
  if (theme === "other") {
    ideaTitleTheme += " darktheme__idea__title";
  }
  //prettier-ignore
  let postedAt: string | null = dateParser(idea.createdAt, "written", true, true, true);
  let authorId =
    idea.author && typeof idea.author !== "string"
      ? idea.author._id
      : idea.author;

  let tagsClass =
    myUser && auth?.id !== authorId ? "tags" : "tags tags--withEdit";

  const navigate = useNavigate();

  return (
    <div className="App idea idea--oneIdea">
      <div className="max-800-wide margin-auto">
        <div className="idea__time">
          <b>Posted at:</b> {postedAt}
        </div>
        <div className="idea__titlebox">
          <Voting
            isUpvoted={populatedIncludesId(idea.stats.upvotes.users, auth.id)}
            isDownvoted={populatedIncludesId(
              idea.stats.downvotes.users,
              auth.id
            )}
            isAuthor={authorId === auth.id}
            upvotes={idea.stats.upvotes.count}
            downvotes={idea.stats.downvotes.count}
            ideaId={idea._id}
            myUserId={auth.id}
          />
          <h2
            className={ideaTitleTheme}
            onClick={() => navigate(`/ideas/${idea._id}`)}
          >
            {idea.title}
          </h2>
          <div className="idea__titlebox__btn">
            {auth.id === authorId && (
              <ButtonToPath
                title="Edit"
                linkToPath={`/ideas/${idea._id}/edit`}
              />
            )}
            {myUser && auth.id !== authorId && (
              <AddToFavorites
                myUserId={auth.id}
                ideaId={idea._id}
                isFavorite={populatedIncludesId(
                  myUser.interactions.favorites,
                  idea._id
                )}
                withoutText={true}
              />
            )}
          </div>
        </div>
        <div className="idea__bottom">
          {idea.author && typeof idea.author !== "string" && showAuthor ? (
            <AuthorLabel
              username={idea.author.login?.username || "Anonymous"}
              avatar={idea.author.personal?.avatar || ""}
              power={idea.author.power || 0}
              userId={idea.author._id}
              myUserId={auth?.id || "unauthorized"}
              anonymous={idea.anonymous}
            />
          ) : (
            <div></div>
          )}
          {Array.isArray(idea.tags) && (
            <div className={tagsClass}>
              <Tags tags={idea.tags} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default memo(OneIdea);
