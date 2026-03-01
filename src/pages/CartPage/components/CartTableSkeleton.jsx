import Skeleton from "react-loading-skeleton";

const CartTableSkeleton = () => {
  return (
    <div className="cart-table">
      <div className="cart-header">
        <div>
          <Skeleton width={180}/>
        </div>

        <div className="cart-header__center">
          <Skeleton width={110}/>
        </div>

        <div className="cart-header__right">
          <Skeleton width={120}/>
        </div>

        <div className="cart-header__right">
          <Skeleton width={120}/>
        </div>
      </div>

      {Array.from({length: 3}).map((_, i) => (
        <div className="cart-row" key={i}>
          <Skeleton height={130}/>

          <Skeleton height={43} width={120}/>

          <Skeleton height={30} width={100}/>

          <Skeleton height={30} width={120}/>
        </div>
      ))}
    </div>
  );
};

export default CartTableSkeleton;