import QRCode from 'qrcode.react';

Label = React.createClass({

	renderlabel(input,index) {
		if (this.props.text[index])
		{
			return(
				<p key={index} className="text-center"> {input.one} : {input.two}</p>
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
		console.log(this.props.list[0].one);
		for (var a = 0 ; a<this.props.list.length ; a++)
		{
			if(this.props.qr[a])
			{
				console.log("yes");
				tempQrValue = tempQrValue.concat(this.props.list[a].one);
				tempQrValue = tempQrValue.concat(":");
				tempQrValue = tempQrValue.concat(this.props.list[a].two);
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