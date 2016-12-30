import React from 'react'
import {connect} from 'react-redux'
import {browserHistory} from 'react-router'
import actions from '../redux/actions'
import moment from 'moment'

class LandingPage extends React.Component {

    constructor() {
        super();
        this.selectMed = this.selectMed.bind(this);
        this.markDose = this.markDose.bind(this);
        this.skipDose = this.skipDose.bind(this);
    }

    componentDidMount() {
        this.props.dispatch(actions.fetchSchedule());
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.med.name !== '') {
            browserHistory.push(`/medication/${nextProps.med.name}`);
        }
    }

    selectMed(medId) {
        this.props.dispatch(actions.selectMed(medId));
    }

    markDose(id, frequency, nextDoseSecs) {
        let nextDoseSecsEdit = parseInt(nextDoseSecs) + frequency;
        let nextDoseDate = new Date(0);
        nextDoseDate.setUTCSeconds(nextDoseSecsEdit);
        nextDoseSecsEdit = nextDoseSecsEdit.toString();

        this.props.dispatch(actions.submitEdit(id, 'next_dose_secs', nextDoseSecsEdit));
        this.props.dispatch(actions.submitEdit(id, 'next_dose_date', nextDoseDate));
        this.props.dispatch(actions.addHistory(id));
        this.props.dispatch(actions.fetchSchedule());
    }

    skipDose(id, frequency, nextDoseSecs) {
        let nextDoseSecsEdit = parseInt(nextDoseSecs) + frequency;
        let nextDoseDate = new Date(0);
        nextDoseDate.setUTCSeconds(nextDoseSecsEdit);
        nextDoseSecsEdit = nextDoseSecsEdit.toString();

        this.props.dispatch(actions.submitEdit(id, 'next_dose_secs', nextDoseSecsEdit));
        this.props.dispatch(actions.submitEdit(id, 'next_dose_date', nextDoseDate));
        this.props.dispatch(actions.fetchSchedule());
    }

    render() {
        console.log('state:', this.props.state);
        let dueMessage = 'Take the following medication now!';
        let upcomingMessage = 'Future medication schedule:';
        
        let dueFeed = this.props.due.map((med) => {
            return (
                <li key={med.id}>
                    <a onClick={this.selectMed.bind(this, med.id)}><h3 className='dosage'>{med.dosage} mg of {med.name}</h3></a>
                    <button type='button' onClick={this.markDose.bind(this, med.id, med.frequency, med.nextDoseSecs)}>Dose Taken</button>
                    <button type='button' onClick={this.skipDose.bind(this, med.id, med.frequency, med.nextDoseSecs)}>Skip Dose</button>
                    <hr/>
                </li>
            )
        });

        let upcomingFeed = this.props.upcoming.map((med) => {
            console.log(med.nextDoseDate);
            let time = moment(med.nextDoseDate).format('MMM Do YYYY, h:mm A');
            return (
                <li key={med.id}>
                    <a onClick={this.selectMed.bind(this, med.id)}><h3 className='dosage'>{med.dosage} mg of {med.name}</h3></a>
                    <h3 className='date'>@ {time}</h3>
                    <hr/>
                </li>
            )
        });

        if (dueFeed.length === 0) {
            dueMessage = '';
        } 
        if (upcomingFeed.length === 0 && dueFeed.length === 0) {
            dueMessage = 'You have no medication scheduled.';
            upcomingMessage = '';
        }

        return (
            <div className='landing-page'>
                <h2>{dueMessage}</h2>
                <ul className='med-feed'>{dueFeed}</ul>
                <h2>{upcomingMessage}</h2>
                <ul className='med-feed'>{upcomingFeed}</ul>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        state: state,
        upcoming: state.meds.list,
        due: state.meds.due,
        med: state.medDetails
    }
};

module.exports = connect(mapStateToProps)(LandingPage);