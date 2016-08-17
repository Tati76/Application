import boxFile from '../Boxes/BoxesInfo.json';
import displayFile from '../languages/Settings.json';
import {dateToString} from '../Functions/functionFile.js'

NAME= React.createClass({
	mixins: [ReactMeteorData],

	getMeteorData: function () {
		
	},
	
	getInitialState(){
		return {
			language : this.props.language,
			index : this.props.index	
		};
	},

	componentWillReceiveProps: function(nextProps) {
		this.setState({language : nextProps.language, index: nextProps.index});
	},

	shouldComponentUpdate: function(nextProps, nextState) {
		var shallowCompare = require('react-addons-shallow-compare');
		return shallowCompare(this, nextProps, nextState);
	},

	componentDidUpdate: function(prevProps, prevState){ 

	},

	render(){
		return(
			<p> New Compo </p>
		);
	}
});



// Buttons
 
// <div className="btn-group btn-group-justified" role="group" aria-label="...">
// 	<div className="btn-group" role="group">
// 		<button type="button" id="but" className="btn btn-primary hidden-print center-block" onClick={this.handlePrint}>{displayInfo.setups[this.state.index].QRPage.buttons.print}</button>
// 	</div>
// 	<div className="btn-group" role="group">
// 		<button type="button" id="but" className="btn btn-primary hidden-print center-block" onClick={this.handlePrint}>{displayInfo.setups[this.state.index].QRPage.buttons.return}</button>
// 	</div>
// </div>