import ProductCard from "@/components/ProductCard/ProductCard";
import { useFavorites } from "@/hooks/useFavorites";
import { useAuth } from "@/context/AuthContext";
import Skeleton from "react-loading-skeleton";
import { AnimatePresence, motion } from "framer-motion";
import { useState, useRef } from "react";

const ProfileFavorites = () => {
  const { isAuth } = useAuth();

  const {
    favorites,
    isLoading,
    mutation,
    isFavorite,
  } = useFavorites(isAuth, {
    skipInvalidate: true,
  });

  const initialList = Array.isArray(favorites)
    ? favorites
    : favorites?.data || [];

  const [uiList, setUiList] = useState(initialList);
  const initialized = useRef(false);

  if (!initialized.current && initialList.length) {
    setUiList(initialList);
    initialized.current = true;
  }

  const handleRemove = (productId) => {
    if (!isAuth) return;

    let removedItem;

    setUiList((prev) => {
      const next = prev.filter((item) => {
        const match =
          String(item?.product?.id) === String(productId);
        if (match) removedItem = item;
        return !match;
      });
      return next;
    });

    mutation.mutate(productId, {
      onError: () => {
        if (!removedItem) return;
        setUiList((prev) => [removedItem, ...prev]);
      },
    });
  };

  if (isLoading && !uiList.length) {
    return (
      <div className="profile__grid">
        {Array(3)
          .fill(0)
          .map((_, i) => (
            <Skeleton key={i} height={480} />
          ))}
      </div>
    );
  }

  if (!uiList.length) {
    return <p>Избранных товаров на данный момент не имеется</p>;
  }

  return (
    <div className="profile__grid">
      <AnimatePresence mode="popLayout" initial={false}>
        {uiList.map((item) =>
          item?.product ? (
            <motion.div
              key={String(item.product.id)}
              layout
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -20 }}
              transition={{
                duration: 0.25,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
            >
              <ProductCard
                product={item.product}
                onFavoriteRemove={handleRemove}
                isFavorite={isFavorite}
                toggleFavorite={mutation.mutate}
              />
            </motion.div>
          ) : null
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProfileFavorites;