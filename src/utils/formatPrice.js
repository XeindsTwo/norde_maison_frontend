export const formatPrice = (value, currency = "rub") => {
  if (value === null || value === undefined || value === "") return "";

  const symbols = {
    rub: "₽",
    kzt: "₸",
    byn: "Br",
  };

  const number = Number(value);

  if (isNaN(number)) return "";

  const formattedNumber = new Intl.NumberFormat("ru-RU", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(number);

  const symbol = symbols[currency] || symbols.rub;

  return `${formattedNumber} ${symbol}`;
};