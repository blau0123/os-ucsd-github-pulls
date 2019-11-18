import React from 'react';
import './PullRequestItem.css'; 

class PullRequestItem extends React.Component{
	render(){
		const {prData} = this.props;
		let timeStr = new Date(prData.merged_time).toLocaleTimeString();
		return(
			<div className="item-container">
				<div className="item-content">
					<p>{timeStr}</p>
					<a href={prData.repoURL} className="pr-link">
						<p>{prData.user + " made a pull request to " + prData.repoName + "!"}</p>
					</a>
					<span className="circle" />
				</div>
			</div>
		)
	}
}

export default PullRequestItem;
