import "./Profile.scss";
import {useState} from "react";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import ProfileSidebar from "./components/ProfileSidebar/ProfileSidebar";
import ProfileContent from "./ProfileContent";

const ProfilePage = () => {
  const [tab, setTab] = useState("orders");

  return (
    <>
      <Header/>
      <div className="container container--padding">
        <div className="profile__layout">
          <ProfileSidebar
            activeTab={tab}
            onChangeTab={setTab}
          />
          <ProfileContent
            tab={tab}
            setTab={setTab}
          />
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default ProfilePage;