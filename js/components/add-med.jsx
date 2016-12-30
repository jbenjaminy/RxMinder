import React from 'react'
import {connect} from 'react-redux'
import {browserHistory} from 'react-router'
import actions from '../redux/actions'

class AddMed extends React.Component {
	constructor() {
        super();
        this.addMed = this.addMed.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.med.name !== '') {
            browserHistory.push(`/medication/${nextProps.med.name}`);
        }
    }

    addMed(event) {
        event.preventDefault();
    	this.props.dispatch(actions.addMed(this.refs.nameVal.value, this.refs.dosageVal.value, this.refs.numDosesVal.value, this.refs.firstDoseVal.value, this.refs.instructionsVal.value, this.refs.precautionsVal.value));
    }

    render() {
    	return (
    		<div className='add-med'>
    			<ul>
    				<li><h3>What is the medication name?</h3><input type='text' placeholder='Enter the name on the label' ref='nameVal' required/></li>
    				<li><h3>What is the prescribed dosage?</h3><input type='text' placeholder='Enter the number of mg per dose' ref='dosageVal' required/></li>
    				<li><h3>How many times will you take the medication daily?</h3><input type='text' placeholder='Enter the number of daily doses' ref='numDosesVal' required /></li>
    				<li><h3>When do you plan to take the first dose?</h3><input type='text' placeholder='Enter the number of hours from now' ref='firstDoseVal' required /></li>
    				<li><h3>Are there any special instructions?</h3><input type='text' placeholder='Optional' ref='instructionsVal' /></li>
    				<li><h3>Are there any warnings about side effects or interactions with other drugs?</h3><input type='text' placeholder='Optional' ref='precautionsVal' /></li>
    				<button type='button' onClick={this.addMed}>Submit</button>
    			</ul>
    		</div>
    	);
    }
}

const mapStateToProps = (state) => {
    return {
        state: state,
        med: state.medDetails
    }
};

module.exports = connect(mapStateToProps)(AddMed);