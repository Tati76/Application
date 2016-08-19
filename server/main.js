import { Meteor } from 'meteor/meteor';
import '../imports/api/inholdinfodb.js';
import { HTTP } from 'meteor/http';
import {InholdInfoDb} from '../imports/api/inholdinfodb.js';
//InholdInfoDb = new Mongo.Collection('inholdinfodb');
Meteor.startup(() => {
  // code to run on server at startup
  // InholdInfoDb._ensureIndex({"Place" : "text"});
});




Meteor.methods({
	'getJson' :function(url,test) {
		var result = HTTP.call("get",url);
		console.log("JSON");
		return [result,test];
	},
	'getXML' :function(url,test) {
		var result = HTTP.call("get",url);
		console.log("XML");
		return [result,test];
	}
});
