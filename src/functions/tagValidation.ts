export function tagSplitter(tagString: string | undefined) {
  if (!tagString || typeof tagString !== "string") return [];
  let splitters = /\s*,\s*|\s+/;
  let tags = tagString.split(splitters);
  tags = eliminateRepeats(tags);
  if (tags.length > 0) {
    while (tags.length > 0 && tags[0] === "") tags.shift();
    if (tags[tags.length - 1] === "") tags.pop();
  }
  return tags;
}

export function tagsValidation(tagString: string | undefined) {
  //if (typeof tagString === "undefined") return true;
  let tags = tagSplitter(tagString);

  // Empty array is valid
  if (tags.length === 0) {
    return true;
  }

  // Max 5 tags allowed
  if (tags.length > 5) {
    return false;
  }

  // Are tags longer than 20?
  let tagLengthFailure: boolean = false;
  tags.forEach((tag) => {
    if (tag.length > 20) tagLengthFailure = true;
  });
  if (tagLengthFailure) {
    return false;
  }

  return true;
}

export function eliminateRepeats(data: any[]): string[] {
  let control: any[] = [];
  for (let i = 0; i < data.length; i++) {
    let tag = String(data[i]);
    if (!control.includes(tag) && tag !== "") {
      control.push(tag);
    }
  }
  return control;
}
