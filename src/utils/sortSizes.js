const SIZE_ORDER = ["xss", "xs", "s", "m", "l", "xl", "xxl", "xxxl"];

export default function sortSizes(list = []) {
  return [...list].sort((a, b) => {
    const ai = SIZE_ORDER.indexOf(a.toLowerCase());
    const bi = SIZE_ORDER.indexOf(b.toLowerCase());
    return ai - bi;
  });
}