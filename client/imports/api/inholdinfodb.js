InholdInfoDb = new Mongo.Collection('inholdinfodb');
 
 
 if (Meteor.isServer) {
	// This code only runs on the server
	Meteor.publish('inholdinfodb', function inholdInfoDbPublication() {
		return Tasks.find();
	});
}

Meteor.methods({
	'inholdInfoDb.insert'(newSample) {
		check(newSample, Object);
		
		// Make sure the user is logged in before inserting a task
		if (! this.userId) {
			throw new Meteor.Error('not-authorized (not logged on)');
		}
		
		inholdinfoDb.insert({
			newSample,
			createdAt: new Date(),
		});
	},
    'tasks.remove'(taskId) {
		check(taskId, String);
 
		Tasks.remove(taskId);
   }
})