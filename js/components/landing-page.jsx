import React from 'react'
import {connect} from 'react-redux'
import {browserHistory} from 'react-router'
import actions from '../redux/actions'

class LandingPage extends React.Component {

    constructor() {
        super();
        // this.postQuestion = this.postQuestion.bind(this);
    }

    componentDidMount() {
        this.props.dispatch(actions.fetchMedsSched());
    }

    render() {
        return (
        );
    }
)};
