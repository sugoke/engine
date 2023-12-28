import { memoryBucket } from '../server/blocks.js';


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export function getConsideredUnderlying(product, dateInfo) {
  switch (product.underlyingType) {
    case 'worstPerforming':
      // Implement logic to find the worst-performing stock here
      let worstStock = null;
      let maxDecrease = 0;

      const initialDate = Object.keys(dummyStockData)[0]; // Assuming the first key is the initial date

      for (const stock in dummyStockData[dateInfo.monitoringDate]) {
        if (
          dummyStockData[dateInfo.monitoringDate].hasOwnProperty(stock) &&
          dummyStockData[initialDate].hasOwnProperty(stock)
        ) {
          const initialPrice = dummyStockData[initialDate][stock];
          const currentPrice = dummyStockData[dateInfo.monitoringDate][stock];
          const decrease = (initialPrice - currentPrice) / initialPrice;

          if (worstStock === null || decrease > maxDecrease) {
            maxDecrease = decrease;
            worstStock = stock;
          }
        }
      }

      return worstStock;

    case 'bestPerforming':
      // Implement logic to find the best-performing stock here
      let bestStock = null;
      let maxIncrease = 0;

      for (const stock in dummyStockData[dateInfo.monitoringDate]) {
        if (dummyStockData[dateInfo.monitoringDate].hasOwnProperty(stock)) {
          const initialPrice = dummyStockData[initialDate][stock];
          const currentPrice = dummyStockData[dateInfo.monitoringDate][stock];
          const increase = (currentPrice - initialPrice) / initialPrice;

          if (bestStock === null || increase > maxIncrease) {
            maxIncrease = increase;
            bestStock = stock;
          }
        }
      }

      return bestStock;

    default:
      return 'Invalid underlyingType';
  }
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Calculate performance function
export function calculatePerformance(stockData, stockName, initialDate, observationDate) {
  if (
    stockData.hasOwnProperty(initialDate) &&
    stockData[initialDate].hasOwnProperty(stockName) &&
    stockData.hasOwnProperty(observationDate) &&
    stockData[observationDate].hasOwnProperty(stockName)
  ) {
    const initialPrice = stockData[initialDate][stockName];
    const observationPrice = stockData[observationDate][stockName];

    const performance = ((observationPrice - initialPrice) / initialPrice) * 100;

    return performance;
  } else {
    return `Data for ${stockName} on either ${initialDate} or ${observationDate} is missing.`;
  }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////

export function underlyingAboveCouponBarrier(observation, product) {

  //console.log(observation)

  if (observation.underlyingLevel >= observation.couponBarrier) {

    return true

  } else {

    return false
  }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////

export function underlyingAboveAutocallBarrier(observation) {

  //console.log(observation)

  if (observation.underlyingLevel >= observation.autocallLevel) {

    return true

  } else {

    return false
  }


}

////////////////////////////////////////////////////////////////////////////////////////////////////////////

export function couponPaid(observation, product) {

  if (product.memoryCoupon) {

    //console.log("test bucket: " + memoryBucket)

  return product.couponRate

  } else {
    return product.couponRate
  }

}

////////////////////////////////////////////////////////////////////////////////////////////////////////////

export function noCouponPaid(observation, product) {

  if (product.memoryCoupon) {

    console.log(memoryBucket)

   //memoryBucket = memoryBucket + product.couponRate

  return true

  } else {

  }

}

////////////////////////////////////////////////////////////////////////////////////////////////////////////

export function earlyRedemption(observation, product) {

return true
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////

export function productContinues(observation, product) {

return true
}
