import { Meteor } from 'meteor/meteor';

dummyStockData = {
  "22/09/2023": { "Capgemini_SE": 100, "Schneider_Electric_SE": 100, "Vestas_Wind_Systems": 100 },
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



Meteor.methods({
  'observationsDuringLife': function(product) {

    if (product.observationType === "specificDates") {
      let observationsTable = emptyTableCreation(product);
     let memoryBucket = 0;


     observationsTable.forEach(observation => {
       product.rules.duringLife.subrules.forEach(subrule => {
         const stockData = dummyStockData[observation.monitoringDate];
         const checkFunction = ruleFunctions[subrule.checkCondition];

         if (typeof checkFunction === 'function') {
           console.log(`Function found for checkCondition: ${subrule.checkCondition}`);
           checkFunction(/* pass appropriate arguments here */);
         } else {
           console.log(`Function not found for checkCondition: ${subrule.checkCondition}`);
         }



  //        if (conditionMet) {
            // Dynamically call the actionIfTrue function
  //          this[subrules.actionIfTrue](/* parameters */);
  //        } else {
            // Dynamically call the actionIfFalse function
    //        this[subrules.actionIfFalse](/* parameters */);
    //      }

          // Check for early redemption and break if needed
  //        if (observation.earlyRedemption) {
  //          return; // Break out of the loop
  //        }
        });
      });

      return observationsTable;
    }
  }
});




////////////// FUNCTiONS ///////////////////////

// Define emptyTableCreation as a regular function, not as a Meteor method
const emptyTableCreation = (product) => {
  return product.monitoringDates.map(dateInfo => {
    return {
      monitoringDate: dateInfo.monitoringDate,
      paymentDate: dateInfo.paymentDate,
      couponPaid: "",
      earlyRedemption: ""
    };
  });
};

// Define these functions either in the same server file or import them if defined elsewhere
const ruleFunctions = {
  underlyingAboveCouponBarrier: function() {/*...*/},
  calculateAndPayCouponPlusMemoryBucketCoupons: function(memoryBucket, couponRate, nominalValue) {/*...*/},
  underlyingAboveAutocallBarrier: function(stockData, autocallLevel) {/*...*/},
  earlyRedemption: function() {/*...*/},
  productContinues: function() {/*...*/}
};
