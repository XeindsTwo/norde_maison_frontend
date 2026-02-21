import {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";

import Header from '@/components/Header/Header.jsx';
import Footer from '@/components/Footer/Footer.jsx';
import ProductCard from "@/components/ProductCard/ProductCard.jsx";
import {getProducts} from "@/api/catalog.js";

import './CatalogPage.scss';

const useQuery = () => {
    return new URLSearchParams(useLocation().search);
};

const CatalogPage = () => {
    const query = useQuery();

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const page = query.get("page") || 1;
    const subcategory = query.get("subcategory");
    const gender = query.get("gender");

    useEffect(() => {
        const loadProducts = async () => {
            try {
                setLoading(true);

                const res = await getProducts({
                    page,
                    subcategory,
                    gender,
                    visible: true
                });

                setProducts(res.data.results || res.data);
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        };

        loadProducts();
    }, [page, subcategory, gender]);

    return (
        <>
            <Header/>

            <main className="catalog">
                <div className="container">

                    <div className="catalog__grid">
                        {loading
                            ? Array.from({length: 16}).map((_, i) => (
                                <div key={i} className="product-skeleton"/>
                            ))
                            : products.map(product => (
                                <ProductCard key={product.id} product={product}/>
                            ))}
                    </div>

                </div>
            </main>

            <Footer/>
        </>
    );
};

export default CatalogPage;