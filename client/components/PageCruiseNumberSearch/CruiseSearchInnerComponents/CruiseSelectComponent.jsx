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
			loading: true
		};
	},

	componentDidMount()
	{
		
	},

	componentWillReceiveProps: function(nextProps) {
		
	},

	shouldComponentUpdate: function(nextProps, nextState) {
		
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
		
	},

	handleRemoveState(arg)
	{
		
	},

	render(){
			return(
				<div>
					<MultiSelectField incomingData={this.state.displayArray} loading={this.state.loading} giveValue={this.handleGiveValue} valuesRemoved={this.handleRemoveState} doRemove={[this.state.remove,this.state.labelsToRemove]}/>
				</div>		
			);
		
	}
});