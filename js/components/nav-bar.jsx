import React from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import actions from '../redux/actions'

class NavBar extends React.Component {
	constructor() {
        super();
        this.changePage = this.changePage.bind(this);
    }

    changePage(path) {
    	this.props.dispatch(actions.deselectMed());
    	browserHistory.push(path);
    }

	render() {
		return (
	    	<div className="nav-bar">
	    		<ul className='nav-top'>
	    			<li><a onClick={this.changePage.bind(this, '/')}>Notifications</a></li>
		        	<li><a onClick={this.changePage.bind(this, '/history')}>History</a></li>
		        	<li><a onClick={this.changePage.bind(this, '/medication')}>All Medication</a></li>
		        	<li><a onClick={this.changePage.bind(this, '/new')}>New Medication</a></li>
	        	</ul>
	    		<h1><a onClick={this.changePage.bind(this, '/')}>RxMinder</a></h1>
	    	</div>
		);
	}
}

module.exports = connect()(NavBar);