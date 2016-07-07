import { InholdInfoDb } from '../../../imports/api/inholdinfodb.js';


InfoDisplayer = React.createClass({

	getInitialState()
	{
		return{
			editCurrentBox : false,
			lendCurrentBox : false
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

	handleClick: function(event)
	{
		console.log("****************************************");
		console.log(event.target.value);
		console.log("****************************************");
		if (event.target.value == "Lend" || event.target.value == "Return")  // Click to lend the box
		{
			this.handleLend(event);
		}
		else // Click to modify the Box Info
		{
			this.handleEdit(event);
		}
		
	},

	handleEdit: function(event)
	{
		
		console.log(event.target.value);
		var tempEditState = !this.state.editCurrentBox;
		this.setState({editCurrentBox : tempEditState});
		console.log("click on Edit or save");
		
	},

	handleLend: function(event)
	{
		console.log(event.target.value);
		var tempLendState = !this.state.lendCurrentBox;
		if (event.target.value != "Return") // In ordre not to change component if we return the box
		{
			this.setState({lendCurrentBox : tempLendState});
		}
		
		console.log("click on Lend this Box");
	},

	render(){
		if(this.state.editCurrentBox)
		{
			return(
				<div className="container-fluid" style={{"border":"1px solid black","paddingLeft" : "30px","paddingRight" : "30px"}}>
					<EditableInfoDisplayer currentBoxId={this.props.currentBoxId} onClick={this.handleClick}/>
					<button type="button" className="btn btn-primary center-block" disabled>Lend this box (Not dynamic)</button>
				</div>
			);
		}
		else if(this.state.lendCurrentBox)
		{
			return( // has to implement the save disable
				<div className="container-fluid" style={{"border":"1px solid black","paddingLeft" : "30px","paddingRight" : "30px"}}>
					<BorrowingForm language={this.props.language} index={this.props.index} boxObject={this.props.boxObject} submit={false} onClick={this.handleClick}/>
				</div>
			);
		}
		else
		{
			return(
				<div className="container-fluid" style={{"border":"1px solid black","paddingLeft" : "30px","paddingRight" : "30px"}}>
					<NormalInfoDisplayer currentBoxId={this.props.currentBoxId} onClick={this.handleClick}/>
				</div>
			);
		}
		
	}
});
