import { InholdInfoDb } from '../../../imports/api/inholdinfodb.js';
InfoDisplayer = React.createClass({

	getInitialState()
	{
		return{
			editCurrentBox : false,
			lendCurrentBox : false,
			storeCurrentBox : false,
			language : this.props.language,
			index : this.props.index,
			boxObject : this.props.boxObject,
			currentBoxId : this.props.currentBoxId
		};
	},

	componentWillReceiveProps: function(nextProps) {
		this.setState({language: nextProps.language, index: nextProps.index, boxObject: nextProps.boxObject, currentBoxId: nextProps.currentBoxId});
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
		else if (event.target.value == "Back")
		{
			this.handleBack(event);
		}
		else if (event.target.value == "Store")
		{
			this.handleStore(event);
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
		this.setState({editCurrentBox : tempEditState,storeCurrentBox : false,lendCurrentBox : false});
		console.log("click on Edit or save");
		
	},

	handleStore: function(event)
	{
		console.log("click Store");
		console.log(this.state.boxObject["Box Type"]);
		var tempStoreState = !this.state.storeCurrentBox;
		this.setState({storeCurrentBox : tempStoreState,lendCurrentBox : false, editCurrentBox: false});
	},

	handleBack: function(event)
	{
		this.setState({lendCurrentBox : false, editCurrentBox: false, storeCurrentBox : false});
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
				<div className="container-fluid" style={{"overflow":"hidden","paddingLeft" : "30px","paddingRight" : "30px"}}>
					<EditableInfoDisplayer language={this.state.language} index={this.state.index} currentBoxId={this.state.currentBoxId} boxType={this.state.boxObject["Box Type"]} onClick={this.handleClick}/>
				</div>
			);
		}
		else if(this.state.lendCurrentBox)
		{
			return( // has to implement the save disable
				<div className="container-fluid" style={{"overflow":"hidden","paddingLeft" : "30px","paddingRight" : "30px"}}>
					<BorrowingForm language={this.state.language} index={this.state.index} boxObject={this.state.boxObject} submit={false} onClick={this.handleClick}/>
				</div>
			);
		}
		else if (this.state.storeCurrentBox)
		{
			return(
				<div className="container-fluid" style={{"overflow":"hidden"}}>
					<Storage language={this.state.language} index={this.state.index} boxId={this.state.currentBoxId} boxType={this.state.boxObject["Box Type"]} onClick={this.handleClick} />
				</div>
			);
		}
		else
		{
			return(
				<div className="container-fluid" style={{"overflow":"hidden","paddingLeft" : "30px","paddingRight" : "30px"}}>
					<NormalInfoDisplayer language={this.state.language} 
										index={this.state.index} 
										currentBoxId={this.state.currentBoxId} 
										onClick={this.handleClick}/>
				</div>
			);
		}
		
	}
});

// <div className="container-fluid" style={{"border":"1px solid black","paddingLeft" : "30px","paddingRight" : "30px"}}>
// 				<EditableInfoDisplayer language={this.state.language} index={this.state.index} currentBoxId={this.state.currentBoxId} onClick={this.handleClick}/>
// 				<button type="button" className="btn btn-primary center-block" disabled>Lend this box (Not dynamic)</button>
// 			</div>