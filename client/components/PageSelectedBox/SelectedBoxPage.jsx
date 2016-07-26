import { InholdInfoDb } from '../../../imports/api/inholdinfodb.js';
import boxFile from '../Boxes/BoxesInfo.json';
import displayFile from '../languages/Settings.json';
import {translate} from '../Functions/functionFile.js'

SelectedBoxContent = React.createClass({
	mixins: [ReactMeteorData],

	getMeteorData: function () 
	{
		var data = {};
		var handle = Meteor.subscribe('inholdinfodb');
	    if(handle.ready()) {
	      	data.sample = InholdInfoDb.findOne(this.props.boxId); // Only catches the boxes that are not storable in others
	      	data.content = InholdInfoDb.find({ "Parent Id" : this.props.boxId}).fetch();
	      	console.log(data.content);
	      	// Prepare the object for the info selector component
	      	//*****************************************************************************************
	      	data.list = [];
	      	if (Object.keys(data.sample).length)
	      	{
		      	for (var count = 0 ; count < Object.keys(data.sample).length ; count++)
		      	{
		      		if(Object.keys(data.sample)[count] == "createdAt") // to handle the date and make it printable by transforming it in string and shortening it
		      		{
		      			var tempSplit = data.sample[Object.keys(data.sample)[count]].toString().split(" ");
		      			var tempDate = "";
		      			for (var i=0 ; i<4; i++)
		      			{
		      				tempDate += tempSplit[i];
		      				tempDate += " ";
		      			}
		      			data.list.push({one : Object.keys(data.sample)[count], two : tempDate, three : translate(Object.keys(data.sample)[count],this.props.language,data.sample['Box Type'])}); //one is english, two is the value, three is the currentLanguage
		      		}
		      		else { // if not a date, do nothing
		      			data.list.push({one : Object.keys(data.sample)[count] , two : data.sample[Object.keys(data.sample)[count]], three:translate(Object.keys(data.sample)[count],this.props.language,data.sample['Box Type']) });
		      		}
		      		
			      	
		      	}
		      	
	      	}
	      	//console.log(data.list);
	    }
	    return data;
	},

	getInitialState(){
		return{
			attributeToSearch : "_id",
			searchValue : "",
			language : this.props.language,
			index : this.props.index
		};
	},

	componentWillReceiveProps: function(nextProps) {
		this.setState({index : nextProps.index, language : nextProps.language});
	},

	shouldComponentUpdate: function(nextProps, nextState) {
		console.log("component updating");
		var shallowCompare = require('react-addons-shallow-compare');
		return shallowCompare(this, nextProps, nextState);
	},

	componentDidUpdate: function(prevProps, prevState){ 

	},




	renderPage(input, index)
	{
		return(
			<p key={index} className="text-center"> {input.one} : {input.two} </p>
		);
	},

	renderOptions(input,index) 
	{
		//console.log(input);
		return(
			<option key={"o"+index} value={input.one}> {input.three} </option>
		);
	},

	renderCompo(attribute)
	{
		return(
			<ContentDisplayer language={this.state.language} index={this.state.index} containerId={this.props.boxId} chosenAttribute={attribute} searchOptions={[attribute,this.state.searchValue]}/>
		);
	},

	renderInfoDisplayer()
	{
		console.log("Rendering InfoDisplayer");
		return(
			<InfoDisplayer language={this.state.language} index={this.state.index} currentBoxId={this.props.boxId} language={this.state.language} index={this.state.index} boxObject={this.data.sample}/>
		);

	},

	clickSelect: function(event)
	{
		console.log("******************************************");
		this.setState({attributeToSearch : event.target.value});
	},

	searchChanged: function(event) //For the search
	{
		this.setState({searchValue : event.target.value});
	},

	render(){
		console.log("render AddContentSelectedBox");
		return(

			<div className='container-fluid'>
				<div className="row">
	    			<div className="col-lg-6">
						{this.data.sample? this.renderInfoDisplayer() : <p> Loading... </p>}
					</div>
					<div className="col-lg-6">
							<h2 className="text-center">{displayFile.setups[this.state.index].SeeBoxPage.titles.content}</h2>
							<form className="form-inline ">
							  	<div className="form-group ">
								    <select className="form-control input" onClick={this.clickSelect}>
										{this.data.list? this.data.list.map(this.renderOptions) : <option> Loading... </option>}
									</select>

								    <input type="text" className="form-control" id="exampleInputEmail2" placeholder={displayFile.setups[this.state.index].searchComponent.input.placeholder} onChange={this.searchChanged}/>
							  	
								  	<button type="button" className="btn btn-default">
									  	<span className="glyphicon glyphicon-search" aria-hidden="true"></span>
									</button>
								</div>
						</form>
						<div className="container-fluid">
							<div className="list-group">
								{this.data.sample? this.renderCompo(this.state.attributeToSearch) : <p> Loading... </p>}
							</div>
							<a href={FlowRouter.current().path + "/AddContent"} type="button" className="btn btn-primary center-block">{displayFile.setups[this.state.index].SelectedBoxPage.buttons.addContent}</a>
						</div>
					</div>
				</div>
			</div>

		);
	}
});