import React from 'react';
import {connect} from 'react-redux';
import {Router, Route, IndexRoute, browserHistory, Link} from 'react-router';
// import LandingPage from './landing-page';
// import AddMed from './add-med';
// import MedsPage from './meds-page';
// import DoseHistory from './dose-history';

class NavBar extends React.Component {
	constructor() {
        super();
        this.clearMed = this.clearMed.bind(this);
    }

    clearMed() {
    	this.props.dispatch(actions.deselectMed());
    }

	render() {
		return (
	    	<div className="nav-bar">
	    		<ul className='nav-top'>
	    			<li><Link to={'/'} onClick={this.clearMed}>Notifications</Link></li>
		        	<li><Link to={'/history'} onClick={this.clearMed} className='links'>History</Link></li>
		        	<li><Link to={'/medication'} onClick={this.clearMed} className='links'>All Medication</Link></li>
		        	<li><Link to={'/new'} onClick={this.clearMed} className='links'>New Medication</Link></li>
	        	</ul>
	    		<Link to={'/'} onClick={this.clearMed}><h1>RxMinder</h1></Link>
	    	</div>
		);
	}
}

module.exports = connect()(NavBar);