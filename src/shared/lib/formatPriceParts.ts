export const formatPriceParts = (value: number) => {
  const formatted = new Intl.NumberFormat("ru-RU", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);

  const [integer, fraction] = formatted.split(",");

  return { integer, fraction };
};