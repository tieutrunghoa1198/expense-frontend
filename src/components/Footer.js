import React, { Component } from 'react';

export default class Footer extends Component {

	render() {
		return(
			<footer className="footer" style={{position: 'fixed', bottom: 0}}>
				<div className="container">
					<span className="text-muted">© 2023 Your Website</span>
				</div>
		  </footer>
		)
	}
}