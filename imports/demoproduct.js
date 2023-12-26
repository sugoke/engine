export const autocallableReverseConvertibleProduct = {
  name: "Autocallable Reverse Convertible",
  underlyings: [
    { name: "Capgemini SE", spotReferencePrice: 176.22, strikePrice: 105.73, couponLevel: 105.73, autocallLevel: 176.22 },
    { name: "Schneider Electric SE", spotReferencePrice: 161.39, strikePrice: 96.83, couponLevel: 96.83, autocallLevel: 161.39 },
    { name: "Vestas Wind Systems A/S", spotReferencePrice: 189.62, strikePrice: 113.77, couponLevel: 113.77, autocallLevel: 189.62 }
  ],
  issuePrice: "100.00%",
  nominalValue: 1000.00,
  referenceCurrency: "EUR",
  initialFixingDate: "21/06/2023",
  lastTradingDay: "22/06/2026",
  finalFixingDate: "22/06/2026",
  repaymentDate: "29/06/2026",
  couponRate: 0.0275, // 2.75%,
  strike: 0.6,
  leveraged: true,
  observationType: "specificDates",  // or "continuous"
  underlyingType: "worstPerforming",  // or "bestPerforming", "average", "single"


  monitoringDates: [
    { monitoringDate: '22/09/2023', paymentDate: '29/09/2023', couponLevel: 60, autocallLevel: 100 },
    { monitoringDate: '22/12/2023', paymentDate: '29/12/2023', couponLevel: 60, autocallLevel: 100 },
    { monitoringDate: '22/03/2024', paymentDate: '28/03/2024', couponLevel: 60, autocallLevel: 100 },
    { monitoringDate: '21/06/2024', paymentDate: '28/06/2024', couponLevel: 60, autocallLevel: 100 },
    { monitoringDate: '20/09/2024', paymentDate: '30/09/2024', couponLevel: 60, autocallLevel: 100 },
    { monitoringDate: '20/12/2024', paymentDate: '30/12/2024', couponLevel: 60, autocallLevel: 100 },
    { monitoringDate: '21/03/2025', paymentDate: '31/03/2025', couponLevel: 60, autocallLevel: 100 },
    { monitoringDate: '20/06/2025', paymentDate: '30/06/2025', couponLevel: 60, autocallLevel: 100 },
    { monitoringDate: '19/09/2025', paymentDate: '29/09/2025', couponLevel: 60, autocallLevel: 100 },
    { monitoringDate: '19/12/2025', paymentDate: '29/12/2025', couponLevel: 60, autocallLevel: 100 },
    { monitoringDate: '20/03/2026', paymentDate: '30/03/2026', couponLevel: 60, autocallLevel: 100 },
    { monitoringDate: '19/06/2026', paymentDate: '29/06/2026', couponLevel: 60, autocallLevel: 100 }
  ],

  rules: {

    duringLife: {
       observationType: "specificDates",
       subrules: [
         {
           id: 0,
           checkCondition: "underlyingAboveCouponBarrier",
           actionIfTrue: "calculateAndPayCouponPlusMemoryBucketCoupons",
           actionIfFalse: "accumulateInMemoryBucket"
         },
         {
           id: 1,
           checkCondition: "underlyingAboveAutocallBarrier",
           actionIfTrue: "earlyRedemption",
           actionIfFalse: "productContinues"
         }
       ]
     },

    atMaturity: {
      type: "conditional",
      condition: "allAboveStrikePrices",
      trueOutcome: "repayNominalValue",
      falseOutcome: {
        action: "payReducedAmount",
        calculationBasis: "worstPerformingUnderlying"
      }
    }
  }
};


export const dummyStockData = {
  "22/09/2023": { "Capgemini_SE": 125.97, "Schneider_Electric_SE": 173.44, "Vestas_Wind_Systems": 106.33 },
  "22/12/2023": { "Capgemini_SE": 95.96, "Schneider_Electric_SE": 105.28, "Vestas_Wind_Systems": 161.97 },
  "22/03/2024": { "Capgemini_SE": 113.44, "Schneider_Electric_SE": 100.67, "Vestas_Wind_Systems": 166.08 },
  "21/06/2024": { "Capgemini_SE": 168.25, "Schneider_Electric_SE": 174.46, "Vestas_Wind_Systems": 127.24 },
  "20/09/2024": { "Capgemini_SE": 103.69, "Schneider_Electric_SE": 81.86, "Vestas_Wind_Systems": 164.45 },
  "20/12/2024": { "Capgemini_SE": 125.79, "Schneider_Electric_SE": 152.31, "Vestas_Wind_Systems": 171.44 },
  "21/03/2025": { "Capgemini_SE": 138.82, "Schneider_Electric_SE": 171.37, "Vestas_Wind_Systems": 80.67 },
  "20/06/2025": { "Capgemini_SE": 172.29, "Schneider_Electric_SE": 97.28, "Vestas_Wind_Systems": 166.17 },
  "19/09/2025": { "Capgemini_SE": 105.52, "Schneider_Electric_SE": 171.08, "Vestas_Wind_Systems": 114.02 },
  "19/12/2025": { "Capgemini_SE": 120.59, "Schneider_Electric_SE": 92.03, "Vestas_Wind_Systems": 92.19 },
  "20/03/2026": { "Capgemini_SE": 126.19, "Schneider_Electric_SE": 162.94, "Vestas_Wind_Systems": 106.38 },
  "19/06/2026": { "Capgemini_SE": 130.36, "Schneider_Electric_SE": 102.22, "Vestas_Wind_Systems": 104.49 }
};
