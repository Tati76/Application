import {getXMLHttpRequest,makeXMLHttpRequest,dynamicSort} from '../../Functions/functionFile.js';



ShipSelectComponent= React.createClass({

	makeAllUrlList(yearList,shipFiles) // update step 1
	{
		console.log("shipselect step 1");
		var tempUrlList = [];
		var tempUrl = "http://tomcat7.imr.no:8080/DatasetExplorer/v1/count/Forskningsfart%C3%B8y/";
		if(yearList) // if some years are selected
		{
			for (var i = 0 ; i< yearList.length ; i++) // putting all the urls in an array
			{
				tempUrlList.push(tempUrl + yearList[i]);
			}
			// this.setState({urlList : tempUrlList.slice(),shipFiles : []},function(){
			this.makeAllXMLRequests(yearList,tempUrlList,shipFiles);
		}
		else{ // Not going Further because no year selected
			console.log("No Input shipselect");
			this.setState({urlList : null,shipFiles: null,displayArray : null});
		}
		// console.log(this.state.urlList)});
	},

	makeAllXMLRequests(yearList,urlList,shipFiles) // update step 2
	{
		console.log("shipselect step 2");

		for (var i = 0 ; i<yearList.length ; i++)
		{
			if (i== yearList.length -1)
			{
				makeXMLHttpRequest(urlList[i],this.readData,[yearList[i],true,shipFiles,urlList,yearList]);
			}
			else{
				makeXMLHttpRequest(urlList[i],this.readData,[yearList[i],false,shipFiles,urlList,yearList]);
			}
			console.log(i);
		}
		// console.log(this.state.shipFiles);
		
	},

	readData: function(sData,array) {  // update step 3
		console.log("shipselect step 3 : ", array[0] + array[1]);
		//// console.log(JSON.parse(sData));
		var tempShipFiles = this.state.shipFiles.slice();
		var tempCounter = this.state.counter;
		this.setState({counter : tempCounter+1});
		tempShipFiles.push({ year : array[0] , data : JSON.parse(sData)});
		if (this.state.counter == array[4].length) // if it's the last selected year, you can render the displayArray
		{
			// this.setState({shipFiles : tempShipFiles.slice()},function(){
			this.buildDisplayArray(tempShipFiles,array);// console.log(this.state.shipFiles);this.buildDisplayArray(this.state.shipFiles);});
		}
		else{
			this.setState({shipFiles : tempShipFiles.slice()},function(){});// console.log(this.state.shipFiles);});
		}
		// On peut maintenant traiter les données sans encombrer l'objet XHR.
		
	},

	buildDisplayArray: function(objectArray,array) // update step 4
	{
		console.log("shipselect step 4");
		// console.log(objectArray);
		objectArray.sort(dynamicSort("year")).reverse();
		if(objectArray)
		{
			var tempObjectArray = [];
			console.log(objectArray);
			for(var i = 0 ; i<objectArray.length ; i++)
			{
				tempObjectArray.push({name : objectArray[i].year, disabled: true, color : "red"}) // the year has to be seen so it's in red
				for (var a = 0 ; a<objectArray[i].data.length ; a++)
				{
					tempObjectArray.push({name : objectArray[i].data[a].name, value:objectArray[i].year+" "+objectArray[i].data[a].name});
				}
			}
			// console.log("display array !");
			// console.log(tempObjectArray);

			this.setState({yearList: array[4], shipFiles : array[2], urlList : array[3], displayArray : tempObjectArray.slice()});

			console.log('acceder aux données du shipselect : ', );
		}
		this.setState({loading : false, counter : 0});
	},

	getInitialState(){
		var tempObject = [];
		var tempUrl = "http://tomcat7.imr.no:8080/DatasetExplorer/v1/count/Forskningsfart%C3%B8y/";
		var tempUrlList = [];
		// console.log(this.props.yearList);
		if(this.props.yearList)
		{
			for (var i = 0 ; i< this.props.yearList.length ; i++) // putting all the urls in an array
			{
				tempUrlList.push(tempUrl + this.props.yearList[i]);
			}
		}
		// console.log(tempUrlList);
		tempUrl += this.props.year;
		// console.log(tempUrl);

		return {
			yearList : this.props.yearList,
			urlList : tempUrlList.slice(),
			shipFiles : tempObject,
			displayArray : [],
			loading : true,
			counter : 0,
			remove : false,
			labelsToRemove :null,
			currentDisplayedValues : []
		};
	},

	componentDidMount()
	{
		//makeXMLHttpRequest(this.state.url,this.readData);
		// this.makeAllUrlList();
		//this.makeAllXMLRequests();
		
		
		
	},

	// isEqualToYear(yearList,string)
	// {
	// 	var response = false;
	// 	for( var i = 0 ; i<yearList.length ; i++)
	// 	{
	// 		if(yearList[i] == string)
	// 		{
	// 			response = true;
	// 		}
	// 	}
	// 	return response;
	// },

	// findLabelsToRemove(yearList)
	// {
	// 	var listToRemove = [];
	// 	for (var i = 0 ; i<this.state.currentDisplayedValues.length  ; i++)
	// 	{
	// 		if(this.isEqualToYear(yearList,this.state.currentDisplayedValues[i].split(0,4)))
	// 		{
	// 			listToRemove.push(this.state.currentDisplayedValues[i]);
	// 		}
	// 	}

	// 	return listToRemove;
	// },

	componentWillReceiveProps: function(nextProps) {
		console.log("ShipSelectComponent recieved : ", nextProps.yearList);
		// remove the values that are of the wrong year 
		// this.setState({labelsToRemove : this.findLabelsToRemove(nextProps.yearList),remove : true});
			this.setState({
				yearList : nextProps.yearList,
				loading : true,
				}, function(){
				this.makeAllUrlList(nextProps.yearList,this.state.shipFiles);
			});
		


		//makeXMLHttpRequest(tempUrl,this.readData);
		//the shipFile will change when the component did mount

	},

	shouldComponentUpdate: function(nextProps, nextState) {
		var shallowCompare = require('react-addons-shallow-compare');
		return shallowCompare(this, nextProps, nextState);
	},

	componentDidUpdate: function(prevProps, prevState){ 
		 console.log("ShipSelectComponent yearList",this.state.yearList);
		 console.log("ShipSelectComponent displayArray",this.state.displayArray);
	},

	renderShip(input, index)
	{
		if (this.state.yearList)
		{
			return(
				<option> {this.state.shipFile[input].name} </option>
			);
		}
		else
		{
			return null ;
		}
		
	},

	handleValue(value)
	{	
		console.log("shipselect Sending value to form:", value);
		var tempvalue = null;
		console.log(value.split(","));
		this.setState({currentDisplayedValues : value.split(",")});

		// console.log("GOOOD");
		// console.log(value.split(","));
		this.props.giveValue(value);
	},

	handleRemoveState(arg)
	{
		if(arg)
		{
			this.setState({remove : false});
		}
	},

	render(){
		// console.log('render ShipSelectComponent');
		

			return(
				<div className='container-fluid'>
					<MultiSelectField incomingData={this.state.displayArray} loading={this.state.loading} giveValue={this.handleValue} valuesRemoved={this.handleRemoveState}/> 
				</div>		
			);

		
	}
});

//doRemove={[this.state.remove,this.state.labelsToRemove]}