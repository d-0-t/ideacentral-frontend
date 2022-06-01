export default function populatedIncludesId(data: any, id: string) {
  let found: boolean = false;

  if (Array.isArray(data))
    data.forEach((obj: any) => {
      if (obj._id && obj._id === id) found = true;
    });

  return found;
}
