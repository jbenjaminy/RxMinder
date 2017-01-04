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
        if (nextProps.medDetails.name !== '') {
            browserHistory.push('/medication');
        }
    }

    editMed(property) {
    	this.props.dispatch(actions.editMed(property));
    }

    deleteMed(id) {
    	this.props.dispatch(actions.deleteMed(id));
        this.props.dispatch(actions.deselectMed());
        this.props.dispatch(actions.fetchSchedule());
        browserHistory.push('/');
    }

    submitEdit(event) {
    	event.preventDefault();
    	let editProp = this.props.medDetails.edit;
        let editVal = this.refs.editVal.value;
        let id = this.props.medDetails.id;
        console.log('params', editVal, editProp, id);
        if (this.props.medDetails.edit === 'doses per day') {
            editProp = 'num_doses'
            let frequency = Math.floor(24 / this.props.medDetails.numDoses);
            frequency = 3600 * frequency;
            this.props.dispatch(actions.submitEdit(id, 'frequency', frequency));
        }
    	this.props.dispatch(actions.submitEdit(id, editProp, editVal));
    }

    cancelEdit() {
    	this.props.dispatch(actions.cancelEdit());
    }

    render() {
    	console.log('state:', this.props.state);
    	let time = moment(this.props.medDetails.nextDoseDate).format('MMM Do YYYY, h:mm A');
    	if (this.props.medDetails.edit !== '') {
    		return (
    			<div className='med-details'>
    				<h3>Enter new value for {this.props.medDetails.edit}:</h3>
    				<input type='text' className='edit-input' ref='editVal' required/>
    				<button type='button' className='edit-buttons' onClick={this.submitEdit}>Submit</button>
    				<button type='button' className='edit-buttons' onClick={this.cancelEdit}>Cancel</button>
    			</div>
    		)
    	}
    	return (
    		<div className='med-details'>
    			<ul>
    				<li><button type="button" onClick={this.editMed.bind(this, 'name')}>Edit</button><h3>name: <span className='titles'>{this.props.medDetails.name}</span></h3></li>
    				<li><button type="button" onClick={this.editMed.bind(this, 'dosage')}>Edit</button><h3>dosage: <span className='titles'>{this.props.medDetails.dosage} mg</span></h3></li>
    				<li><button type="button" onClick={this.editMed.bind(this, 'doses per day')}>Edit</button><h3>doses per day: <span className='titles'>{this.props.medDetails.numDoses}x daily</span></h3></li>
    				<li><button type="button" onClick={this.editMed.bind(this, 'instructions')}>Edit</button><h3>instructions: <span className='titles'>{this.props.medDetails.instructions}</span></h3></li>
    				<li><button type="button" onClick={this.editMed.bind(this, 'precautions')}>Edit</button><h3>precautions: <span className='titles'>{this.props.medDetails.precautions}</span></h3></li>
                    <li><h3>next dose: <span className='titles'>{time}</span></h3></li>
    			</ul>
    			<button type="button" onClick={this.deleteMed.bind(this, this.props.medDetails.id)}>Delete</button>
    		</div>
    	);
    }
}

const mapStateToProps = (state) => {
    return {
        state: state,
        medDetails: state.medDetails
    }
};

module.exports = connect(mapStateToProps)(MedDetails);
