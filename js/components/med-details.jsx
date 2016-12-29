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
        this.submitEdit = this.deleteMed.bind(this);
        this.cancelEdit = this.cancelEdit.bind(this);
    }

    editMed(property) {
    	this.props.dispatch(actions.editMed(this.props.med.id, property));
    }

    deleteMed() {
    	this.props.dispatch(actions.deleteMed(this.props.med.id));
    }

    submitEdit(event) {
    	event.preventDefault();
    	let editProp = this.props.med.edit;
    	if (this.props.med.edit === 'next dose') {
    		editProp = 'next_dose'
    	}
    	this.props.dispatch(actions.submitEdit(this.props.med.id, editProp, this.refs.editVal.value));
    }

    cancelEdit() {
    	this.props.dispatch(actions.cancelEdit());
    }

    render() {
    	console.log('state:', this.props.state);
    	let time = moment(med.nextDose).format('MMM Do YYYY, h:mm A');
    	if (this.props.med.edit !== '') {
    		return (
    			<div className='med-details'>
    				<h3>Enter new value for {this.props.med.edit}:</h3>
    				<input type='text' ref='editVal'/>
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
    				<li><h3>frequency: {this.props.med.frequency}x daily</h3><button type="button" onClick={this.editMed.bind(this, 'frequency')}>Edit</button></li>
    				<li><h3>next dose: {time}</h3><button type="button" onClick={this.editMed.bind(this, 'next dose')}>Edit</button></li>
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
