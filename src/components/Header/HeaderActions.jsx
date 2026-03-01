import {Link} from "react-router-dom";
import {useAuth} from "@/context/AuthContext";
import {useCart} from "@/hooks/useCart";

import SearchIcon from "@/assets/images/icons/bx_search.svg";
import CartIcon from "@/assets/images/icons/bx_cart.svg";

const HeaderActions = () => {

  const {openAuth, isAuth} = useAuth();
  const {data: cart} = useCart();

  const totalItems = cart?.items?.length || 0;

  return (
    <div className="header__right">

      {isAuth ? (
        <Link className="header__link" to="/profile">
          Личный кабинет
        </Link>
      ) : (
        <button
          className="header__link"
          onClick={openAuth}
          type="button"
        >
          Авторизация
        </button>
      )}

      <button className="header__link">
        <SearchIcon/>
        Поиск
      </button>

      {isAuth ? (
        <Link className="header__link header__cart" to="/cart">
          <CartIcon/>
          {isAuth && totalItems > 0 && (
            <span className="header__cart-badge">{totalItems}</span>
          )}
          Корзина
        </Link>
      ) : (
        <button
          className="header__link"
          onClick={openAuth}
          type="button"
        >
          <CartIcon/>
          Корзина
        </button>
      )}

    </div>
  );
};

export default HeaderActions;