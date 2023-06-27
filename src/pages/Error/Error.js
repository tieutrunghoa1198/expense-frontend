import React, { Component } from 'react';
import "./style.css"


export default class Error extends Component {
	constructor(props) {
		super(props)
		this.state = false   
	}
    

	render() {
		return (
            <section class="page_404">
            <div class="container">
                <div class="row">	
                <div class="col-sm-12 ">
                <div class="col-sm-10 col-sm-offset-1  text-center">
                <div class="four_zero_four_bg">
                    <h1 class="text-center ">404</h1>
                
                
                </div>
                
                <div class="contant_box_404">
                <h3 class="h2">
                Please donate to complete function 
                </h3>
                
                <p>keep calm and relax</p>
                <p>How What Why Have This Error</p>
                
                <a href="https://www.youtube.com/watch?v=kF5SrMAQIng" class="link_404">Go to Home</a>
            </div>
                </div>
                </div>
                </div>
            </div>
        </section>	
		)
	}
}