import React from 'react';
import './App.css';
import PullRequestItem from './components/PullRequestItem.js';
import Timeline from './components/Timeline.js';

class App extends React.Component{
	constructor(){
		super();
		this.state = { prs: {} }
		this.fetchPRs = this.fetchPRs.bind(this);
		this.handleClick = this.handleClick.bind(this);
		this.groupByDate = this.groupByDate.bind(this);
	}

	componentDidMount(){
		this.fetchPRs()
	}

	/*
	 * Fetch pr's from /api/data
	 */
	fetchPRs = async () => {
		try{
			let listOfPRsResp = await fetch('/api/data');
			let listOfPRs = await listOfPRsResp.json();

			listOfPRs = listOfPRs.slice(0, 16);
			// group each pr with other prs that were made on the same day
			let orderedPRs = this.groupByDate(listOfPRs);
			this.setState({prs: orderedPRs});
		}
		catch(err){
			console.log(err);
			return;
		}
	}

	/*
	 * groups prs in a given list of prs with other prs that were made 
	 * in the same day
	 */
	groupByDate(listOfPRs){
		// group by date
		let groupedPRs = {}
		for (let i = 0; i < listOfPRs.length; i++){
			// get date to set as key (need to convert into a readable string first)
			let dateStr = new Date(listOfPRs[i].merged_time).toDateString();
			if (dateStr in groupedPRs){
				groupedPRs[dateStr].push(listOfPRs[i]);
			}
			else{
				groupedPRs[dateStr] = [listOfPRs[i]];
			}
		}

		// sort the object by date
		let sortedGroup = {}
		Object.keys(groupedPRs).sort((date1, date2) => {
			let first = new Date(date1);
			let sec = new Date(date2);
			return sec - first;
		}).forEach(function(key){
			sortedGroup[key] = groupedPRs[key];
		});
		return sortedGroup;
	}

	/*
	 * When refresh button is clicked, fetches the PRs again
	 * Setting state to empty array is for UX (so the user knows that there was an actual refresh
	 * rather than nothing happening/lagging)
	 */
	handleClick(evt){
		this.setState({prs:[]});
		this.fetchPRs();
	}

	render(){
		return(
			<div>
				<h3 className="title">Open Source @ UCSD GitHub Activity</h3>
			
				<Timeline prs={this.state.prs} />
			
				<div className="btn-container">
					<button onClick={this.handleClick} className="refresh-btn">Refresh!</button>
				</div>
			</div>
		)
	}
}

export default App;
