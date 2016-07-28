import {getXMLHttpRequest,makeHttpRequest,makeXMLHttpRequest,dateToStringOnlyDays} from '../../Functions/functionFile.js';


CruiseSelectComponent= React.createClass({

	makeAllUrls(prop) // step 1
	{
		
	},

	makeAllHttpRequests() //step 2
	{	
		
	},

	readData: function(sData,option) {//step 3
		
	},

	getAllDates()
	{

	},

	readXMLPeriodeData(sData,infos) // info with cruise index and cruiseNr in data index
	{
		
	},

	createDisplayArray() //step 4
	{
		
	},

	getInitialState(){

		return {
			remove: false ,
			labelsToRemove : [],
			displayArray : [],
			loading: true,
			clearAll : 0,
			shipList : []
		};
	},

	componentDidMount()
	{
		
	},

	componentWillReceiveProps: function(nextProps) {
		this.setState({shipList : nextProps.shipList});
		console.log("ShipSelectComponent, SHIPLIST ", nextProps.shipList);
		if (nextProps.shipList.length == 0 || nextProps.shipList[0] == "") // cas 1, no years selected, case 2, one year deleted
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
		if (this.state.shipList !== nextState.shipList)
		{
			return true;
		}
		else
		{
			return false;
		}
		return false;
	},

	componentDidUpdate: function(prevProps, prevState){
		// console.log("CruiseSelectComponent did update, N3");
		// console.log("allCruise",this.state.allCruise);
		// console.log("currentDisplayedValues", this.state.currentDisplayedValues);
	},

	findCruise(cruiseNr,allCruise)
	{
		
	},

	handleGiveValue(arg)
	{
		this.props.giveValue(arg);
	},

	handleRemoveState(arg)
	{
		
	},

	createDisplayArray(prop)
	{
		// Check for the unwanted options


		var tempArray = [];
		for (var i = 0 ; i<prop.shipList.length ; i++)
		{
			tempArray.push({name : prop.shipList[i], value : prop.shipList[i], random: 'CruiseSelectComponent'});
		}
		this.setState({loading: false,displayArray : tempArray.slice()});
	},

	clearAll()
	{
		var tempClAl = this.state.clearAll;
		this.setState({clearAll : tempClAl+1,displayArray : [], loading: true});
	},

	render(){
			return(
				<div>
					<MultiSelectField clearAll={this.state.clearAll} incomingData={this.state.displayArray} loading={this.state.loading} giveValue={this.handleGiveValue} valuesRemoved={this.handleRemoveState} doRemove={[this.state.remove,this.state.labelsToRemove]}/>
				</div>		
			);
		
	}
});