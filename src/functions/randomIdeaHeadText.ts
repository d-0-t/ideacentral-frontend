function hmGenerator(): string {
  let hMax: number = 3;
  let mMax: number = 15;
  let dotMax: number = 15;
  let hCount: number = Math.ceil(Math.random() * hMax);
  let mCount: number = Math.ceil(Math.random() * mMax);
  let dotCount: number = Math.floor(Math.random() * dotMax);

  return (
    "H" + "h".repeat(hCount - 1) + "m".repeat(mCount) + ".".repeat(dotCount)
  );
}

const texts: string[] = [
  "Hm.",
  "Okay, here's one:",
  "Let's see...",
  "Well, what do we have here...",
  "Ready for this?",
  "Maybe this one isn't so bad:",
  "Is this appropriate?",
  "Do you think we need this?",
  "I hope this isn't a bad one:",
  "Here.",
  "Anxiously presenting:",
  "Please don't judge.",
  "Might not be the best idea, but...",
  "This is not a joke.",
  "I've had better ideas, but hear me out!",
];

export default function randomIdeaHeadText(): string {
  let n: number = texts.length;
  let r: number = Math.floor((Math.random() * n * 100) / 100);

  if (texts[r] === "Hm.") return hmGenerator();

  return texts[r];
}
