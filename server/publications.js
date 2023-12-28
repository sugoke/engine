import { Meteor } from 'meteor/meteor';
import { Products } from '/imports/api/ProductsCollection.js';

Meteor.publish('allProducts', function publishAllProducts() {
  return Products.find();
});
