NAME= React.createClass({
	mixins: [ReactMeteorData],

	getMeteorData: function () {
		
	},
	
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