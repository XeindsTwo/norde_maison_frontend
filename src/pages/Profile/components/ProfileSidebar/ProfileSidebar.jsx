import "./ProfileSidebar.scss";
import IconTelegram from "@/assets/images/icons/profile/telegram.svg";
import IconBox from "@/assets/images/icons/profile/box.svg";
import IconExit from "@/assets/images/icons/profile/exit.svg";
import IconStar from "@/assets/images/icons/profile/star.svg";
import IconUser from "@/assets/images/icons/profile/info.svg";
import {useAuth} from "@/context/AuthContext";

const ProfileSidebar = ({activeTab, onChangeTab}) => {
  const {user} = useAuth();

  const email = user?.email || "";

  return (
    <aside className="profile-sidebar">
      <h1 className="profile-sidebar__title">Личный кабинет</h1>
      {email && (
        <span className="profile-sidebar__mail" title={email}>
          {email}
        </span>
      )}
      <div className="profile-sidebar__actions">
        <button
          className={`profile-sidebar__action-btn ${activeTab === "orders" ? "profile-sidebar__action-btn--active" : ""}`}
          onClick={() => onChangeTab("orders")}
        >
          <IconBox/>
          Заказы
        </button>
        <a
          href="https://t.me/your_link"
          target="_blank"
          rel="noopener noreferrer"
          className="profile-sidebar__action-btn"
        >
          <IconTelegram/>
          Связаться с нами
        </a>
        <button
          className={`profile-sidebar__action-btn ${activeTab === "info" ? "profile-sidebar__action-btn--active" : ""}`}
          onClick={() => onChangeTab("info")}
        >
          <IconUser/>
          Личная информация
        </button>
        <button
          className={`profile-sidebar__action-btn ${activeTab === "favorites" ? "profile-sidebar__action-btn--active" : ""}`}
          onClick={() => onChangeTab("favorites")}
        >
          <IconStar/>
          Избранное
        </button>
        <button
          className={`profile-sidebar__action-btn ${activeTab === "logout" ? "profile-sidebar__action-btn--active" : ""}`}
          onClick={() => onChangeTab("logout")}
        >
          <IconExit/>
          Выйти
        </button>
      </div>
    </aside>
  );
};

export default ProfileSidebar;
