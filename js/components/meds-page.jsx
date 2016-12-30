import React from 'react'
import {connect} from 'react-redux'
import {browserHistory} from 'react-router'
import actions from '../redux/actions'

class MedsPage extends React.Component {
	constructor() {
        super();
        this.selectMed = this.selectMed.bind(this);
    }

    componentDidMount() {
        this.props.dispatch(actions.fetchMeds());
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
    	let medFeed = this.props.meds.map((med) => {
            return (
                <li key={med.id}>
                    <a onClick={this.selectMed.bind(this, med.id)}><p className='name'>{med.name}</p></a>
                </li>
            )
        });
    	return (
    		<div className='meds-page'>
    			<ul>
                    {medFeed}
    			</ul>
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

module.exports = connect(mapStateToProps)(MedsPage);