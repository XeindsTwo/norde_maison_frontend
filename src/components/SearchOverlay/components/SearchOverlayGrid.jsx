import ProductCard from "@/components/ProductCard/ProductCard.jsx";

const SearchOverlayGrid = ({products, limit}) => {

  const preview = products.slice(0, limit);

  return (
    <>
      <div className="search-overlay__grid">
        {preview.map(p => (
          <ProductCard key={p.id} product={p}/>
        ))}
      </div>
    </>
  );
};

export default SearchOverlayGrid;