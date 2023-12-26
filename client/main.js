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


//if product as observation dates :   observationType == specificDates

const emptyTable = blocks.emptyTableCreation(autocallableReverseConvertibleProduct);
console.log(emptyTable);

// Loop through array


});



Template.hello.helpers({

});

Template.hello.events({

});
