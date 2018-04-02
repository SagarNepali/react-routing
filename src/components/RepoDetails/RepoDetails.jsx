import React ,{Component} from 'react';

export default class RepoDetails extends Component{
	

	constructor(){
		super();
		this.state = {
			repository:{}
		};
	}

	fetchData(repo_name){
		fetch('https://api.github.com/repos/pro-react/'+repo_name)
		.then((response) =>{
			if(response.ok()){
				return response.json();
			}else{
				throw new Error("Server connection failed")
			}
		})
		.then((responseData) => {
		this.setState({repository:responseData});
		})
		.catch((error)=>{
			this.props.history.push("/error");
		});

	}
	 
	componentDidMount(){
		// The Router injects the key "repo_name" inside the params prop
		console.log(this.props)
		let repo_name = this.props.match.params.repo_name;
		this.fetchData(repo_name)
	}
	 
	componentWillReceiveProps(nextProps){
		// The Router injects the key "repo_name" inside the params prop
		
		let repo_name = nextProps.match.params.repo_name;
		this.fetchData(repo_name)
	}

	render(){
		let stars = [];
		for (var i = 0; i < this.state.repository.stargazers_count; i++) {
			stars.push('');
		}
		return(
			<div>
				<h2>{this.state.repository.name}</h2>
				<p>{this.state.repository.description}</p>
				<span>{stars}</span>
			</div>
		);
	}
}

