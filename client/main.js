import {
  Template
} from 'meteor/templating';
import {
  ReactiveVar
} from 'meteor/reactive-var';

import './main.html';
import {
  autocallableReverseConvertibleProduct,
  dummyStockData
} from '/imports/demoproduct.js';

import * as blocks from '/imports/blocks.js';

Template.hello.onCreated(function() {

  // Now you can use autocallableReverseConvertibleProduct directly
  let product = autocallableReverseConvertibleProduct;
  let stockData = dummyStockData;

  console.log(product)
  console.log(dummyStockData)








  // Extract and log each observation date
  const observationDates = autocallableReverseConvertibleProduct.monitoringDates.map(dateInfo => {
    return {
      monitoringDate: dateInfo.monitoringDate,
      paymentDate: dateInfo.paymentDate
    };
  });

  console.log(observationDates);
});



Template.hello.helpers({

});

Template.hello.events({

});
