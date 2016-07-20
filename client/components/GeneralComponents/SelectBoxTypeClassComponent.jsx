// <SelectBoxTypeClassComponent language={this.props.language} index={this.props.index}  containerBox={}/>


import boxFile from '../Boxes/BoxesInfo.json';
import displayFile from '../languages/Settings.json';


SelectBoxTypeClassComponent = React.createClass({

	findBoxClass: function(language,currentBoxType)
	{
		var resp = -1;
		for(var a = 0 ; a<boxFile.length ; a++)
		{
			console.log(boxFile[a].name[language]);
			console.log(currentBoxType);
			if(boxFile[a].name["English"] == currentBoxType)
			{
				resp = boxFile[a].containerClass;
				break;
			}
		}
		return resp;
	},
	
	findBoxTypes: function(language,currentBoxType)
	{
		var tempBoxTypeList = [];
		var test ;
		var testt ;
		for(var i = 0 ; i<boxFile.length ; i++)
		{
			test = this.findBoxClass(language,currentBoxType);
			testt = boxFile[i].containerClass;
			if(this.findBoxClass(language,currentBoxType) < boxFile[i].containerClass)
			{
				tempBoxTypeList.push(boxFile[i].name[language]);
			}
		}

		return tempBoxTypeList;
	},

	getInitialState(){

		return {
			boxObject : this.props.containerBox,
			boxTypeList : this.findBoxTypes(this.props.language,this.props.containerBox["Box Type"]),
			language : this.props.language,
			index : this.props.index,
			boxType : this.props.containerBox["Box Type"]
		};
	},

	componentWillReceiveProps: function(nextProps) {
		this.setState({boxObject : nextProps.containerBox,
			boxTypeList : this.findBoxTypes(nextProps.language, nextProps.containerBox["Box Type"]),
			language : nextProps.language,
			index : nextProps.index,
			boxType : nextProps.containerBox["Box Type"]
		});
	},

	shouldComponentUpdate: function(nextProps, nextState) {
		var shallowCompare = require('react-addons-shallow-compare');
		return shallowCompare(this, nextProps, nextState);
	},

	componentDidUpdate: function(prevProps, prevState){ 

	},

	handleClick(event)
	{
		console.log(event); 
		this.props.onClick(event);
	},

	render(){
		console.log(this.state.language);
		return(
			<div className="container-fluid">
				<SelectComponent info={this.state.boxTypeList} language={this.state.language} index={this.state.index} onClick={this.handleClick}/>
			</div>
		);
	}
});