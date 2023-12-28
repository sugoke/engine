export const autocallableReverseConvertibleProduct = {
  name: "Autocallable Reverse Convertible",
  underlyings: [
    { name: "Capgemini SE", spotReferencePrice: 100, strikePrice: 60, couponLevel: 60, autocallLevel: 100 },
    { name: "Schneider Electric SE", spotReferencePrice: 100, strikePrice: 60, couponLevel: 60, autocallLevel: 100 },
    { name: "Vestas Wind Systems A/S", spotReferencePrice: 100, strikePrice: 60, couponLevel: 60, autocallLevel: 100 }
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

  productAutocalled: false,
  productExpired: false,

  memoryCoupon: true,
  memoryBucket: 2,
  memoryLock: true,
  oneStar: false,


  monitoringDates: [
    { monitoringDate: '22/09/2023', paymentDate: '29/09/2023', couponLevel: 60, autocallLevel: 100 },
    { monitoringDate: '22/12/2023', paymentDate: '29/12/2023', couponLevel: 60, autocallLevel: 100 },
    { monitoringDate: '22/03/2024', paymentDate: '28/03/2024', couponLevel: 60, autocallLevel: 95 },
    { monitoringDate: '21/06/2024', paymentDate: '28/06/2024', couponLevel: 60, autocallLevel: 95 },
    { monitoringDate: '20/09/2024', paymentDate: '30/09/2024', couponLevel: 60, autocallLevel: 90 },
    { monitoringDate: '20/12/2024', paymentDate: '30/12/2024', couponLevel: 60, autocallLevel: 90 },
    { monitoringDate: '21/03/2025', paymentDate: '31/03/2025', couponLevel: 60, autocallLevel: 85 },
    { monitoringDate: '20/06/2025', paymentDate: '30/06/2025', couponLevel: 60, autocallLevel: 85 },
    { monitoringDate: '19/09/2025', paymentDate: '29/09/2025', couponLevel: 60, autocallLevel: 80 },
    { monitoringDate: '19/12/2025', paymentDate: '29/12/2025', couponLevel: 60, autocallLevel: 80 },
    { monitoringDate: '20/03/2026', paymentDate: '30/03/2026', couponLevel: 60, autocallLevel: 75 },
    { monitoringDate: '19/06/2026', paymentDate: '29/06/2026', couponLevel: 60, autocallLevel: 75 }
  ],

  rules: {

    duringLife: {
       observationType: "specificDates",
       subrules: [
         {
           checkCondition: "underlyingAboveCouponBarrier",
           actionIfTrue: "couponPaid",
           actionIfFalse: "noCouponPaid"
         },
         {
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
