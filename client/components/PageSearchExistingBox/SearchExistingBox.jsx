import boxFile from '../Boxes/BoxesInfo.json';
import displayFile from '../languages/Settings.json';
import {dateToString,findAllPossibleAttributes} from '../Functions/functionFile.js'
import { InholdInfoDb } from '../../../imports/api/inholdinfodb.js';

SearchExistingBox = React.createClass({

	mixins: [ReactMeteorData],

	getMeteorData() {
		var data = {};
		var handle = Meteor.subscribe('inholdinfodb');

	    if(handle.ready()) {
    		data.sample = InholdInfoDb.find().fetch(); // Only catches the boxes that are not storable in others
    		console.log(data.sample);
			data.samplesFittingTheCriterias = [];
			console.log(this.state.searchForm);
			if (this.state.searchForm)
			{

				for (var a = data.sample.length - 1 ; a >= 0 ; a--)
				{
					for (var i = 0 ; i<Object.keys(this.state.searchForm).length ; i++)
					{
						var stringToSearchIn = data.sample[a][Object.keys(this.state.searchForm)[i]];
						var stringToSearch = this.state.searchForm[Object.keys(this.state.searchForm)[i]];
			      		if(data.sample[a].hasOwnProperty(Object.keys(this.state.searchForm)[i])) // if it has the property
	    				{
				      		if(stringToSearchIn.search(stringToSearch) == -1)
				      		{
				      			data.sample.splice(a,1);
				      			break;
				      		}
			      		}
			      		else
			      		{
			      			data.sample.splice(a,1);
			      			break;
			      		}

				    }	
				}
	    // 		if(this.props.searchOptions[1] != "")
	    // 		{
	    // 			// Search Function
			  //     	//*****************************************************************************************
			      	
					// var stringToSearchIn = "";
					// var stringToSearch = "";
					// stringToSearch = this.props.searchOptions[1];
			  //     	for (var i=0 ; i<data.sample.length ; i++)
			  //     	{
			  //     		if(data.sample[i].hasOwnProperty(this.props.searchOptions[0])) // if it has the property
	    // 				{
				 //      		console.log(data.samplesFittingTheCriterias);
				 //      		stringToSearchIn = data.sample[i][this.props.searchOptions[0]];
				 //      		if(stringToSearchIn.search(stringToSearch) > -1)
				 //      		{
				 //      			data.samplesFittingTheCriterias.push(data.sample[i]);
				 //      		}
			  //     		}
			  //     	}   	
		   //    		//*****************************************************************************************
	    // 		}
	    // 		else
	    // 		{
    			for (var i=0 ; i<data.sample.length ; i++)
		      	{
		      		data.samplesFittingTheCriterias.push(data.sample[i]);
		      	} 
    		}
    		else
    		{
    			for (var i=0 ; i<data.sample.length ; i++)
		      	{
		      		data.samplesFittingTheCriterias.push(data.sample[i]);
		      	} 
    		}
	    }
	    		
	    
	    return data;
	},

	// getMeteorData() {
	// 	var data = {};
	// 	var handle = Meteor.subscribe('search',"i");

	//     if(handle.ready()) {
	//     		data.sampleFittingTheCriterias = InholdInfoDb.find().fetch(); // Only catches the boxes that are not storable in others
	//     		console.log(data.sample);
	// 			// data.samplesFittingTheCriterias = [];
	// 	}
	// 	return data;
	// },
	
	getInitialState(){
		return {
			language : this.props.language,
			index : this.props.index,
			searchForm : {}
		};
	},

	componentWillReceiveProps: function(nextProps) {
		this.setState({language:nextProps.language, index : nextProps.index});
	},

	shouldComponentUpdate: function(nextProps, nextState) {
		var shallowCompare = require('react-addons-shallow-compare');
		return shallowCompare(this, nextProps, nextState);
	},

	componentDidUpdate: function(prevProps, prevState){ 

	},

	renderCompo(input,index)
	{
		console.log(this.data.samplesFittingTheCriterias[input]);
		var tempPath = "";
		var pathArray = FlowRouter.current().path.split("/");
		pathArray.pop();
		pathArray.push("SeeBoxes");
		pathArray.push(this.data.samplesFittingTheCriterias[input]._id);

		for (var i = 1 ; i<pathArray.length ; i++)
		{
			tempPath += '/';
			tempPath += pathArray[i];
		}
		console.log(tempPath);

		return(
			<a href={tempPath} className="list-group-item" key={index}>
				<SampleViewer language={this.state.language} index={this.state.index} key={"c"+index} dbObject={this.data.samplesFittingTheCriterias[input]} chosenAttribute={"_id"}/>
			</a>
		);
	},

	clickSubmit(arg)
	{
		console.log("clickSubmit");
		console.log(arg);
		var tempObject = {};
		for (var i = 0 ; i<Object.keys(arg).length ; i++)
		{
			if (arg[Object.keys(arg)[i]] != "" && arg[Object.keys(arg)[i]].trim().length > 0)
			{
				tempObject[Object.keys(arg)[i]] = arg[Object.keys(arg)[i]];
			}
		}
		this.setState({searchForm : tempObject}, function(){console.log(this.state.searchForm);});
	},

	clickReturn(event)
	{
		console.log("clickReturn");
	},

	render(){
		console.log("render ContentDisplayer");
		var er = findAllPossibleAttributes("Norsk");
		console.log(er);
		var en = findAllPossibleAttributes("English");
		console.log(en);
		console.log("**********************************************************");
		console.log(this.state.language);
		console.log(this.state.index);
		console.log(findAllPossibleAttributes(this.state.language).slice());
		console.log(findAllPossibleAttributes("English")[0]);
		console.log("**********************************************************");
		var tempArray = findAllPossibleAttributes(this.state.language).slice();
		return(
			<div className='container-fluid'>
			{this.data.samplesFittingTheCriterias?
				<div >
				
	    			<div className="col-lg-6 text-center" >
	    				<h3 className='text-primary'>{displayFile.setups[this.state.index].searchAllTest.form} </h3>
	    				<DynamicForm language={this.state.language} 
									index={this.state.index} 
									info={[tempArray[0],tempArray[1],tempArray[2]]} 
									dbInfo={findAllPossibleAttributes("English")[0]} 
									boxType={""} 
									giveValue={this.clickSubmit} 
									placeHold={[[],[],[]]}
									onReturn={this.clickReturn}
									isTable={false}
									buttons={"research"}/>
	    				
	    			</div>
	    			<div className="col-lg-6 text-center">
	    				<h3 className='text-primary'>{displayFile.setups[this.state.index].searchAllTest.boxList} </h3>
	    				<div className="list-group">
							{this.data.samplesFittingTheCriterias? Object.keys(this.data.samplesFittingTheCriterias).map(this.renderCompo) : <p> Loading... </p>}
						</div>
	    			</div>

	    		</div>
	    		: <p> Loading... </p>}
	    	</div>
			
		);
	}
});

// mixins: [ReactMeteorData],

// 	getMeteorData: function () {
		
// 	},


// style={{"maxHeight" : "80vh","overflow-y": "scroll"}}