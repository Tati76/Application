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
	"inholdinfodb.findChild"(id){
		console.log("lksj");
		return InholdInfoDb.find({"Parent Id" : id}).fetch();
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
 
		var toDeleteArray = []; // all the boxes to delete
		
		var secondArray = [];  // all the boxes you go through
		secondArray.push(taskId);
		var thirdArray = []; // all the boxes you find
		var running = true;
		console.log("lksdjfljsdlf");
		while(running)
		{
			thirdArray = [];
			for(var i = 0 ; i< secondArray.length ; i++ )
			{
				var tempArray = InholdInfoDb.find({"Parent Id" : secondArray[i]}).fetch().slice();
				for (var a = 0; a<tempArray.length ; a++)
				{
					thirdArray.push(tempArray[a]._id);
				}
			}

			//add second to first and third to second

			for(var i = 0 ; i< secondArray.length ; i++ )
			{
				toDeleteArray.push(secondArray[i]);
			}

			secondArray = [];

			for (var i = 0 ; i<thirdArray.length ; i++)
			{
				secondArray.push(thirdArray[i]);
			}

			thirdArray = [];

			if (thirdArray.length == 0 && secondArray == 0) // no more results
			{
				running = false;
			}
		}

		for (var i = 0 ; i<toDeleteArray.length ; i++)
		{
			InholdInfoDb.remove(toDeleteArray[i]);
		}

		return toDeleteArray;
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