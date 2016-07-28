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
			requestsResponses: []
		};
	},

	componentDidMount()
	{
		
	},


	componentWillReceiveProps: function(nextProps) {
		this.setState({yearList : nextProps.yearList});
		if (nextProps.yearList.length == 0 || nextProps.yearList[0] == "") // cas 1, no years selected, case 2, one year deleted
		{
			this.clearAll();
		}
		else 
		{
			console.log("ShipSelectComponent received props");
			this.createDisplayArray(nextProps);
		}

	},

	shouldComponentUpdate: function(nextProps, nextState) {
		// var shallowCompare = require('react-addons-shallow-compare');
		// return shallowCompare(this, nextProps, nextState);

		if (this.state.yearList != nextState.yearList)
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
		for (var i=0 ; i<urlList.length ;i++)
		{
			makeHttpRequest(urlList[i],this.readData,[urlList.length,urlList[i].slice(urlList[i].length-4,urlList[i].length)]);
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
				tempObject["data"] = JSON.parse(sData);
				var tempArray = this.state.requestsResponses;
				tempArray.push(tempObject);
				this.setState({requestsResponses :tempArray});
			}
			else// there are other requests to come
			{
				// setState all the values
				var tempObject = {};
				tempObject["year"] = option[1];
				tempObject["data"] = JSON.parse(sData);
				var tempArray = this.state.requestsResponses;
				tempArray.push(tempObject);
				this.setState({requestsResponses :tempArray});
			}


		});
	},

	createDisplayArray(prop)
	{
		// Check for the unwanted options
		var urlList = this.findAllUrls(prop.yearList);
		this.makeAllHttpRequests(urlList);
		// create a function to transform this.state.requestsResponses into an array of objects 
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
		var tempArray = [];
		for (var i = 0 ; i<prop.yearList.length ; i++)
		{
			tempArray.push({name : prop.yearList[i], value : prop.yearList[i],random : 'ShipSelectComponent'});
		}
		this.setState({loading: false,displayArray : tempArray.slice()});
	},

	clearAll()
	{
		var tempClAl = this.state.clearAll;
		this.setState({clearAll : tempClAl+1,displayArray : [], loading: true});
	},

	render()
	{
			return(
				<div>
					<MultiSelectField clearAll={this.state.clearAll} incomingData={this.state.displayArray} loading={this.state.loading} giveValue={this.handleValue} valuesRemoved={this.handleRemoveState} doRemove={[this.state.remove,this.state.labelsToRemove]}/> 
				</div>		
			);
	}
});