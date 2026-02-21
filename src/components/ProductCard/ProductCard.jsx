import {Link} from "react-router-dom";

const ProductCard = ({product}) => {
    if (!product) return null;

    return (
        <div className="product-card">
            <Link to={`/product/${product.id}`}>
                <div className="product-card__image">
                    <img
                        src={product.main_image}
                        alt={product.name}
                        loading="lazy"
                    />
                </div>

                <div className="product-card__info">
                    <div className="product-card__name">
                        {product.name}
                    </div>

                    <div className="product-card__price">
                        {product.price} ₽
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default ProductCard;