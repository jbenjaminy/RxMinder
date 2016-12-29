import React from 'react';
import {connect} from 'react-redux';
import {Router, Route, IndexRoute, browserHistory, Link} from 'react-router';
// import LandingPage from './landing-page';
// import AddMed from './add-med';
// import MedsPage from './meds-page';
// import DoseHistory from './dose-history';

function NavBar () {
	render() {
		return (
	    	<div className="nav-bar">
	    		<ul className='nav-top'>
		        	<li><Link to={'/medication'} className='links'>All Medication</Link></li>
		        	<li><Link to={'/new'} className='links'>New Medication</Link></li>
		        	<li><Link to={'/history'} className='links'>History</Link></li>
		        	<li>Notifications</li>
	        	</ul>
	    		<h1><Link to={'/'}>RxMinder</Link></h1>
	    	</div>
		);
	}
}

export default NavBar;