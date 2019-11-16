import React from 'react';
import './App.css';
import PullRequestItem from './PullRequestItem.js';

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
			console.log(listOfPRs);
			listOfPRs = listOfPRs.slice(0, 16);
			console.log(listOfPRs);
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
			if (listOfPRs[i].date in groupedPRs){
				groupedPRs[listOfPRs[i].date].push(listOfPRs[i]);
			}
			else{
				groupedPRs[listOfPRs[i].date] = [listOfPRs[i]];
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
	 * rather than nothing happening/lagging
	 */
	handleClick(evt){
		this.setState({prs:[]});
		this.fetchPRs();
	}

	render(){
		let list = this.state.prs ? Object.keys(this.state.prs).map((date) => {
			return(
				<div className="pr-list-container">
					<div className="pr-list-content">	
						<h5 className="date-text">{date}</h5>
						<div className="pr-info">
						{this.state.prs[date].map((pr) => {
							return(
								<PullRequestItem prData={pr} />
							);
						})}
						</div>
					</div>
				</div>	
			)
		}) : <p>yeet</p>

		return(
			<div>
				<h3 className="title">Open Source @ UCSD GitHub Activity</h3>
			
				<div className="App">
					{list}
				</div>
			
				<div className="btn-container">
					<button onClick={this.handleClick} className="refresh-btn">Refresh!</button>
				</div>*
			</div>
		)
	}
}

export default App;
