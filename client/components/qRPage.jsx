import { InholdInfoDb } from '../../imports/api/inholdinfodb.js';


QRPage = React.createClass({

	getInitialState() {
		return {
			objectTest : {key1 : 'hello' , key2 : 'hello2'}
		};

	},

	shouldComponentUpdate: function(nextProps, nextState) {
		if (nextProps.language !== this.props.language) // if a prop change, update !
		{
			return nextProps.language !== this.props.language;
		}
		else if (nextProps.index !== this.props.index)
		{
			return nextProps.index !== this.props.index;
		}
		else
		{
			return false;
		}
	},

	renderTable(input,index)
	{
		Meteor.call('inholdinfodb.find',this.props.id,function(error, result){ console.log(result)});
		console.log(InholdInfoDb.find());
		console.log(input);
		console.log(this.state.objectTest[input]);
		
		return (
			<tr>
				<td>{input}</td>
				<td>{this.state.objectTest[input]}</td>
			</tr>
		)
	},

	render() {
		console.log("init qr");
		var testObj = Object.keys(this.state.objectTest);
		return (
			<div className="container">
			  <h2>Values</h2>
			  <p>The .table-bordered class adds borders to a table:</p>
			  <table className="table table-bordered">
			    <tbody>
			      {testObj.map(this.renderTable)}
			    </tbody>
			  </table>
			</div>
			);
	}
});