import {getXMLHttpRequest,makeXMLHttpRequest} from '../../Functions/functionFile.js';


CruiseSelectComponent= React.createClass({

	makeAllUrls(prop) // step 1
	{
		var tempUrl = "http://tomcat7.imr.no:8080/DatasetExplorer/v1/count/Forskningsfart%C3%B8y/";
		
		if (prop.shipList)
		{
			var tempUrlArray = [];
			// console.log"prop.shipList");
			// console.logprop.shipList);
			for(var i = 0 ; i<prop.shipList.length ; i++)
			{
				tempUrl = "http://tomcat7.imr.no:8080/DatasetExplorer/v1/count/Forskningsfart%C3%B8y/";
				tempUrl += encodeURI(prop.shipList[i].year);
				tempUrl += "/";
				tempUrl += encodeURI(prop.shipList[i].ship);
				tempUrlArray.push(tempUrl);
			}
			// console.log'tempUrlArray');
			// console.logtempUrlArray);
			this.setState({urlArray : tempUrlArray.slice()},function(){this.makeAllXMLHttpRequests();});//// console.logthis.state.urlArray); 
			// makeXMLHttpRequest(tempUrlArray[0],this.readData)
		}
	},

	makeAllXMLHttpRequests() //step 2
	{	
		// console.log"CruiseSelectComponent, makeAllXMLHttpRequests");
		// console.logthis.state.urlArray);
		for (var i = 0 ; i< this.state.urlArray.length ; i++)
		{
			// console.logthis.state.urlArray[i]);
			// console.logthis.state.shipList[i].ship);
			if (i == this.state.urlArray.length -1 )
			{
				makeXMLHttpRequest(this.state.urlArray[i],this.readData,[String(this.state.shipList[i].year) + " " + this.state.shipList[i].ship,true]);
			}
			else {
				makeXMLHttpRequest(this.state.urlArray[i],this.readData,[String(this.state.shipList[i].year) + " " + this.state.shipList[i].ship,false]);
			}
			
		}
	},

	readData: function(sData,option) {//step 3
		
		// var tempNameArray = [];
		// // console.logoption);
		// for (var i = 0 ; i<JSON.parse(sData).length ; i++)
		// {
		// 	tempNameArray.push({name : JSON.parse(sData)[i].name});
		// }
		// console.logoption);
		// console.logthis.state.allCruise);
		var tempAllCruise = this.state.allCruise;
		// console.logtempAllCruise);
		tempAllCruise.push({data : JSON.parse(sData), value : option[0]});
		// console.log"READ DATA CRUISE");
		// console.logJSON.parse(sData));
		// console.logoption[1]);
		if (option[1])
		{
			this.setState({allCruise : tempAllCruise.slice()},function(){this.createDisplayArray();});//console.log(this.state.allCruise);
		}
		else{
			this.setState({allCruise : tempAllCruise.slice()},function(){});//console.log(this.state.allCruise);});
		}
		// console.log("readData finished");

		// this.setState({cruiseFile : JSON.parse(sData), nameArray : tempNameArray.slice()});
		// On peut maintenant traiter les données sans encombrer l'objet XHR.
		// return JSON.parse(sData);
		
	},

	createDisplayArray() //step 4
	{
		// console.log"shipList");
		// console.logthis.state.shipList);
		var tempCruiseArray = [];
		for(var i = 0 ; i< this.state.shipList.length ; i++) // get all the ships selected
		{	
			tempCruiseArray.push({value : this.state.allCruise[i].value, name : this.state.allCruise[i].value , disabled: true,color : "red"}); // add the boat & the year
			for (var a = 0 ; a<this.state.allCruise[i].data.length ; a++) // going through all the cruise nr
			{
				tempCruiseArray.push({value : this.state.allCruise[i].data[a].name, name : this.state.allCruise[i].data[a].name});
			}
		}

		// console.logtempCruiseArray);
		this.setState({allCruise : tempCruiseArray.slice()});
	},

	getInitialState(){

		return {
			allCruise : [],
			yearList : [],
			shipList : []
		};
	},

	componentDidMount()
	{
		// makeXMLHttpRequest(this.state.url,this.readData);
		// this.makeAllUrls(this.props);
		
	},

	componentWillReceiveProps: function(nextProps) {
		// console.log"new PROPSPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP");
		// console.lognextProps.shipList);
		console.log(nextProps.shipList);
		if(nextProps.shipList)
		{
			this.setState({shipList : nextProps.shipList.slice(),yearList : nextProps.yearList.slice()});
			this.setState({allCruise : []},function(){this.makeAllUrls(nextProps);});
		}

		// this.setState({
		// 	year : nextProps.year,
		// 	url : tempUrl,
		// 	ship : nextProps.ship
		// });
		// makeXMLHttpRequest(tempUrl,this.readData,"hello");
		//the cruiseFile will change when the component did mount

	},

	shouldComponentUpdate: function(nextProps, nextState) {
		var shallowCompare = require('react-addons-shallow-compare');
		return shallowCompare(this, nextProps, nextState);
	},

	componentDidUpdate: function(prevProps, prevState){ 
		// console.log"old props");
		// console.logthis.state.allCruise);
		// console.logthis.state.shipList);
	},

	handleGiveValue(arg)
	{
		this.props.giveValue(arg);
	},



	render(){
		// // console.log'render ShipSelectComponent');
		// // console.log"this.state.cruiseFile");
		// // console.logthis.state.cruiseFile);
		
			return(
				<div className='container-fluid'>
					<MultiSelectField incomingData={this.state.allCruise} giveValue={this.handleGiveValue}/>
				</div>		
			);
		
	}
});