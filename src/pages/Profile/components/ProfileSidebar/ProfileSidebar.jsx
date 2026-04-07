import "./ProfileSidebar.scss";
import Skeleton from "react-loading-skeleton";
import IconTelegram from "@/assets/images/icons/profile/telegram.svg";
import IconBox from "@/assets/images/icons/profile/box.svg";
import IconExit from "@/assets/images/icons/profile/exit.svg";
import IconStar from "@/assets/images/icons/profile/star.svg";
import IconUser from "@/assets/images/icons/profile/info.svg";
import { useAuth } from "@/context/AuthContext";

const ProfileSidebar = ({ activeTab, onChangeTab, supportUrl, isLoading = false }) => {
  const { user } = useAuth();
  const email = user?.email || "";

  if (isLoading) {
    return (
      <aside className="profile-sidebar">
        <h1 className="profile-sidebar__title">
          <Skeleton width={200} height={28} />
        </h1>
        <span className="profile-sidebar__mail">
          <Skeleton width={260} height={18} />
        </span>
        <div className="profile-sidebar__actions">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} width="100%" height={48} />
          ))}
        </div>
      </aside>
    );
  }

  const items = [
    {
      node: (
        <button
          className={`profile-sidebar__action-btn ${activeTab === "orders" ? "profile-sidebar__action-btn--active" : ""}`}
          onClick={() => onChangeTab("orders")}
        >
          <IconBox />
          Заказы
        </button>
      ),
    },
    supportUrl && {
      node: (
        <a
          href={supportUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="profile-sidebar__action-btn"
        >
          <IconTelegram />
          Связаться с нами
        </a>
      ),
    },
    {
      node: (
        <button
          className={`profile-sidebar__action-btn ${activeTab === "info" ? "profile-sidebar__action-btn--active" : ""}`}
          onClick={() => onChangeTab("info")}
        >
          <IconUser />
          Личная информация
        </button>
      ),
    },
    {
      node: (
        <button
          className={`profile-sidebar__action-btn ${activeTab === "favorites" ? "profile-sidebar__action-btn--active" : ""}`}
          onClick={() => onChangeTab("favorites")}
        >
          <IconStar />
          Избранное
        </button>
      ),
    },
    {
      node: (
        <button
          className={`profile-sidebar__action-btn exit ${activeTab === "logout" ? "profile-sidebar__action-btn--active" : ""}`}
          onClick={() => onChangeTab("logout")}
        >
          <IconExit />
          Выйти
        </button>
      ),
    },
  ].filter(Boolean);

  return (
    <aside className="profile-sidebar">
      <h1 className="profile-sidebar__title">Личный кабинет</h1>
      {email && (
        <span className="profile-sidebar__mail" title={email}>
          {email}
        </span>
      )}
      <div className="profile-sidebar__actions">
        {items.map((item, i) => (
          <div key={i}>{item.node}</div>
        ))}
      </div>
    </aside>
  );
};

export default ProfileSidebar;