import "./AboutContact.scss";
import TelegramIcon from "@/assets/images/icons/tg-black.svg";
import Skeleton from "react-loading-skeleton";
import {useEffect, useState} from "react";
import {api} from "@/api/http.js";

const AboutContact = () => {
  const [channelUrl, setChannelUrl] = useState(null);

  useEffect(() => {
    api.get("shop-config/site-config/")
      .then(res => setChannelUrl(res.data.channel_url))
      .catch(() => setChannelUrl(null));
  }, []);

  return (
    <section className="about-contact">
      <div className="container container--padding">
        <div className="about-contact__inner">
          <div className="about-contact__content">
            <h2 className="about-contact__title">Узнавайте больше о нашем деле</h2>
            <p className="about-contact__text">
              Мы рассказываем о жизни бренда, делимся идеями и процессом создания коллекций. Здесь появляются
              новости о новых линейках и проектах Norde Maison
            </p>

            {channelUrl ? (
              <a
                className="about-contact__btn btn btn--black"
                href={channelUrl}
                target="_blank"
                rel="noreferrer"
              >
                <TelegramIcon/>
                Подписаться
              </a>
            ) : (
              <Skeleton
                width={210}
                height={48}
                borderRadius={6}
                baseColor="#eee"
                highlightColor="#ddd"
              />
            )}
          </div>
          <img src="/images/telegram.svg" width="360" height="360" alt=""/>
        </div>
      </div>
    </section>
  );
};

export default AboutContact;