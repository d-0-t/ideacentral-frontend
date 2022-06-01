export default function middleClickBehavior(event: any, id: number) {
  if (event.button === 1) {
    let path = window.location.origin + "/shop/details/" + id;
    window.open(path, "_blank")?.focus();
  }
}
