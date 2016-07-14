import Select from 'react-select';
import 'react-select/dist/react-select.css';
import boxFile from '../Boxes/BoxesInfo.json';
import displayFile from '../languages/Settings.json';
import {PrintHello} from '../Functions/functionFile.js';

const CONTRIBUTORS = [
	{ github: 'jedwatson', name: 'Jed Watson' },
	{ github: 'bruderstein', name: 'Dave Brotherstone' },
	{ github: 'jossmac', name: 'Joss Mackison' },
	{ github: 'jniechcial', name: 'Jakub Niechciał' },
	{ github: 'craigdallimore', name: 'Craig Dallimore' },
	{ github: 'julen', name: 'Julen Ruiz Aizpuru' },
	{ github: 'dcousens', name: 'Daniel Cousens' },
	{ github: 'jgautsch', name: 'Jon Gautsch' },
	{ github: 'dmitry-smirnov', name: 'Dmitry Smirnov' }
];
const MAX_CONTRIBUTORS = 6;
const ASYNC_DELAY = 500;

Contributors = React.createClass({
	displayName: 'Contributors',
	propTypes: {
		label: React.PropTypes.string,
	},
	getInitialState () {
		return {
			multi: true,
			value: null,
		};
	},
	onChange (value) {
		this.setState({
			value: value,
		});
	},
	switchToMulti () {
		this.setState({
			multi: true,
			value: [this.state.value],
		});
	},
	switchToSingle () {
		this.setState({
			multi: false,
			value: this.state.value[0],
		});
	},
	getContributors (input, callback) {
		input = input.toLowerCase();
		var options = CONTRIBUTORS.filter(i => {
			return i.github.substr(0, input.length) === input;
		});
		var data = {
			options: options.slice(0, MAX_CONTRIBUTORS),
			complete: options.length <= MAX_CONTRIBUTORS,
		};
		setTimeout(function() {
			callback(null, data);
		}, ASYNC_DELAY);
	},
	gotoContributor (value, event) {
		window.open('https://github.com/' + value.github);
	},
	render () {
		return (
			<div className="section">
				<h3 className="section-heading">{this.props.label}</h3>
				<Select.Async multi value={this.state.value} onChange={this.onChange} valueKey="name" labelKey="name" loadOptions={this.getContributors} />
			</div>
		);
	}
});