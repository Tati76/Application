// <CreateNewBox language={this.props.language} index={this.props.index} 

CreateNewBox = React.createClass({
	
	getInitialState(){
		return null;
	},

	componentWillReceiveProps: function(nextProps) {

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