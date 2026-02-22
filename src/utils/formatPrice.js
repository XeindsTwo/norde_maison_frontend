export const formatPrice = (value) => {
  if (!value && value !== 0) return "";

  return new Intl.NumberFormat("ru-RU", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(Number(value));
};