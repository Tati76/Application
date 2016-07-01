import { InholdInfoDb } from '../../../imports/api/inholdinfodb.js';
import boxFile from '../Boxes/BoxesInfo.json';

AddContentToBoxSelect = React.createClass({

	findContainerClass: function(containersEnglishName)
	{
		var containerClass = -1;
		for (var i = 0 ; i< boxFile.length ; i++)
		{
			if(boxFile[i].name.English == containersEnglishName)
			{
				containerClass = boxFile[i].containerClass;
			}
		}

		return containerClass;
	},

	findContainersToDisplay: function(containersClass)
	{
		var containersToDisplay = [];
		for (var i = 0 ; i< boxFile.length ; i++)
		{
			if(boxFile[i].containerClass > containersClass)
			{
				containersToDisplay.push(boxFile[i]) ;
			}
		}
		return containersToDisplay;
	},

	mixins: [ReactMeteorData],

	getMeteorData: function () {
		console.log("getMeteorData");
		var data = {};
		var handle = Meteor.subscribe('inholdinfodb');
	    if(handle.ready()) {

	    	data.sample = InholdInfoDb.findOne(this.props.boxId); // catches the wanted box
	    	var currentClass = this.findContainerClass(data.sample["Box Type"]);
	    	data.toDisplay = this.findContainersToDisplay(currentClass);
	    }
		return data;
	},
	
	getInitialState(){
		//var tempBoxList = ImportBoxList.boxes.slice();
		//console.log(require("../languages/Settings.json").languages[1]);
		console.log(require("../Boxes/BoxesInfo.json")[1].id);
		return null;
	},

	componentDidMount()
	{
		console.log(boxFile);
	},

	componentWillReceiveProps: function(nextProps) {

	},

	shouldComponentUpdate: function(nextProps, nextState) {
		var shallowCompare = require('react-addons-shallow-compare');
		return shallowCompare(this, nextProps, nextState);
	},

	componentDidUpdate: function(prevProps, prevState){ 

	},

	renderComponent(input, index){
		return(
			<option key={index} > {input.name.English} </option>
		);
	},

	render(){
		//console.log(this.state.boxList);
		return(
			<div>
			<p> {boxFile[1].id} (Not Dynamic)</p>
			<p> {require("../Boxes/BoxesInfo.json")[1].id} (Not Dynamic)</p>
			<p> select Not Dynamic </p>
			<select className="form-control input" onClick={this.props.onClick} placeholder='hello'>
				<option value="" hidden>Please select</option>
				{this.data.toDisplay? this.data.toDisplay.map(this.renderComponent) : <option> Loading </option>}
			</select>
			</div>
		);
	}
});