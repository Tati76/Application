Meteor.methods({
	addInholdInfo(sampleObject) {
		InholdInfoDb.insert(sampleObject);
	}
});