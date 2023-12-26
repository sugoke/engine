// Creation of empty table with each observation date

export const emptyTableCreation = (product) => {
  return product.monitoringDates.map(dateInfo => {
    return {
      monitoringDate: dateInfo.monitoringDate,
      paymentDate: dateInfo.paymentDate,
      couponPaid: "",  // Placeholder for coupon paid amount
      earlyRedemption: ""  // Placeholder for early redemption status
    };
  });
};
