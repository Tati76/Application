import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
export const InholdInfoDb = new Mongo.Collection('inholdinfodb');

 if (Meteor.isServer) {
	// This code only runs on the server
	

	Meteor.publish('inholdinfodb', function inholdInfoDbPublication() {
		return InholdInfoDb.find();
	});
	Meteor.publish("search", function(searchValue) {
	  if (!searchValue) {
	    return InholdInfoDb.find({});
	  }
	  return InholdInfoDb.find({ $text: {$search: searchValue} });
	});
}

Meteor.methods({
	'inholdinfodb.find'(id) {
		return InholdInfoDb.find({_id : id}).fetch();
	},
	'inholdinfodb.insert'(newSample,options) {
		//check(newSample, Object);
		var date = new Date();
		var stringdate = "";
		stringdate += date.getDate() + '/' + (date.getMonth() + 1) + '/' +  date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes() + ":" +date.getSeconds();		
		newSample['CreatedAt'] = stringdate;
		var thisID = InholdInfoDb.insert(
			newSample
		);
		return [thisID,options];
	},
    'inholdinfodb.remove'(taskId) {
		check(taskId, String);
 
		InholdInfoDb.remove(taskId);
		InholdInfoDb.remove({"Parent Id" : taskId});
   },
   'inholdinfodb.update'(sampleId,sampleToAdd) {
		var tempObject = {};
		console.log(sampleId);
	   	for (var i = 0 ; i<Object.keys(sampleToAdd).length ; i++) 
	   	{
	   		var stringKey = Object.keys(sampleToAdd)[i];
	   		var stringValue = sampleToAdd[Object.keys(sampleToAdd)[i]];
	   		console.log(stringKey);
	   		console.log(stringValue);
	   		tempObject[stringKey] = stringValue;
	   		console.log(tempObject);
	   		
	   	}

	   	InholdInfoDb.update(sampleId, {
	     		$set: tempObject,
	     	});
   	
   }
});