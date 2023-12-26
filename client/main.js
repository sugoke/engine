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



Template.hello.onCreated(function() {

  // Now you can use autocallableReverseConvertibleProduct directly
  let product = autocallableReverseConvertibleProduct;


  console.log(product)


  // Call the observationsDuringLife function and log the result
  Meteor.call('observationsDuringLife', product, (error, result) => {
       if (error) {
         console.error("Error calling 'observationsDuringLife' method:", error);
       } else {
         console.log("Result:", result);
       }
     });

});



Template.hello.helpers({

});

Template.hello.events({

});
