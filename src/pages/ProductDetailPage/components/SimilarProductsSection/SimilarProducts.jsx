import "./SimilarProducts.scss";
import ProductCard from "@/components/ProductCard/ProductCard.jsx";

const SimilarProducts = ({ products }) => {

  if (!products?.length) return null;

  return (
    <section className="similar-products">
      <h2 className="similar-products__title">Похожие товары</h2>
      <div className="similar-products__list">
        {products.map(p => (
          <ProductCard key={p.id} product={p}/>
        ))}
      </div>

    </section>
  );
};

export default SimilarProducts;