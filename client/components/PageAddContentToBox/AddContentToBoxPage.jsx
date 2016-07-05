import { InholdInfoDb } from '../../../imports/api/inholdinfodb.js';

AddContentToBox = React.createClass({

	getInitialState(){
		console.log("getInitialState");

		return {selectedBox : ""};
	},

	componentWillReceiveProps: function(nextProps) {

	},

	shouldComponentUpdate: function(nextProps, nextState) {
		console.log("componentshouldUpdate");
		var shallowCompare = require('react-addons-shallow-compare');
		return shallowCompare(this, nextProps, nextState);
	},

	componentDidUpdate: function(prevProps, prevState){ 

	},

	selectClicked: function(event)
	{
		if (this.state.selectedBox != event.target.value) // onl change the state when we click a new option
		{
			this.setState({selectedBox : event.target.value});
		}
		
	},

	renderForm()
	{
		console.log(this.state.selectedBox);
		if(this.state.selectedBox == "")
		{
			return(
				<div className="container-fluid">
					<AddContentToBoxSelect boxId={this.props.boxId} onClick={this.selectClicked}/>
				</div>
			);
		}
		else{
			return(
				<div className="container-fluid">
					<AddContentToBoxSelect boxId={this.props.boxId} onClick={this.selectClicked}/>
					<AddContentToBoxFormular boxType={this.state.selectedBox} boxId={this.props.boxId} boxTypeToAdd={this.state.selectedBox}/>
				</div>
			);
		}
	},

	render(){
		console.log("render");
		return(
			<div className="container-fluid">
				{this.renderForm()}
			</div>
		);
	}
});