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

    addMed() {
    	this.props.dispatch(actions.addMed())
    }

    render() {
    	return (
    		<div className='addMed'>
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