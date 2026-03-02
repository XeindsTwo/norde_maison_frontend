import ProductCard from "@/components/ProductCard/ProductCard";
import {useFavorites} from "@/hooks/useFavorites";
import {useAuth} from "@/context/AuthContext";
import Skeleton from "react-loading-skeleton";
import {AnimatePresence, motion} from "framer-motion";
import {useEffect, useState, useRef} from "react";

const ProfileFavorites = () => {

  const {isAuth} = useAuth();
  const {favorites, isLoading, toggle} = useFavorites(isAuth);

  const [list, setList] = useState([]);
  const removingRef = useRef(false);

  useEffect(() => {
    if (!removingRef.current) {
      setList(favorites);
    }
  }, [favorites]);

  const handleRemove = async (productId) => {

    removingRef.current = true;

    setList(prev =>
      prev.filter(
        item => String(item?.product?.id) !== String(productId)
      )
    );

    await new Promise(resolve => setTimeout(resolve, 180));

    toggle(productId);

    setTimeout(() => {
      removingRef.current = false;
    }, 300);
  };

  if (isLoading) {
    return (
      <div className="profile__grid">
        {Array(3).fill(0).map((_, i) =>
          <Skeleton key={i} height={480}/>
        )}
      </div>
    );
  }

  if (!Array.isArray(list) || list.length === 0) {
    return <p>Избранных товаров на данный момент не имеется</p>;
  }

  return (
    <div className="profile__grid">
      <AnimatePresence mode="popLayout">
        {list.map(item => (
          item?.product && (
            <motion.div
              key={item.product.id}
              layout="position"
              initial={{opacity: 0, scale: 0.97}}
              animate={{opacity: 1, scale: 1}}
              exit={{opacity: 0, scale: 0.85}}
              transition={{duration: 0.18, ease: "easeOut"}}
            >
              <ProductCard
                product={item.product}
                onFavoriteRemove={() =>
                  handleRemove(item.product.id)
                }
              />
            </motion.div>
          )
        ))}
      </AnimatePresence>
    </div>
  );
};

export default ProfileFavorites;