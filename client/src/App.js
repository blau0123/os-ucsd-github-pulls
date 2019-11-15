import React from 'react';
import './App.css';

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
		let listOfPRsResp = await fetch('/api/data');
		let listOfPRs = await listOfPRsResp.json();
		listOfPRs = listOfPRs.slice(0, 16);
		// group each pr with other prs that were made on the same day
		let orderedPRs = this.groupByDate(listOfPRs);
		this.setState({prs: orderedPRs});
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

	handleClick(evt){
		this.setState({prs:[]});
		this.fetchPRs();
	}

	render(){
		let list = this.state.prs ? Object.keys(this.state.prs).map((date) => {
			return( 
				<div>
					<h5>{date}</h5>
					<p>{this.state.prs[date].map((pr) => {
						return(
						<li>
							<a href={pr.repoURL}>
								<p>{pr.time}</p>
								<p>{pr.user + " made a pull request to " + pr.repoName}</p>
							</a>
						</li>
						)
					})}</p>
				</div>
			)
		}) : <ul>Loading...</ul>
		
		return(
			<div className="App">
				<h3>Open Source @ UCSD GitHub Activity</h3>
				<ul className="pr-list">
					{list}
				</ul>
				<button onClick={this.handleClick}>Refresh!</button>
			</div>
		)
	}
}

export default App;
