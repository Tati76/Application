import {getXMLHttpRequest,makeHttpRequest,makeXMLHttpRequest,dateToStringOnlyDays} from '../../Functions/functionFile.js';


CruiseSelectComponent= React.createClass({

	getInitialState(){

		return {
			remove: false ,
			labelsToRemove : [],
			displayArray : [],
			loading: true,
			clearAll : 0,
			shipList : [],
			httpRequestCounter : 0,
			periodeRequestCounter : 0,
			requestResultArray: [],
			language : this.props.language,
			index : this.props.index
		};
	},

	componentDidMount()
	{
		
	},

	componentWillReceiveProps: function(nextProps) {
		this.setState({shipList : nextProps.shipList,language: nextProps.language, index : nextProps.index});
		//console.log("ShipSelectComponent, SHIPLIST ", nextProps.shipList);
		if (nextProps.shipList.length == 0 || nextProps.shipList[0] == "") // cas 1, no years selected, case 2, one year deleted
		{
			this.clearAll();
		}
		if(nextProps.shipList != this.props.shipList) // the shipLists has to be different from one another to enable the process
		{
			//console.log("ShipSelectComponent received props");
			this.searchAllCruiseAndPeriode(nextProps);
		}
	},

	shouldComponentUpdate: function(nextProps, nextState) {
		// if (this.state.shipList != nextState.shipList)
		// {
		// 	return true;
		// }
		if(this.state.language != nextState.language)
		{
			return true;
		}
		if (this.state.displayArray.length >0 || nextState.displayArray.length >0)
		{
			if (this.state.displayArray != nextState.displayArray)
			{
				return true;
			}
			else if (this.state.loading != nextState.loading)
			{
				return true;
			}
			else
			{
				return false;
			}
		}
		else
		{
			return false;
		}
	},

	componentDidUpdate: function(prevProps, prevState){
		// //console.log("CruiseSelectComponent did update, N3");
		// //console.log("allCruise",this.state.allCruise);
		// //console.log("currentDisplayedValues", this.state.currentDisplayedValues);
	},

	searchAllCruiseAndPeriode(prop)
	{
		this.setState({loading : true,
			requestResultArray : [],
			httpRequestCounter : 0,
			periodeRequestCounter : 0
		},function(){

			var urlArray = this.makeAllUrls(prop.shipList);
			this.makeAllHttpRequest(urlArray);
		});
	},

	handleGiveValue(arg)
	{
		this.props.giveValue(arg);
	},

	makeAllUrls(shipList)
	{
		var tempUrlArray = [];
		var tempUrl = "";
		for(var i = 0 ; i<shipList.length ; i++)
		{
			tempUrl = "http://tomcat7.imr.no:8080/DatasetExplorer/v1/count/Forskningsfart%C3%B8y/";
			tempUrl +=  encodeURI(shipList[i].slice(0,4)); // get the year
			tempUrl += "/";
			tempUrl += encodeURI(shipList[i].slice(5,shipList[i].length));
			tempUrlArray.push(tempUrl);
		}

		return tempUrlArray;
	},

	makeAllHttpRequest(urlArray)
	{
		this.setState({requestResultArray : []},function(){

			for (var i = 0 ; i<urlArray.length ; i++)
			{
				var test = urlArray[i].split('/');
				//console.log(test[test.length-1]);
				//console.log(test);
				// makeHttpRequest(urlArray[i],this.readData,[urlArray.length,decodeURI(urlArray[i].split('/')[urlArray[i].split('/').length-1]),decodeURI(urlArray[i].split('/')[urlArray[i].split('/').length-2])]);
				Meteor.call('getJson',urlArray[i],[urlArray.length,decodeURI(urlArray[i].split('/')[urlArray[i].split('/').length-1]),decodeURI(urlArray[i].split('/')[urlArray[i].split('/').length-2])],this.getRawData);
		
			}

		});
		
	},

	getRawData(error,result)
	{
		if (error)
		{
			console.error(error);
		}
		else
		{
			console.log(result[0]);
			console.log(result[1]);
			this.readData(result[0].data,result[1]);
			
		}
	},

	readData(sData,option) //option : [number of URLS, ship Name, Date]
	{
		var tempCounter = this.state.httpRequestCounter + 1;
		this.setState({httpRequestCounter : tempCounter},function(){
			if (this.state.httpRequestCounter == option[0]) // all the requests are made
			{
				var tempObjectArray = this.state.requestResultArray;
				tempObjectArray.push({data: sData,ship:option[1], year : option[2]});
				this.setState({requestResultArray : tempObjectArray, httpRequestCounter: 0},function(){
					this.makePeriodesOfRequestsUrls();
				});
			}
			else // some requests are not finished yet
			{
				var tempObjectArray = this.state.requestResultArray;
				tempObjectArray.push({data: sData,ship:option[1],year : option[2]});
				this.setState({requestResultArray : tempObjectArray});
			}


		});

	},

	makePeriodesOfRequestsUrls() // make all the urls to fetch the periode of all the cruise
	{
		var tempUrl = '';
		var tempPeriodesOfRequestsUrlArray = [];
		for(var i = 0 ; i<this.state.requestResultArray.length ; i++)// for all the cruise selected, go to the cruiseNr
		{
			tempUrl = "http://tomcat7.imr.no:8080/apis/nmdapi/cruise/v1/Forskningsfart%C3%B8y/" + encodeURI(this.state.requestResultArray[i].year) + "/" + encodeURI(this.state.requestResultArray[i].ship) + "/";
			for (var a = 0 ; a<this.state.requestResultArray[i].data.length ; a++) // for all the cruiseNr
			{
				tempPeriodesOfRequestsUrlArray.push({url : tempUrl+encodeURI(this.state.requestResultArray[i].data[a].name), index:[i,a]});
			}
		}
		this.makeAllXMLRequests(tempPeriodesOfRequestsUrlArray);
	},

	makeAllXMLRequests(urlArray) // make the requests for the periode of all the cruise
	{

		for (var i = 0 ; i<urlArray.length ; i++)
		{
			// makeXMLHttpRequest(urlArray[i].url,this.periodeReadData,[urlArray.length,urlArray[i].index]);
			Meteor.call('getXML',urlArray[i].url,[urlArray.length,urlArray[i].index],this.getPeriodeRawData);
		}
	},

	parseXML: function(val)
	{
	    if (window.DOMParser)
	      {
	        parser=new DOMParser();
	        xmlDoc=parser.parseFromString(val,"text/xml");
	      }
	    else // Internet Explorer
	      {
	        xmlDoc = new ActiveXObject("Microsoft.XMLDOM"); xmlDoc.loadXML(val);
	      }
	return xmlDoc ;
	},

	getPeriodeRawData(error,result)
	{
		if (error)
		{
			console.error(error);
		}
		else
		{
			console.log(result[0]);
			console.log(result[1]);
			console.log(this.parseXML(result[0].content));
			this.periodeReadData(this.parseXML(result[0].content),result[1]);
			
		}
	},

	periodeReadData(sData,option) // get the periode and store it
	{
		var tempRequestResultArray = this.state.requestResultArray;
		var tempPeriodeRequestCounter = this.state.periodeRequestCounter + 1;
		this.setState({periodeRequestCounter : tempPeriodeRequestCounter},function() {
			var startTime = new Date(sData.getElementsByTagName("startTime")[0].childNodes[0].nodeValue);
		    var stopTime = new Date(sData.getElementsByTagName("stopTime")[0].childNodes[0].nodeValue);

			if (this.state.periodeRequestCounter == option[0])
			{
				tempRequestResultArray[option[1][0]].data[option[1][1]].periode = dateToStringOnlyDays(startTime) + ' - ' + dateToStringOnlyDays(stopTime);
				this.setState({requestResultArray : tempRequestResultArray},function(){this.makeDisplayArray();});
			}
			else
			{
				tempRequestResultArray[option[1][0]].data[option[1][1]].periode = dateToStringOnlyDays(startTime) + ' - ' + dateToStringOnlyDays(stopTime);
				this.setState({requestResultArray : tempRequestResultArray});
			}

		});
	},

	makeDisplayArray()
	{
		//console.log(this.state.requestResultArray);
		var tempArray = [];
		for (var i = 0 ; i<this.state.requestResultArray.length ; i++)
		{
			tempArray.push({name : this.state.requestResultArray[i].year + " " + this.state.requestResultArray[i].ship, value: this.state.requestResultArray[i].year + " " + this.state.requestResultArray[i].ship, disabled: true, color : "red" });
			for (var a = 0 ; a<this.state.requestResultArray[i].data.length ; a++)
			{
				tempArray.push({name : this.state.requestResultArray[i].data[a].name + " (" + this.state.requestResultArray[i].data[a].periode+")", value : this.state.requestResultArray[i].data[a].name + " (" + this.state.requestResultArray[i].data[a].periode+")"});
			}
		}
		this.setState({
			loading: false,
			displayArray : tempArray.slice(),
			requestResultArray : [],
			periodeRequestCounter : 0, 
			httpRequestCounter: 0
		});
	},

	

	clearAll()
	{
		var tempClAl = this.state.clearAll;
		this.setState({clearAll : tempClAl+1,displayArray : [], loading: true,periodeRequestCounter : 0, httpRequestCounter: 0});
	},

	render(){
			return(
				<div>
					<MultiSelectField language={this.state.language} index={this.state.index} clearAll={this.state.clearAll} incomingData={this.state.displayArray} loading={this.state.loading} giveValue={this.handleGiveValue} valuesRemoved={this.handleRemoveState} doRemove={[this.state.remove,this.state.labelsToRemove]}/>
				</div>		
			);
		
	}
});