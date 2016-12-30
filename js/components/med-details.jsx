import React from 'react'
import {connect} from 'react-redux'
import {browserHistory} from 'react-router'
import actions from '../redux/actions'
import moment from 'moment'

class MedDetails extends React.Component {
	constructor() {
        super();
        this.editMed = this.editMed.bind(this);
        this.deleteMed = this.deleteMed.bind(this);
        this.submitEdit = this.submitEdit.bind(this);
        this.cancelEdit = this.cancelEdit.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.med.name === '') {
            browserHistory.push('/medication');
        }
    }

    editMed(property) {
    	this.props.dispatch(actions.editMed(property));
    }

    deleteMed() {
    	this.props.dispatch(actions.deleteMed(this.props.med.id));
        this.props.dispatch(actions.deselectMed());
    }

    submitEdit(event) {
    	event.preventDefault();
    	let editProp = this.props.med.edit;
        let editVal = this.refs.editVal.value;
        let id = this.props.med.id
    	if (this.props.med.edit === 'hours to next dose') {
    		editProp = 'next_dose_secs'
            editVal = editVal * 3600;
            editVal = editVal + parseInt(this.props.med.nextDoseSecs);
    	}
        if (this.props.med.edit === 'doses per day') {
            editProp = 'num_doses'
            let frequency = Math.floor(24 / numDoses);
            frequecy = 3600 * frequency;
            let nextDoseSecs = parseInt(this.props.nextDoseSecs) + (frequency - this.props.frequency);
            let nextDoseDate = new Date(0);
            nextDoseSecs = nextDoseSecs.toString();
            nextDoseDate.setUTCSeconds(nextDoseSecs);
            this.props.dispatch(actions.submitEdit(id, 'frequency', frequency));
            this.props.dispatch(actions.submitEdit(id, 'next_dose_secs', nextDoseSecs));
            this.props.dispatch(actions.submitEdit(id, 'next_dose_date', nextDoseDate));
        }
    	this.props.dispatch(actions.submitEdit(id, editProp, editVal));
        this.props.dispatch(actions.selectMed(id));
    }

    cancelEdit() {
    	this.props.dispatch(actions.cancelEdit());
    }

    render() {
    	console.log('state:', this.props.state);
    	let time = moment(med.nextDoseDate).format('MMM Do YYYY, h:mm A');
    	if (this.props.med.edit !== '') {
    		return (
    			<div className='med-details'>
    				<h3>Enter new value for {this.props.med.edit}:</h3>
    				<input type='text' ref='editVal' required/>
    				<button type='button' onClick={this.submitEdit()}>Submit</button>
    				<button type='button' onClick={this.cancelEdit()}>Cancel</button>
    			</div>
    		)
    	}
    	return (
    		<div className='med-details'>
    			<ul>
    				<li><h3>name: {this.props.med.name}</h3><button type="button" onClick={this.editMed.bind(this, 'name')}>Edit</button></li>
    				<li><h3>dosage: {this.props.med.dosage} mg</h3><button type="button" onClick={this.editMed.bind(this, 'dosage')}>Edit</button></li>
    				<li><h3>doses per day: {this.props.med.numDoses}x daily</h3><button type="button" onClick={this.editMed.bind(this, 'doses per day')}>Edit</button></li>
    				<li><h3>next dose: {time}</h3><button type="button" onClick={this.editMed.bind(this, 'hours to next dose')}>Edit</button></li>
    				<li><h3>instructions: {this.props.med.instructions}</h3><button type="button" onClick={this.editMed.bind(this, 'instructions')}>Edit</button></li>
    				<li><h3>precautions: {this.props.med.precautions}</h3><button type="button" onClick={this.editMed.bind(this, 'precautions')}>Edit</button></li>
    			</ul>
    			<button type="button" onClick={this.deleteMed()}>Delete</button>
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

module.exports = connect(mapStateToProps)(MedDetails);
