export const getDiscountedPricePercentage = (
  discountedPrice: number,
  originalPrice: number
) => {
  const discount = originalPrice - discountedPrice;

  const discountPercentage = (discount / originalPrice) * 100;

  return discountPercentage.toFixed(0);
};
