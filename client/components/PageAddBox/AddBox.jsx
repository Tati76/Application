//<AddBox language   index
import boxFile from '../Boxes/BoxesInfo.json';
import displayFile from '../languages/Settings.json';


AddBox= React.createClass({

	findBoxObject(boxName,prop)
	{
		var tempFormArray = [];
		var tempObligedArray = [];
		for (var i = 0 ; i<boxFile.length ; i++)
		{
			console.log(prop.language);
			if (boxFile[i].name[prop.language] == boxName)
			{
				tempFormArray = boxFile[i].forms.content[prop.language].slice();
				tempObligedArray = boxFile[i].forms.content.obliged.slice();
			}
		}

		var toReturn = [];
		toReturn.push(tempFormArray);
		toReturn.push(tempObligedArray);

		return toReturn;
	},
	
	getInitialState(){

		return {
			language:this.props.language,
			index: this.props.index,
			form : [],
			oblidged : [],
			boxType : ""
		};
	},

	componentWillReceiveProps: function(nextProps) {
		this.setState({form : this.findBoxObject(event.target.value,nextProps)[0] ,
			oblidged : this.findBoxObject(event.target.value,nextProps)[1] ,
			boxType : event.target.value,
			language: nextProps.language,
			index: nextProps.index
		});
	},

	shouldComponentUpdate: function(nextProps, nextState) {
		var shallowCompare = require('react-addons-shallow-compare');
		return shallowCompare(this, nextProps, nextState);
	},

	componentDidUpdate: function(prevProps, prevState){ 

	},

	clickBoxSelect: function(event)
	{
		console.log(event.target.value);
		console.log(this.findBoxObject(event.target.value,this.props.language));
		this.setState({form : this.findBoxObject(event.target.value,this.props)[0] ,oblidged : this.findBoxObject(event.target.value,this.props)[1] ,boxType : event.target.value});
	},

	logChange(val)
	{
		console.log(val);
	},



	render(){
		var getOptions = function(input, callback) {
		    setTimeout(function() {
		        callback(null, {
		            options: [
		                { value: 'one', label: 'One' },
		                { value: 'two', label: 'Two' }
		            ],
		            // CAREFUL! Only set this to true when there are no more options,
		            // or more specific queries will not be sent to the server.
		            complete: true
		        });
		    }, 5000);
		};

		return(
			<div className='container-fluid'>
				<SelectBoxTypeComponent language={this.state.language} index={this.state.index} onClick={this.clickBoxSelect} />
				<DynamicForm language={this.state.language} index={this.state.index} info={[this.state.form,this.state.oblidged]}/>
				
			</div>
		);
	}
});