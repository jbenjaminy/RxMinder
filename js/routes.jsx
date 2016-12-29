import React from 'react';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import LandingPage from './components/landing-page';
import NavBar from './components/nav-bar';
import MedsPage from './components/meds-page';
import AddMed from './components/add-med';
import MedDetails from './components/med-details';
import DoseHistory from './components/doseHistory';

let App = (props) => {
  return (
    <div className='app'>
      <NavBar />
      <div>
        {props.children}
      </div>
    </div>
  )
}

const routes = (
  <Router history={browserHistory}>
    <Route path='/' component={App}>
      <IndexRoute component={LandingPage} />
      <Route path='/medication' component={MedsPage} />
      <Route path='/new' component={AddMed} />
      <Route path='/history' component={DoseHistory} />
      <Route path='/medication/:medName'>
        <IndexRoute component={MedDetails} />
      </Route>
    </Route>
  </Router>
);

export default routes;