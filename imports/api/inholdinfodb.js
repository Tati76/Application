import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const InholdInfoDb = new Mongo.Collection('inholdinfodb');
 
 
 if (Meteor.isServer) {
	// This code only runs on the server
	Meteor.publish('inholdinfodb', function inholdInfoDbPublication() {
		return InholdInfoDb.find();
	});
}

Meteor.methods({
	'inholdinfodb.find'(id) {
		return InholdInfoDb.find({_id : id}).fetch();
	},
	'inholdinfodb.insert'(newSample,options) {
		//check(newSample, Object);
		
		newSample['createdAt'] = new Date();
		var thisID = InholdInfoDb.insert(
			newSample
		);
		return [thisID,options];
	},
    'inholdinfodb.remove'(taskId) {
		check(taskId, String);
 
		InholdInfoDb.remove(taskId);
   },
   'inholdinfodb.update'(sampleId,sampleToAdd) {

   	for (var i = 0 ; i<Object.keys(sampleToAdd).length ; i++) 
   	{
   		console.log(sampleToAdd);
   		var stringKey = Object.keys(sampleToAdd)[i];
   		var stringValue = sampleToAdd[Object.keys(sampleToAdd)[i]];
   		console.log(Object.keys(sampleToAdd)[i]);
   		console.log(sampleToAdd[Object.keys(sampleToAdd)[i]]);

   		InholdInfoDb.update(sampleId, {
     		$set: sampleToAdd,
     	});
   		
   	}
   	
   }
});