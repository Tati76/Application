import {translate,translateWord} from '../Functions/functionFile.js';
import {wrap} from './sampleViewStyle.css';

SampleViewer = React.createClass({

	getInitialState(){
		var tempAttributesToDisplay = [{one : "ID", two : this.props.dbObject._id}, {one : translate('Box Type',this.props.language,this.props.dbObject["Box Type"]),two :this.props.dbObject['Box Type'] }, {one : this.props.chosenAttribute,two :this.props.dbObject[this.props.chosenAttribute]} ];

		return{
			attributesToDisplay : tempAttributesToDisplay.slice(),
			language : this.props.language,
			index : this.props.index
		};
	},

	componentWillReceiveProps: function(nextProps) {
		this.setState({index : nextProps.index, language : nextProps.language});

		var tempAttributesToDisplay = [{one : "ID", two : nextProps.dbObject._id}, {one : translate('Box Type',nextProps.language,nextProps.dbObject["Box Type"]),two :nextProps.dbObject['Box Type'] }, {one : translate(nextProps.chosenAttribute,nextProps.language,nextProps.dbObject["Box Type"]),two : nextProps.dbObject[nextProps.chosenAttribute]} ];
		
		this.setState({attributesToDisplay : tempAttributesToDisplay.slice()});
	},

	// To make the component render if a prop or a state changes
	shouldComponentUpdate: function(nextProps, nextState) {
		var shallowCompare = require('react-addons-shallow-compare');
		return shallowCompare(this, nextProps, nextState);
	},

	renderComponent(input,index)
	{
		//console.log(this.state.attributesToDisplay[index].one+ ":" +this.state.attributesToDisplay[index].two);
		return(
			
			<div className="col-sm-4 hidden-print" key={index}>
				<p key={index} className='wrap'> <strong>{this.state.attributesToDisplay[index].one}</strong> : {this.state.attributesToDisplay[index].two} </p>
			</div>
		);
	},

	render(){

		console.log("render SampleViewer");
		return(

			<div className="container-fluid"> 
				<div className="row" style={{"padding":"0px"}}>
					{Object.keys(this.state.attributesToDisplay).map(this.renderComponent)}
				</div>
			</div>
		);
	}


});