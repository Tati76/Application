import { InholdInfoDb } from '../../../imports/api/inholdinfodb.js';


InfoDisplayer = React.createClass({

	mixins: [ReactMeteorData],

	getMeteorData: function () {
		var data = {};
		var handle = Meteor.subscribe('inholdinfodb');
	    if(handle.ready()) {
	      	data.sample = InholdInfoDb.findOne(this.props.currentBoxId); // Only catches the boxes that are not storable in others
	    }
	    return data;
	},

	componentWillReceiveProps: function(nextProps) {

	},

	shouldComponentUpdate: function(nextProps, nextState) {
		var shallowCompare = require('react-addons-shallow-compare');
		return shallowCompare(this, nextProps, nextState);
	},

	componentDidUpdate: function(prevProps, prevState){ 

	},

	dateToString : function(choosenDate)
	{
		var tempSplit = choosenDate.toString().split(" ");
		var tempDate = "";
		for (var i=0 ; i<4; i++)
		{
			tempDate += tempSplit[i];
			tempDate += " ";
		}
		return tempDate;
	},

	renderDisplayer(input,index){

		if (input =="createdAt")
		{
			var dateToDisplay = this.dateToString(this.data.sample[input])
			return(
				<div className="form-group form-group-sm">
				    <label for="inputEmail3" className="col-sm-2 control-label">{input}</label>
				    <div className="col-sm-10">
				      	<input type="email" className="form-control" id="inputEmail3" placeholder={dateToDisplay} disabled/>
				    </div>
				</div>
			);
		}

		else if(input =="_id" || input =="Box Type")
		{
			return(
				
				<div className="form-group form-group-sm">
				    <label for="inputEmail3" className="col-sm-2 control-label">{input} (Not dynamic)</label>
				    <div className="col-sm-10">
				      	<input type="email" className="form-control" id="inputEmail3" placeholder={this.data.sample[input]} disabled/>
				    </div>
				</div>
				
			);
		}

		else{
			return(
				
				<div className="form-group form-group-sm">
				    <label for="inputEmail3" className="col-sm-2 control-label">{input} (Not dynamic)</label>
				    <div className="col-sm-10">
				      	<input type="email" className="form-control" id="inputEmail3" placeholder={this.data.sample[input]}/>
				    </div>
				</div>
				
			);
		}
		
	},

	render(){
		return(
			<div className="container-flux" style={{"border":"1px solid black","paddingLeft" : "30px","paddingRight" : "30px"}}>
				<h2 className="text-center"> Info Displayer (Not dynamic)</h2>
				<button type="button" className="btn btn-primary">Edit this box (Not dynamic)</button>
				<form className="form-horizontal">
				{this.data.sample? Object.keys(this.data.sample).map(this.renderDisplayer) : <p> Loading... </p>}
				</form>
				<button type="button" className="btn btn-primary">Lend this box (Not dynamic)</button>
			</div>
		);
	}
});

//<p key={"d"+index} className="text-center text-primary" contenteditable="true"> {input} : {dateToDisplay} </p>
				

//<p key={"d"+index} className="text-center text-primary" contenteditable="true"> {input} : {this.data.sample[input]} </p>