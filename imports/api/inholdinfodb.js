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
	'inholdinfodb.insert'(newSample) {
		//check(newSample, Object);
		
		// Make sure the user is logged in before inserting a task
		/*if (! this.userId) {
			throw new Meteor.Error('not-authorized (not logged on)');
		}*/
		newSample['createdAt'] = new Date();
		var thisID = InholdInfoDb.insert(
			newSample
		);
		return thisID;
	},
    'inholdinfodb.remove'(taskId) {
		check(taskId, String);
 
		Tasks.remove(taskId);
   }
});