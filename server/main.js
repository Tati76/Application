import { Meteor } from 'meteor/meteor';
//import '../client/imports/api/inholdinfodb.js';
InholdInfoDb = new Mongo.Collection('inholdinfodb');
Meteor.startup(() => {
  // code to run on server at startup
});
