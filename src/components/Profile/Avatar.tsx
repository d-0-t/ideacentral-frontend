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

  if (url === "") {
    avatarClass += "avatar__unset " + sizing;
    if (userId && userId !== "hidden")
      return (
        <a href={`/user/${userId}`} className={avatarClass}>
          {username[0]}
        </a>
      );
    return <div className={avatarClass}>{username[0]}</div>;
  }

  avatarClass += "avatar__set " + sizing;
  if (userId && userId !== "hidden")
    return (
      <a href={`/user/${userId}`}>
        <img alt="user avatar" className={avatarClass} src={url} />
      </a>
    );

  return <img alt="user avatar" className={avatarClass} src={url} />;
}
