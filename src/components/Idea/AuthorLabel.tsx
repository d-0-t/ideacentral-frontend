import Avatar from "../Profile/Avatar";

type AuthorLabelType = {
  username: string;
  avatar: string;
  power: number;
  userId?: string;
  myUserId: string;
  anonymous: boolean;
};

export default function AuthorLabel({
  username,
  avatar = "",
  power,
  userId,
  myUserId,
  anonymous,
}: AuthorLabelType) {
  const isAuthorAnonymous =
    (username === "Anonymous" && userId === "hidden") || anonymous;

  username = isAuthorAnonymous ? "Anonymous" : username;
  avatar = isAuthorAnonymous ? "" : avatar;

  return (
    <div className="idea__author">
      <Avatar username={username} url={avatar} size="small" userId={userId} />
      <div>
        <div className="idea__author__circles">
          <div className="idea-circle idea-circle--medium" />
          <div className="idea-circle" />
        </div>
        <div className="idea__author__info">
          {!isAuthorAnonymous ? (
            <a href={`/user/${userId}`} className="link--nostyle">
              <span className="idea__author__username">{username}</span>
            </a>
          ) : (
            <span className="idea__author__username">{username}</span>
          )}
          {myUserId === userId && anonymous && (
            <a href={`/user/${userId}`} className="link--nostyle">
              <span className="idea__author__username">
                <i>(you)</i>
              </span>
            </a>
          )}
          {!isAuthorAnonymous && (
            <span className="idea__author__power">({power})</span>
          )}
        </div>
      </div>
    </div>
  );
}
