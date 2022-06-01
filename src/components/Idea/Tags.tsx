type TagsType = {
  tags: string[];
};

export default function Tags({ tags }: TagsType) {
  return (
    <div className="tags__tagsBox">
      {tags.map((tag: string, i: number) => {
        return (
          <a
            href={`/tags/${tag}`}
            className="link--nostyle tags__tagsBox__tag noselect"
            key={i}
          >
            <span>{tag}</span>
          </a>
        );
      })}
    </div>
  );
}
