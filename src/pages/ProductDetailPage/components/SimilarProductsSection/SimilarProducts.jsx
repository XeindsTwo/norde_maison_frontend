import "./SimilarProducts.scss";
import ProductCard from "@/components/ProductCard/ProductCard.jsx";
import {useFavorites} from "@/hooks/useFavorites";

const SimilarProducts = ({ products }) => {

  const { data: favoritesData, isLoading } = useFavorites();

  const favoriteSet = new Set(
    favoritesData?.data?.map(f => f.product.id) || []
  );

  if (!products?.length) return null;

  return (
    <section className="similar-products">
      <h2 className="similar-products__title">Похожие товары</h2>

      <div className="similar-products__list">
        {products.map(p => (
          <ProductCard
            key={p.id}
            product={p}
            initialFavorite={favoriteSet.has(p.id)}
          />
        ))}
      </div>
    </section>
  );
};

export default SimilarProducts;