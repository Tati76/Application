import { InholdInfoDb } from '../../../../imports/api/inholdinfodb.js';


LendBox = React.createClass({
	
	getInitialState(){
		var tempLendInfo = {};
		tempLendInfo["who"] = "";
		tempLendInfo["where"] = "";
		tempLendInfo["when"] = "";
		return{
			lendInfo : tempLendInfo
		};
	},

	componentWillReceiveProps: function(nextProps) {

	},

	shouldComponentUpdate: function(nextProps, nextState) {
		var shallowCompare = require('react-addons-shallow-compare');
		return shallowCompare(this, nextProps, nextState);
	},

	componentDidUpdate: function(prevProps, prevState){ 

	},

	clickLend(event)
	{
		var tempLendResponse = {};
		var tempStringAddon = "Lend ";
		tempLendResponse["Lend"] = "yes";
		for (var i = 0 ; i<Object.keys(this.state.lendInfo).length ; i++)
		{
			console.log(this.refs["l"+i].value);
			console.log(this.refs[i].value);
			tempLendResponse[tempStringAddon.concat(this.refs["l"+i].value)] = (this.refs[i].value);
			tempStringAddon = "Lend ";
		}

		Meteor.call('inholdinfodb.update',this.props.currentBoxId,tempLendResponse,function(error, result){console.log(result);});
		this.props.onClick(event);

	},

	renderForm(input,index)
	{
		return(
			<tr key={index}>
				<td className="text-center" ref={"l"+index} value={input}>{input} (Not dynamic)</td>
				<td className="text-center" ><input ref={index} type="text" className="form-control" placeholder={this.state.lendInfo[input]}/></td>
			</tr>
		);
	},

	render(){
		return(
			<div className="container-flux">
				<h2 className="text-center"> Lend Box Formular (Not dynamic)</h2>
				<form>
					<table border="1" className="table table-bordered">
						<tbody>
							{Object.keys(this.state.lendInfo).map(this.renderForm)}
						</tbody>
					</table>
				</form>
				<button type="button" className="btn btn-primary center-block" onClick={this.clickLend} value="Lend">Lend this box (Not dynamic)</button>
			</div>
		);
	}
});