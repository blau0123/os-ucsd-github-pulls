import React from 'react';
import './App.css';

class App extends React.Component{
	constructor(){
		super();
		this.state = { prs: [] }
		this.fetchPRs = this.fetchPRs.bind(this);
		this.handleClick = this.handleClick.bind(this);
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
		this.setState({prs: listOfPRs.slice(0, 16)});
	}

	handleClick(evt){
		this.setState({prs:[]});
		this.fetchPRs();
	}

	render(){
		let list = this.state.prs ? this.state.prs.map((pr) =>{ 
			return( <li>
					<a href={pr.repoURL}>
						{pr.date + ", " + pr.time + "\n" + pr.user + " just made a pull request to " + pr.repoName} 
					</a>
				</li>)
		}) : <ul>Loading...</ul>
		return(
			<div className="App">
				<h3>Open Source @ UCSD GitHub Activity</h3>
				<ul>
					{list}
				</ul>
				<button onClick={this.handleClick}>Refresh!</button>
			</div>
		)
	}
}

export default App;
