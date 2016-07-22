import QRCode from 'qrcode.react';
import {translateWord} from '../Functions/functionFile.js';
import displayInfo from '../languages/Settings.json';
import boxFile from '../Boxes/BoxesInfo.json';

Label = React.createClass({

	getInitialState()
	{
		return{
			language : this.props.language,
			index : this.props.language,
			boxType : this.props.boxType,
			list : this.props.list,
			text : this.props.text,
			qr : this.props.qr
		}
	},

	componentWillReceiveProps: function(nextProps) {
		this.setState({
			language: nextProps.language, 
			index: nextProps.index, 
			list : nextProps.list, 
			boxType: nextProps.boxType,
			text : nextProps.text,
			qr : nextProps.qr
		});
	},

	// To make the component render if a prop or a state changes
	shouldComponentUpdate: function(nextProps, nextState) {
		var shallowCompare = require('react-addons-shallow-compare');
		return shallowCompare(this, nextProps, nextState);
	},

	translate(word)
	{
		if(word != "_id")
		{
			if(word.split(" ")[0] == "Borrowing" || word.split(" ")[0] == "Storage")
			{
				var tempString = "";
				for(var i = 0 ; i<word.split(" ").length ; i++)
				{
					console.log(word.split(" ")[i]);
					console.log(word.split(" ")[i].length);
					console.log("box db data :",this.state.list);
					tempString += translateWord(word.split(" ")[i],this.state.language,this.state.boxType);
					if(i != word.split(" ").length-1)
					{
						tempString += " ";
					}
				}
				return tempString;
			}
			else
			{
				console.log(word);
				return translateWord(word,this.state.language,this.state.boxType);
			}
		}
		else
		{
			return "ID";
		}
	},

	renderlabel(input,index) {
		if (this.props.text[index])
		{
			return(
				<p key={index} className="text-center"> {this.translate(input.one)} : {input.two}</p>
			);
		}
		else
		{
			return null;
		}
		
	},

	render() {
		console.log("rendering");

		var tempQrValue = "";
		console.log(this.state.list[0].one);
		for (var a = 0 ; a<this.state.list.length ; a++)
		{
			if(this.state.qr[a])
			{
				console.log("yes");
				tempQrValue = tempQrValue.concat(this.state.list[a].one);
				tempQrValue = tempQrValue.concat(":");
				tempQrValue = tempQrValue.concat(this.state.list[a].two);
				tempQrValue = tempQrValue.concat(",");
				console.log(tempQrValue);
			}
			
		
		}
		return(
			<div className="container-flux" style={{"paddingTop" : "20px"}}>
				<div className="container-flux">
					{this.props.list.map(this.renderlabel)}
				</div>
				<div className="center-block" style={{"height" :"128px", "width" : "128px"}}>
					<QRCode value={tempQrValue} size={128}/>
				</div>
			</div>
		);
	}


});