export default function sortingFunction(
  option: string,
  allProducts: any[]
) {
  let newOrder = [...allProducts];
  switch (option) {
    case "price-asc":
      newOrder.sort((a: any, b: any) => a.price - b.price);
      break;
    case "price-desc":
      newOrder.sort((a: any, b: any) => b.price - a.price);
      break;
    case "rating-desc":
      newOrder.sort((a: any, b: any) => b.rating.rate - a.rating.rate);
      break;
    default:
      break;
  }
  return newOrder;
}
