import boxFile from '../Boxes/BoxesInfo.json';
import displayFile from '../languages/Settings.json';
import {dateToString} from '../Functions/functionFile.js';

Login = React.createClass({

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
			<div className="wrapper col-sm-4 col-sm-offset-4">
				<form className="form-signin">       
					<h2 className="form-signin-heading">{displayFile.setups[this.state.index].pageLogin.title}</h2>
					<input type="text" className="form-control" name="username" placeholder="Username" required="" />
					<input type="password" className="form-control" name="password" placeholder="Password" required=""/>
					<button className="btn btn-lg btn-primary btn-block" type="submit" style={{"marginTop":"10px"}}>{displayFile.setups[this.state.index].pageLogin.buttons.submit}</button>
				</form>
			</div>
		);
	}
});


// <label className="checkbox text-center">
// 						<input type="checkbox" value="remember-me" id="rememberMe" name="rememberMe"/> Remember me
// 					</label>