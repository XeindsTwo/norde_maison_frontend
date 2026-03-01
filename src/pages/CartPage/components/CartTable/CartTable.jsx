import "./CartTable.scss";
import CartRow from "../CartRow/CartRow";

const CartTable = ({
                     cart,
                     currency,
                     onDelete,
                     onQuantityChange
                   }) => {

  return (
    <div className="cart-table">

      <div className="cart-header">
        <div>Товар</div>
        <div className="cart-header__center">Количество</div>
        <div className="cart-header__right">Цена за единицу</div>
        <div className="cart-header__right">Цена итого</div>
      </div>

      {cart.items?.map(item => (
        <CartRow
          key={item.id}
          item={item}
          currency={currency}
          onDelete={onDelete}
          onQuantityChange={onQuantityChange}
        />
      ))}

    </div>
  );
};

export default CartTable;