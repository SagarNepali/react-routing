import React, {Component} from 'react';
import 'whatwg-fetch';
import {Link, Route, Switch} from 'react-router-dom';
import RepoDetails from '../RepoDetails/RepoDetails.jsx';

class Repos extends Component{
	

	constructor(){
		super();
		this.state = { repositories:[]};
	}

	componentDidMount(){
		fetch('https://api.github.com/users/pro-react/repos')
		.then((response) =>{
			if(response.ok){
				return response.json()
			}else{
				throw new Errror("Server response not OK")
			}
			
		})
		.then((responseData) => {
			this.setState({repositories:responseData});
		})
		.catch((error)=>{
			this.props.history.push("/error");
		});
	}

	render(){

		let repos = this.state.repositories.map((repo) => (
						<li key={repo.id}>
							<Link to={"/repos/details/"+repo.name} activeclassname="active">{repo.name}</Link>
						</li>
					));

		return(
			<div>
			<h1>Github Repos</h1>
				<ul>
					{repos}
				</ul>
				
				<Route path ={"/repos/details/:repo_name"} component={RepoDetails} />
			</div>
		);
	}
}

export default Repos;

