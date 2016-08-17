import {getXMLHttpRequest,makeHttpRequest,dynamicSort} from '../../Functions/functionFile.js';



ShipSelectComponent= React.createClass({

	getInitialState(){
		return {
			yearList : this.props.yearList,
			clearAll : 0,
			labelsToRemove : [],
			displayArray : [],
			loading: true,
			urlReceivedRequestsCounter : 0,
			requestsResponses: [],
			language : this.props.language,
			index : this.props.index
		};
	},

	componentDidMount()
	{
		
	},


	componentWillReceiveProps: function(nextProps) {
		this.setState({language: nextProps.language, index : nextProps.index});
		if (this.props.yearList != nextProps.yearList)
		{
			this.setState({yearList : nextProps.yearList});
			if (nextProps.yearList.length == 0 || nextProps.yearList[0] == "") // cas 1, no years selected, case 2, one year deleted
			{
				this.clearAll();
			}
			else 
			{
				//console.log("ShipSelectComponent received props");
				this.setState({loading : true});
				this.createDisplayArray(nextProps);
			}
		}
	},

	shouldComponentUpdate: function(nextProps, nextState) {
		// var shallowCompare = require('react-addons-shallow-compare');
		// return shallowCompare(this, nextProps, nextState);
		if(this.state.language != nextState.language)
		{
			return true;
		}
		if (this.state.yearList != nextState.yearList || this.state.displayArray != nextState.displayArray)
		{
			return true;
		}
		else
		{
			return false;
		}

	},

	componentDidUpdate: function(prevProps, prevState){ 

	},

	handleValue(value)
	{
		this.props.giveValue(value);
	},

	findAllUrls(yearList)// step 1
	{
		var tempUrlArray = [];
		var tempPreUrl = "http://tomcat7.imr.no:8080/DatasetExplorer/v1/count/Forskningsfart%C3%B8y/";
		for (var i = 0 ; i<yearList.length ; i++)
		{
			tempUrlArray.push(tempPreUrl+encodeURI(yearList[i]));
		}
		return tempUrlArray;
	},

	makeAllHttpRequests(urlList)// step 2
	{
		//console.log("urlList",urlList);
		for (var i=0 ; i<urlList.length ;i++)
		{
			// makeHttpRequest(urlList[i],this.readData,[urlList.length,urlList[i].slice(urlList[i].length-4,urlList[i].length)]);
			Meteor.call('getJson',urlList[i],[urlList.length,urlList[i].slice(urlList[i].length-4,urlList[i].length)],this.getRawData);
		
		}

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

	readData: function(sData,option) //step 3
	{  
		var tempCount = this.state.urlReceivedRequestsCounter + 1;
		this.setState({urlReceivedRequestsCounter : tempCount},function(){
			if (this.state.urlReceivedRequestsCounter == option[0]) // all the requests are made
			{
				//set State all the values
				var tempObject = {};
				tempObject["year"] = option[1];
				tempObject["data"] = sData;
				var tempArray = this.state.requestsResponses;
				tempArray.push(tempObject);
				var tempDispArr = this.makeTheDisplayArrayFromRequestsResponses(tempArray).slice();
				this.setState({urlReceivedRequestsCounter: 0,loading: false,displayArray : tempDispArr,requestsResponses : []});
			}
			else// there are other requests to come
			{
				// setState all the values
				var tempObject = {};
				tempObject["year"] = option[1];
				tempObject["data"] = sData;
				var tempArray = this.state.requestsResponses;
				tempArray.push(tempObject);
				this.setState({requestsResponses :tempArray});
			}


		});
	},

	makeTheDisplayArrayFromRequestsResponses(requestsResponses)
	{
		var tempRespArray = [];
		for (var i = 0 ; i< requestsResponses.length ; i++)
		{
			tempRespArray.push({name : requestsResponses[i].year, value : requestsResponses[i].year, disabled: true, color : "red"});
			for (var a = 0 ; a<requestsResponses[i].data.length ; a++)
			{
				tempRespArray.push({name:'('+requestsResponses[i].year+') '+requestsResponses[i].data[a].name , value : requestsResponses[i].year+' '+requestsResponses[i].data[a].name});
			}
		}
		return tempRespArray;
	},

	createDisplayArray(prop)
	{
		// Check for the unwanted options
		var urlList = this.findAllUrls(prop.yearList);
		this.makeAllHttpRequests(urlList);
		// in makeAllHttpRequests, there is a function to transform this.state.requestsResponses into an array of objects 
		//     -----------------------
		//     - YEAR1               - value : year, name: year
		//     -     Ship1           - name: year + " " + value, value: year + " " + value
		//     -     Ship2           - name: year + " " + value, value: year + " " + value
		//     -     Ship3           - name: year + " " + value, value: year + " " + value
		//     -     Ship4           - name: year + " " + value, value: year + " " + value
		//     -     Ship5           - name: year + " " + value, value: year + " " + value
		//     -     Ship6           - name: year + " " + value, value: year + " " + value
		//     - YEAR2               - value : year, name: year
		//     -     Ship1           - name: year + " " + value, value: year + " " + value
		//     -     Ship2           - name: year + " " + value, value: year + " " + value
		//     -     Ship3           - name: year + " " + value, value: year + " " + value
		//     -     Ship4           - name: year + " " + value, value: year + " " + value
		//     -----------------------
		// then set This array to this.setState({displayArray: the array from above})
		// var tempArray = [];
		// for (var i = 0 ; i<prop.yearList.length ; i++)
		// {
		// 	tempArray.push({name : prop.yearList[i], value : prop.yearList[i]});
		// }
		// this.setState({loading: false,displayArray : tempArray.slice(),requestsResponses : []});
	},

	clearAll()
	{
		var tempClAl = this.state.clearAll;
		this.setState({clearAll : tempClAl+1,displayArray : [], loading: true, urlReceivedRequestsCounter: 0,requestsResponses : []});
	},

	render()
	{
			return(
				<div>
					<MultiSelectField language={this.state.language} index={this.state.index} clearAll={this.state.clearAll} incomingData={this.state.displayArray} loading={this.state.loading} giveValue={this.handleValue} valuesRemoved={this.handleRemoveState} doRemove={[this.state.remove,this.state.labelsToRemove]}/> 
				</div>		
			);
	}
});