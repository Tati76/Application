
SampleViewer = React.createClass({

	getInitialState(){
		var tempAttributesToDisplay = [{one : "ID", two : this.props.dbObject._id}, {one : 'Box Type',two :this.props.dbObject['Box Type'] }, {one : this.props.chosenAttribute,two :this.props.dbObject[this.props.chosenAttribute]} ];

		return{
			attributesToDisplay : tempAttributesToDisplay.slice()
		};
	},

	componentWillReceiveProps: function(nextProps) {
		if(nextProps.chosenAttribute == "createdAt")
		{
			var dateToShow = nextProps.dbObject[nextProps.chosenAttribute];
			var tempAttributesToDisplay = [{one : "ID", two : nextProps.dbObject._id}, {one : 'Box Type',two :nextProps.dbObject['Box Type'] }, {one : nextProps.chosenAttribute,two : dateToShow} ];
		}
		else{
			var tempAttributesToDisplay = [{one : "ID", two : nextProps.dbObject._id}, {one : 'Box Type',two :nextProps.dbObject['Box Type'] }, {one : nextProps.chosenAttribute,two : nextProps.dbObject[nextProps.chosenAttribute]} ];
		}
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
			
			<div className="col-sm-4 hidden-print" style={{"wordWrap":"break-word"}}>
				<p key={index}> <strong>{this.state.attributesToDisplay[index].one}</strong> : {this.state.attributesToDisplay[index].two} </p>
			</div>
		);
	},

	render(){

		console.log("render SampleViewer");
		return(

			<div className="container-fluid"> 
				<div className="row">
					{Object.keys(this.state.attributesToDisplay).map(this.renderComponent)}
				</div>
			</div>
		);

	}


});