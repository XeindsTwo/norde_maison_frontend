import {Link} from "react-router-dom";
import {useAuth} from "@/context/AuthContext";
import SearchIcon from "@/assets/images/icons/bx_search.svg";
import CartIcon from "@/assets/images/icons/bx_cart.svg";

const HeaderActions = () => {
  const {openAuth, isAuth} = useAuth();

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
        <Link className="header__link" to="/cart">
          <CartIcon/>
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