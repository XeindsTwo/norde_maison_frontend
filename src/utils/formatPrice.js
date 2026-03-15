export const EXCHANGE_RATES = {
  rub: {rub: 1, kzt: 5.5, byn: 0.0366},
  kzt: {rub: 0.182, kzt: 1, byn: 0.00605},
  byn: {rub: 27.35, kzt: 165.45, byn: 1},
};

export const formatPrice = (value, currency = "rub") => {
  if (value === null || value === undefined || value === "") return "";
  const symbols = {rub: "₽", kzt: "₸", byn: "Br"};
  const number = Number(value);
  if (isNaN(number)) return "";
  const formattedNumber = new Intl.NumberFormat("ru-RU", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(number);
  return `${formattedNumber} ${symbols[currency] || symbols.rub}`;
};

export const getItemPrice = (item, currency) => {
  if (currency === "kzt") return Number(item.price_kzt);
  if (currency === "byn") return Number(item.price_byn);
  return Number(item.price_rub);
};

export const getSubtotal = (preview, currency) => {
  if (!preview) return 0;
  if (currency === "kzt") return Number(preview.subtotal_kzt);
  if (currency === "byn") return Number(preview.subtotal_byn);
  return Number(preview.subtotal_rub);
};

export const getCurrencySymbol = (currency) => {
  return {rub: "₽", kzt: "₸", byn: "Br"}[currency] || "₽";
};

export const convertPrice = (value, from, to) => {
  if (from === to) return value;
  return value * EXCHANGE_RATES[from][to];
};