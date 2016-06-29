SampleViewer = React.createClass({

	getInitialState(){

		console.log(this.props.dbObject);
		console.log(this.props.chosenAttribute);
		var tempAttributesToDisplay = [{one : "ID", two : this.props.dbObject._id}, {one : 'Test Type',two :this.props.dbObject['Test Type'] }, {one : this.props.chosenAttribute,two :this.props.dbObject[this.props.chosenAttribute]} ];

		return{
			attributesToDisplay : tempAttributesToDisplay.slice()
		};
	},

	componentWillReceiveProps: function(nextProps) {},

	// To make the component render if a prop or a state changes
	shouldComponentUpdate: function(nextProps, nextState) {
		var shallowCompare = require('react-addons-shallow-compare');
		return shallowCompare(this, nextProps, nextState);
	},

	renderComponent(input,index)
	{
		console.log(this.state.attributesToDisplay[index.one]);
		console.log(this.state.attributesToDisplay[input.one]);
		return(
			
			<div className="col-sm-4 hidden-print">
				<p key={index}> {this.state.attributesToDisplay[index].one} : {this.state.attributesToDisplay[index].two} </p>
			</div>
		);
	},

	render(){
		return(

			<div className="container-fluid"> 
				<div className="row">
					{Object.keys(this.state.attributesToDisplay).map(this.renderComponent)}
				</div>
			</div>
		);

	}


});