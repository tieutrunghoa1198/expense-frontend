import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class MissingPage extends Component {
	constructor(props) {
		super(props)
		this.state = false
	}

	render() {
		return (
			<article style={{ padding: '100px' }}>
				<h1>Oops!</h1>
				<p>Page Not Found</p>
				<div className="flexGrow">
					<Link to="/">Visit Our Homepage</Link>
				</div>
			</article>
		)
	}
}