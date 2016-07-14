// <SelectBoxTypeComponent language={this.props.language} index={this.props.index}  />


import boxFile from '../Boxes/BoxesInfo.json';
import displayFile from '../languages/Settings.json';


SelectBoxTypeComponent = React.createClass({
	
	findBoxTypes: function(language)
	{
		var tempBoxTypeList = [];
		for(var i = 0 ; i<boxFile.length ; i++)
		{
			tempBoxTypeList.push(boxFile[i].name[language]);
		}

		return tempBoxTypeList;
	},

	getInitialState(){

		return {
			boxTypeList : this.findBoxTypes(this.props.language),
			language : this.props.language,
			index : this.props.index
		};
	},

	componentWillReceiveProps: function(nextProps) {
		this.setState({boxTypeList : this.findBoxTypes(nextProps.language),
			language : nextProps.language,
			index : nextProps.index
		});
	},

	shouldComponentUpdate: function(nextProps, nextState) {
		var shallowCompare = require('react-addons-shallow-compare');
		return shallowCompare(this, nextProps, nextState);
	},

	componentDidUpdate: function(prevProps, prevState){ 

	},

	render(){
		console.log(this.state.language);
		return(
			<div className="container-fluid">
				<SelectComponent info={this.state.boxTypeList} language={this.state.language} index={this.state.index} onClick={this.props.onClick}/>
			</div>
		);
	}
});