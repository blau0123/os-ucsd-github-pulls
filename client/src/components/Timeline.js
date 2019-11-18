import React from 'react';
import './Timeline.css';
import PullRequestItem from './PullRequestItem';

class Timeline extends React.Component{
	render(){
		let {prs} = this.props;
		let listOfPRs = 
				prs ? Object.keys(prs).map((date) => {
					return(
						<div className="pr-list-container">
							<div className="pr-list-content">	
								<h5 className="date-text">{date}</h5>
								<div className="pr-info">
								{prs[date].map((pr) => {
									return(
										<PullRequestItem prData={pr} />
									);
								})}
								</div>
							</div>
						</div>	
					)
				}) : <p>No pull requests to show currently.</p>
		
		return(
			<div className="list-container">
				{listOfPRs}
			</div>
		);
	}
}

export default Timeline;
