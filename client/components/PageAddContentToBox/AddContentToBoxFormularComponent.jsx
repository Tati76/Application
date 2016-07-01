import { InholdInfoDb } from '../../../imports/api/inholdinfodb.js';
import boxFile from '../Boxes/BoxesInfo.json';
import settingsFile from '../languages/Settings.json';

AddContentToBoxFormular = React.createClass({
	
	findTheInputArray : function(boxName)
	{
		for (var i =0 ; i< settingsFile.setups[1].pageInholdInfo.forms.length ; i++)
		{
			if(settingsFile.setups[1].pageInholdInfo.forms[i].name == boxName)
			{
				var result = settingsFile.setups[1].pageInholdInfo.forms[i].inputs.slice();
			}
		}

		return result;
	},

	getInitialState(){

		var tempBoxTypeAttributes = this.findTheInputArray(this.props.boxTypeToAdd).slice();

		return {
			selectedBoxTypeAttributes :tempBoxTypeAttributes.slice()
		};
	},

	componentWillReceiveProps: function(nextProps) {
		
		this.setState({selectedBoxTypeAttributes : this.findTheInputArray(nextProps.boxTypeToAdd).slice()});
	},

	shouldComponentUpdate: function(nextProps, nextState) {
		var shallowCompare = require('react-addons-shallow-compare');
		return shallowCompare(this, nextProps, nextState);
	},

	componentDidUpdate: function(prevProps, prevState){ 

	},

	renderForm(input,index){
		return(
			<div key={index} className="form-group form-group-sm">
			    <label for="inputEmail3" className="col-sm-2 control-label">{input}</label>
			    <div className="col-sm-10">
			      	<input type="email" className="form-control" id="inputEmail3"/>
			    </div>
			</div>
		);
	},

	render(){
		return(
			<div className="container-flux" style={{"border":"1px solid black","paddingLeft" : "30px","paddingRight" : "30px"}}>
				<h2 className="text-center"> Form (Not dynamic)</h2>
				<form className="form-horizontal">
					{this.state.selectedBoxTypeAttributes.map(this.renderForm)}
				</form>
				<button type="button" className="btn btn-primary">Save (Not dynamic)</button>
			</div>
		);
	}
});