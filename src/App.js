import React, { Component}  from 'react';
import Footer from './components/Footer';
import Header from './components/Header';

class App extends Component {
    
	constructor(props){
		super(props);
		this.state = {
			name:'Gopinath'
		}
	}
    
	render(){
		return(
			<div className='container'>
				<Header />
                    content
				<Footer/>
			</div>
		);
	}
}

export default App;