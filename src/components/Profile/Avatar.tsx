import { useNavigate } from "react-router-dom";

type AvatarComponentType = {
  username?: string;
  url?: string;
  size?: string;
  userId?: string;
};

export default function Avatar({
  username = "Anonymous",
  url,
  size = "tiny",
  userId,
}: AvatarComponentType) {
  let sizing: string | null = "avatar--" + size;
  let avatarClass: string = "noselect avatar ";
  avatarClass += userId && userId !== "hidden" ? "cursor-pointer " : "";

  const navigate = useNavigate();

  if (url === "") {
    avatarClass += "avatar__unset " + sizing;
    if (userId && userId !== "hidden")
      return (
        <div
          className={avatarClass}
          onClick={() => navigate(`/user/${userId}`)}
        >
          {username[0]}
        </div>
      );
    return <div className={avatarClass}>{username[0]}</div>;
  }

  avatarClass += "avatar__set " + sizing;
  if (userId && userId !== "hidden")
    return (
      <img
        alt="user avatar"
        className={avatarClass}
        src={url}
        onClick={() => navigate(`/user/${userId}`)}
      />
    );
  return <img alt="user avatar" className={avatarClass} src={url} />;
}
