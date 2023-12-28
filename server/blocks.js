import {
  Meteor
} from 'meteor/meteor';
import * as AllFunctions from '/imports/functions.js';
import { Products } from '/imports/ProductsCollection.js';
import { Mongo } from 'meteor/mongo';

dummyStockData = {
  "22/09/2023": {
    "Capgemini_SE": 100,
    "Schneider_Electric_SE": 100,
    "Vestas_Wind_Systems": 100
  },
  "22/12/2023": {
    "Capgemini_SE": 98,
    "Schneider_Electric_SE": 105.28,
    "Vestas_Wind_Systems": 161.97
  },
  "22/03/2024": {
    "Capgemini_SE": 90,
    "Schneider_Electric_SE": 100.67,
    "Vestas_Wind_Systems": 166.08
  },
  "21/06/2024": {
    "Capgemini_SE": 168.25,
    "Schneider_Electric_SE": 174.46,
    "Vestas_Wind_Systems": 55
  },
  "20/09/2024": {
    "Capgemini_SE": 103.69,
    "Schneider_Electric_SE": 81.86,
    "Vestas_Wind_Systems": 164.45
  },
  "20/12/2024": {
    "Capgemini_SE": 125.79,
    "Schneider_Electric_SE": 152.31,
    "Vestas_Wind_Systems": 171.44
  },
  "21/03/2025": {
    "Capgemini_SE": 138.82,
    "Schneider_Electric_SE": 171.37,
    "Vestas_Wind_Systems": 80.67
  },
  "20/06/2025": {
    "Capgemini_SE": 172.29,
    "Schneider_Electric_SE": 97.28,
    "Vestas_Wind_Systems": 166.17
  },
  "19/09/2025": {
    "Capgemini_SE": 105.52,
    "Schneider_Electric_SE": 171.08,
    "Vestas_Wind_Systems": 114.02
  },
  "19/12/2025": {
    "Capgemini_SE": 120.59,
    "Schneider_Electric_SE": 92.03,
    "Vestas_Wind_Systems": 92.19
  },
  "20/03/2026": {
    "Capgemini_SE": 126.19,
    "Schneider_Electric_SE": 162.94,
    "Vestas_Wind_Systems": 106.38
  },
  "19/06/2026": {
    "Capgemini_SE": 130.36,
    "Schneider_Electric_SE": 102.22,
    "Vestas_Wind_Systems": 104.49
  }
};



// Map of function names to functions
const functionMap = {
  'worstPerforming': AllFunctions.worstPerforming,
  'getConsideredUnderlying': AllFunctions.getConsideredUnderlying,
  'calculatePerformance': AllFunctions.calculatePerformance,
  'underlyingAboveCouponBarrier': AllFunctions.underlyingAboveCouponBarrier,
  'underlyingAboveAutocallBarrier': AllFunctions.underlyingAboveAutocallBarrier,
  'couponPaid': AllFunctions.couponPaid,
  'noCouponPaid': AllFunctions.noCouponPaid,
  'earlyRedemption': AllFunctions.earlyRedemption,
  'productContinues': AllFunctions.productContinues,
  // ... other function mappings ...
};

Meteor.methods({
  'observationsDuringLife': function(product) {
    const observationsTable = [];

    let productRedeemedEarly = false;
    export let memoryBucket = 0;

    for (let i = 1; i < product.monitoringDates.length; i++) {

      if (productRedeemedEarly) {break}

      const observationDetails = product.monitoringDates[i];
      const consideredUnderlying = AllFunctions.getConsideredUnderlying(product, observationDetails); // Call the function

      // Get the initial date (assumed to be the first date in the stock data)
      const initialDate = Object.keys(dummyStockData)[0];

      // Calculate the underlying performance
      const underlyingPerformance = AllFunctions.calculatePerformance(dummyStockData, consideredUnderlying, initialDate, observationDetails.monitoringDate);

      // Get the current price for the observation date
      const currentPrice = dummyStockData[observationDetails.monitoringDate] ? dummyStockData[observationDetails.monitoringDate][consideredUnderlying] : null;

      const observation = {
        monitoringDate: observationDetails.monitoringDate,
        paymentDate: observationDetails.paymentDate,
        couponBarrier: observationDetails.couponLevel,
        autocallLevel: observationDetails.autocallLevel,
        consideredUnderlying: consideredUnderlying,
        underlyingLevel: currentPrice, // Write the current price here
        underlyingPerformance: underlyingPerformance.toFixed(2) + '%',
      };

      // Loop through each rule

      for (let j = 0; j < product.rules.duringLife.subrules.length; j++) {
        const subrule = product.rules.duringLife.subrules[j];

        if (functionMap[subrule.checkCondition]) {

          // Call the function dynamically and use checkCondition name as the column name
          const result = functionMap[subrule.checkCondition](observation, product);

          // Add the result to the observation object with the checkCondition name as the column name
          observation[subrule.checkCondition] = result;

          //si le resultat est positif, on execute la regle

          if (result) {

            const resultActionIfTrue = functionMap[subrule.actionIfTrue](observation, product);

            // Add the result to the observation object with the checkCondition name as the column name
            observation[subrule.actionIfTrue] = resultActionIfTrue;

            if(subrule.checkCondition === "underlyingAboveAutocallBarrier" && resultActionIfTrue) {

              productRedeemedEarly = true;

            }

            console.log(subrule.checkCondition + " : resultat true")

          } else {
            console.log(subrule.checkCondition + " : resultat false")
            const resultActionIfFalse = functionMap[subrule.actionIfFalse](observation, product);

            // Add the result to the observation object with the checkCondition name as the column name
            observation[subrule.actionIfFalse] = resultActionIfFalse;

          }
        }
      }

      observationsTable.push(observation);
    }

    return observationsTable;
  }
});
