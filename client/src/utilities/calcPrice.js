export const getOptionPrice = (option) => {
  if (!option || !option.price) return 0;
  return Number(option.price);
};

export const calculateTotalPrice = ({ exterior, shape, material, drainage }) => {
  return (
    getOptionPrice(exterior) +
    getOptionPrice(shape) +
    getOptionPrice(material) +
    getOptionPrice(drainage)
  );
};