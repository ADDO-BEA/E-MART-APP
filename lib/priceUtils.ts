export const calculateDiscountedPrice = (price: number, discount?: number): number => {
    if (!discount) return price;
    return (price * (100 - discount)) / 100;
  };