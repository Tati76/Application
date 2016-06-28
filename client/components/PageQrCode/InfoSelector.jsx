InfoSelector = React.createClass({

	getInitialState() {
		var tempArray = [];
		for (var i = 0 ; i< this.props.dataIn.length ; i++)
		{
			tempArray.push(false);
		}

		return{
			list:this.props.dataIn,
			qr : tempArray,
			text : tempArray,
			selectAllText: false,
			selectAllQr:false
		}
	},

	componentWillReceiveProps: function(nextProps) {},

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
	},

	renderTableComponents(input,index){
		
		return(
		<tr key={"tr"+index}>
		    <td className="text-center"><input ref="checkQr" onClick={this.handleClickQr.bind(this,index,input)} type="checkbox" value='' checked={this.state.qr[index]}/></td>
		    <td className="text-center"><input class="checkText" onClick={this.handleClickText.bind(this,index,input)} type="checkbox" value=''checked={this.state.text[index]}/></td>
		    <td key={index} className="text-center">{input.one}</td>
		    <td key={"R"+index} className="text-center">{input.two}</td>
		</tr>
		)
	},

	render() {
		console.log("rendering InfoSelector");
		return(
			<div className="container">
				<div className="row">
					<div className="col-sm-4 hidden-print">
						<form>
							<h2>Printable Info</h2>
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
						<Label list={this.state.list} text={this.state.text} qr={this.state.qr}/>
					</div>
				</div>
				<div className="row">
					<button type="button" id="but" className="btn btn-default hidden-print center-block" onClick={this.handlePrint}>Print</button>
				</div>
			</div>
			)
	}

});