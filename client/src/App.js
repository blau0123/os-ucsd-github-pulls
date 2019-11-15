import React from 'react';
import './App.css';
import {getAllPRs} from './pulls.js'; 

class App extends React.Component{
	constructor(){
		super();
		this.state = { prs: [] }
		this.fetchPRs = this.fetchPRs.bind(this)
	}

	componentDidMount(){
		this.fetchPRs()
	}

	fetchPRs = async () => {
		let listOfPRs = await getAllPRs();
		console.log(listOfPRs)
		this.setState({prs: listOfPRs.slice(0, 16)});
	}

	render(){
		let list = this.state.prs ? this.state.prs.map((pr) =>{ 
			return( <li>
					<a href={pr.repoURL}>
						{pr.user + " just made a pull request to " + pr.repoName + " at " + pr.date + ", " + pr.time + "!"} 
					</a>
				</li>)
		}) : <p>Loading...</p>
		return(
			<div className="App">
				<h3>Open Source @ UCSD GitHub Activity</h3>
				<ul>
					{list}
				</ul>
			</div>
		)
	}
}

export default App;
