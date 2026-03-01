import ProductCard from "@/components/ProductCard/ProductCard.jsx";

const SearchOverlaySkeleton = ({limit}) => {

  return (
    <div className="search-overlay__grid">
      {Array.from({length: limit}).map((_, i) => (
        <ProductCard key={i} product={null}/>
      ))}
    </div>
  );
};

export default SearchOverlaySkeleton;