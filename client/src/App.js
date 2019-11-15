import React from 'react';
import logo from './logo.svg';
import './App.css';

class App extends React.Component{
	state = { cow: '', text: ''}
	componentDidMount(){
		this.fetchCow()
	}
	fetchCow = async () => {
		const response = await fetch(`/api/cow`)
		const initCow = await response.json()
		const cow = initCow.moo
		this.setState({cow})
	}
	customCow = async evt => {
		evt.preventDefault()
		const text = this.state.text
		const response = await fetch(`/api/cow/${text}`)
		const custom = await response.json()
		const cow = custom.moo
		this.setState({cow, text: ''})
	}
	handleChange = evt => {
		this.setState({ [evt.target.name]: evt.target.value })
		console.log(this.state.text)
	}

	render(){
		return(
			<div className="App">
				<code>{this.state.cow}</code>
				<form onSubmit={this.customCow}>
					<input type="text" name="text" 
						value={this.state.text} 
						onChange={this.handleChange}
					/>
					<button type="submit">Yeet</button>
				</form>
			</div>
		)
	}
}

export default App;
