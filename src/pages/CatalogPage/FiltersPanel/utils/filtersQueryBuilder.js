export default function buildFiltersQuery(
  searchParams,
  state,
  override = {}
) {
  const params = new URLSearchParams(searchParams.toString());

  const subcategory = searchParams.get("subcategory");
  const gender = searchParams.get("gender");

  if (subcategory) params.set("subcategory", subcategory);
  if (gender) params.set("gender", gender);

  const sizeData = override.size ?? state.sizes;
  const colorData = override.color ?? state.colors;

  params.delete("size");
  params.delete("color");

  (sizeData || []).forEach(v => params.append("size", v));
  (colorData || []).forEach(v => params.append("color", v));

  const minPrice = override.min_price ?? state.priceMin;
  const maxPrice = override.max_price ?? state.priceMax;

  minPrice ? params.set("min_price", minPrice) : params.delete("min_price");
  maxPrice ? params.set("max_price", maxPrice) : params.delete("max_price");

  const sortValue = override.sort ?? state.sort;

  params.set("sort", sortValue || "default");
  params.set("page", "1");

  return params;
}