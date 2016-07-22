import {translateWord} from '../Functions/functionFile.js';
import displayInfo from '../languages/Settings.json';
import boxFile from '../Boxes/BoxesInfo.json';

InfoSelector = React.createClass({

	getInitialState() {
		var tempArray = [];
		var tempBoxType = "";
		for (var i = 0 ; i< this.props.dataIn.length ; i++)
		{
			tempArray.push(false);
			if(this.props.dataIn[i].one == "Box Type")
			{
				tempBoxType = this.props.dataIn[i].two;
			}
		}

		return{
			language : this.props.language,
			index : this.props.index,
			list:this.props.dataIn,
			boxType : tempBoxType,
			qr : tempArray,
			text : tempArray,
			selectAllText: false,
			selectAllQr:false
		}
	},

	componentWillReceiveProps: function(nextProps) {
		var tempBoxType = "";
		for (var i = 0 ; i< nextProps.dataIn.length ; i++)
		{
			if(nextProps.dataIn[i].one == "Box Type")
			{
				tempBoxType = nextProps.dataIn[i].two;
			}
		}
		this.setState({language: nextProps.language, index: nextProps.index, list : nextProps.dataIn, boxType: tempBoxType});
	},

	// To make the component render if a prop or a state changes
	shouldComponentUpdate: function(nextProps, nextState) {
		var shallowCompare = require('react-addons-shallow-compare');
		console.log("shallowCompare : " + shallowCompare(this, nextProps, nextState));
		console.log("this.state : " + this.state.text);
		console.log("nextState : " + nextState);
		console.log(nextState.text != this.state.text);
		return shallowCompare(this, nextProps, nextState);
	},

	handleClickQr(index,input) {
		var tempQr = [];
		tempQr = this.state.qr;
		tempQr[index] = !tempQr[index];
		this.setState({qr : tempQr.slice()},function(){console.log(this.state.qr);});
		delete tempQr;
	},

	handleClickText(index,input) {
		var tempText = [];
		tempText = this.state.text;
		tempText[index] = !tempText[index];
		this.setState({text : tempText.slice()},function(){console.log(this.state.text);});
		delete tempText;
	},

	handleClickSelectAllText(event) {
		console.log(event.target.checked);
		var tempSelectAllTextList = [];
		for (var i = 0; i< this.state.text.length ; i++)
		{
			tempSelectAllTextList.push(event.target.checked);
		}
		this.setState({text : tempSelectAllTextList});
	},

	handleClickSelectAllQr(event) {
		console.log(event.target.checked);
		var tempSelectAllQrList = [];
		for (var i = 0; i< this.state.qr.length ; i++)
		{
			tempSelectAllQrList.push(event.target.checked);
		}
		this.setState({qr : tempSelectAllQrList});
	},

	handlePrint(){
		window.print();
		var tempArray = [];
		tempArray = FlowRouter.current().path.split("/");
		tempArray.pop();
		var tempPathString = "";
		for (var i = 1 ; i< tempArray.length ; i++)
		{
			tempPathString += "/";
			tempPathString += tempArray[i];
		}
		console.log(tempPathString);

		FlowRouter.go(tempPathString);
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

	renderTableComponents(input,index){
		
		return(
			<tr key={"tr"+index}>
			    <td className="text-center"><input ref="checkQr" onClick={this.handleClickQr.bind(this,index,input)} type="checkbox" value='' checked={this.state.qr[index]}/></td>
			    <td className="text-center"><input class="checkText" onClick={this.handleClickText.bind(this,index,input)} type="checkbox" value=''checked={this.state.text[index]}/></td>
			    <td key={index} className="text-center">{this.translate(input.one)}</td>
			    <td key={"R"+index} className="text-center">{input.two}</td>
			</tr>
		);

	},

	handleReturn()
	{
		var tempCurrentRouteArray = FlowRouter.current().path.split("/");
		tempCurrentRouteArray.pop();
		var tempPathString = "";
		for(var i = 1 ; i<tempCurrentRouteArray.length ; i++)
		{
			tempPathString+= "/";
			tempPathString += tempCurrentRouteArray[i];
		}
		FlowRouter.go(tempPathString);
	},

	render() {
		console.log("rendering InfoSelector");
		return(
			<div className="container">
				<div className="row">
					<div className="col-sm-4 hidden-print">
						<form>
							<h2>{displayInfo.setups[this.state.index].QRPage.title}</h2>
							<table className="table table-bordered">
								<thead>
									<tr>
									    <th className="text-center">Qr
									    	<div><input onClick={this.handleClickSelectAllQr} id="checkallQr" type="checkbox" value=''/></div></th>
									    <th className="text-center">Text 
									    	<div><input onClick={this.handleClickSelectAllText} id="checkallText" type="checkbox" value=''/></div></th>
									    <th  className="text-center">Action</th>
									    <th  className="text-center">Reponse</th>
									</tr>
								</thead>
								<tbody>
								    {this.state.list.map(this.renderTableComponents)}
								</tbody>
							</table>
						</form>
					</div>
					<div className="col-sm-4 hidden-print" ></div>
					<div className="col-sm-4" style={{'border' : '1px black solid','paddingBottom' : '20px','maxWidth':'80mm'}}>
						<Label list={this.state.list} text={this.state.text} qr={this.state.qr} language={this.state.language} index={this.state.index} boxType={this.state.boxType}/>
					</div>
				</div>
				<div className="row">
					<div className="btn-group btn-group-justified" role="group" aria-label="...">
						<div className="btn-group" role="group">
							<button type="button" id="but" className="btn btn-primary hidden-print center-block" onClick={this.handlePrint}>{displayInfo.setups[this.state.index].QRPage.buttons.print}</button>
						</div>
						<div className="btn-group" role="group">
							<button type="button" id="but" className="btn btn-primary hidden-print center-block" onClick={this.handleReturn}>{displayInfo.setups[this.state.index].QRPage.buttons.return}</button>
						</div>
					</div>
				</div>
			</div>
			)
	}

});