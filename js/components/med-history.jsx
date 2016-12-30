import React from 'react'
import {connect} from 'react-redux'
import {browserHistory} from 'react-router'
import actions from '../redux/actions'
import moment from 'moment'

class MedHistory extends React.Component {

    constructor() {
        super();
        this.selectMed = this.selectMed.bind(this);
    }

    componentDidMount() {
        this.props.dispatch(actions.fetchHistory());
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.med.name !== '') {
            browserHistory.push(`/medication/${nextProps.med.name}`);
        }
    }

    selectMed(medId) {
        this.props.dispatch(actions.selectMed(medId));
    }

    render() {
        console.log('state:', this.props.state);
        let historyMessage = 'Your medication history:';
        
        let historyFeed = this.props.meds.map((med) => {
            let time = moment(med.when_taken).format('MMM Do YYYY, h:mm A');
            return (
                <li key={med.id}>
                    <a onClick={this.selectMed.bind(this, med.med_id)}><p className='name'>{med.med_name}</p></a>
                    <p className='dosage'>{med.med_dosage}</p>
                    <p className='date'>{time}</p>
                </li>
            )
        });

        if (historyFeed.length === 0) {
            dueMessage = 'You have no medication history.';
        }

        return (
            <div className='med-history'>
                <h2>{historyMessage}</h2>
                <ul>{historyFeed}</ul>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        state: state,
        meds: state.meds.list,
        med: state.medDetails
    }
};

module.exports = connect(mapStateToProps)(MedHistory);