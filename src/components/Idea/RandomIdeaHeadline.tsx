import { memo } from "react";
import randomIdeaHeadText from "../../functions/randomIdeaHeadText";

function RandomIdeaHeadline() {
  let randomText: string = randomIdeaHeadText();

  return <h2 className="idea__head__text">{randomText}</h2>;
}

export default memo(RandomIdeaHeadline);
