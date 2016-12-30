import React from 'react'
import {connect} from 'react-redux'
import {browserHistory} from 'react-router'
import actions from '../redux/actions'
import moment from 'moment'

class LandingPage extends React.Component {

    constructor() {
        super();
        this.selectMed = this.selectMed.bind(this);
    }

    componentDidMount() {
        this.props.dispatch(actions.fetchMedsSched());
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
        let dueMessage = 'Take the following medication now!';
        let upcomingFeed = 'You are scheduled to take the following medication at a future time:';
        
        let dueFeed = this.props.due.map((med) => {
            let time = moment(due.nextDose).format('MMM Do YYYY, h:mm A');
            return (
                <li key={med.id}>
                    <a onClick={this.selectMed.bind(this, med.id)}><p className='name'>{med.name}</p></a>
                    <p className='dosage'>{med.dosage}</p>
                    <p className='date'>{time}</p>
                </li>
            )
        });

        let upcomingFeed = this.props.upcoming.map((med) => {
            let time = moment(upcoming.nextDose).format('MMM Do YYYY, h:mm A');
            return (
                <li key={med.id}>
                    <a onClick={this.selectMed.bind(this, med.id)}><p className='name'>{med.name}</p></a>
                    <p className='dosage'>{med.dosage}</p>
                    <p className='date'>{time}</p>
                </li>
            )
        });

        if (dueFeed.length === 0) {
            dueMessage = 'You are currently caught up on all medication.';
        } else if (upcomingFeed.length === 0 && dueFeed.length === 0) {
            dueMessage = 'You are not currently scheduled to take any medication.';
            upcomingMessage = '';
        }

        return (
            <div className='landing-page'>
                <h2>{dueMessage}</h2>
                <ul>{dueFeed}</ul>
                <h2>{upcomingMessage}</h2>
                <ul>{upcomingFeed}</ul>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        state: state,
        upcoming: state.meds.upcoming,
        due: state.meds.due
        med: state.medDetails
    }
};

module.exports = connect(mapStateToProps)(LandingPage);


