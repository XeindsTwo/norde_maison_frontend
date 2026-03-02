import "./ProfileLogoutConfirm.scss";
import {useAuth} from "@/context/AuthContext";

const ProfileLogoutConfirm = () => {
  const {logout} = useAuth();
  return (
    <div className="profile-logout-confirm">
      <p className="profile-logout-confirm__text">
        Вы точно хотите выйти из аккаунта?<br/>
        Отменить действие будет невозможно.
      </p>
      <button
        className="profile-logout-confirm__confirm btn"
        onClick={logout}
      >
        Подтвердить выход
      </button>
    </div>
  );
};

export default ProfileLogoutConfirm;