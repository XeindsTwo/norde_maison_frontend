import "./ProfileSidebar.scss";
import { useEffect, useRef } from "react";
import IconTelegram from "@/assets/images/icons/profile/telegram.svg";
import IconBox from "@/assets/images/icons/profile/box.svg";
import IconExit from "@/assets/images/icons/profile/exit.svg";
import IconStar from "@/assets/images/icons/profile/star.svg";
import IconUser from "@/assets/images/icons/profile/info.svg";
import { useAuth } from "@/context/AuthContext";

const ProfileSidebarMobile = ({ activeTab, onChangeTab, supportUrl }) => {
  const { user } = useAuth();
  const email = user?.email || "";
  const scrollRef = useRef(null);

  const tabs = [
    { id: 'orders', label: 'Заказы', icon: <IconBox />, selected: activeTab === 'orders' },
    ...(supportUrl ? [{ id: 'support', label: 'Связаться с нами', icon: <IconTelegram />, href: supportUrl }] : []),
    { id: 'info', label: 'Личная информация', icon: <IconUser />, selected: activeTab === 'info' },
    { id: 'favorites', label: 'Избранное', icon: <IconStar />, selected: activeTab === 'favorites' }
  ];

  const handleTabClick = (id) => {
    onChangeTab(id);
  };

  useEffect(() => {
    const menu = scrollRef.current;
    if (!menu) return;

    const activeBtn = menu.querySelector('.profile-sidebar__action-btn--active');
    if (activeBtn) {
      menu.scrollTo({
        left: activeBtn.offsetLeft - 12,
        behavior: 'smooth'
      });
    }
  }, [activeTab]);

  return (
    <aside className="profile-sidebar">
      <h1 className="profile-sidebar__title">Личный кабинет</h1>
      {email && (
        <span className="profile-sidebar__mail" title={email}>
          {email}
        </span>
      )}
      <button className="profile-sidebar__exit" onClick={() => onChangeTab("logout")}>
        <IconExit />
      </button>

      <div className="profile-sidebar__scroll-menu" ref={scrollRef}>
        <div className="profile-sidebar__scroll-items">
          {tabs.map((tab) => (
            <div className="profile-sidebar__item" key={tab.id}>
              {tab.href ? (
                <a href={tab.href} target="_blank" rel="noopener noreferrer" className={`profile-sidebar__action-btn ${tab.selected ? 'profile-sidebar__action-btn--active' : ''}`}>
                  {tab.icon} {tab.label}
                </a>
              ) : (
                <button
                  className={`profile-sidebar__action-btn ${tab.selected ? 'profile-sidebar__action-btn--active' : ''}`}
                  onClick={() => handleTabClick(tab.id)}
                >
                  {tab.icon} {tab.label}
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default ProfileSidebarMobile;