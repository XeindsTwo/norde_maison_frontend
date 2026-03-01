import {useCurrency} from "@/context/CurrencyContext";

const MAP = {
  rub: {
    text: "Российская Федерация",
    symbol: "₽"
  },
  kzt: {
    text: "Республика Казахстан",
    symbol: "₸"
  },
  byn: {
    text: "Республика Беларусь",
    symbol: "Br"
  }
};

const HeaderInfo = () => {

  const {currency} = useCurrency();

  const data = MAP[currency] || MAP.rub;

  return (
    <div className="header__info">
      <div className="container">
        <div className="header__info-inner">
          <span>Минимализм, созданный для жизни.</span>
          <span>
            {data.text} ({currency.toUpperCase()} {data.symbol})
          </span>
        </div>
      </div>
    </div>
  );
};

export default HeaderInfo;