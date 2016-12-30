        this.props.dispatch(actions.fetchSchedule());
        addMed
        selectMed
        this.deleteMed = this.deleteMed.bind(this);
        this.submitEdit = this.submitEdit.bind(this);
        this.cancelEdit = this.cancelEdit.bind(this);
        fetchHistory
        clearMed
                this.editMed = this.editMed.bind(this);

var fetch = require('isomorphic-fetch');

// Begin editing property of a selected medication
let editMed = (property) => {
    return {
        type: 'updateMedDetails',
        data: {
        	edit: property
        }
    };
};

// ON USER INPUT CHANGE
var ADD_INPUT = 'ADD_INPUT';
var addInput = function(tempLib) {
    return {
        type: ADD_INPUT,
        tempLib: tempLib
    };
};

// GET CASINO DETAILS
var fetchCasinoDetails = function(casinoName) {
    return function(dispatch) {
        var url = '/casinos/' + casinoName;
        var request = {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            };
        return fetch(url, request)
        .then(function(response) {
            if (response.status < 200 || response.status >= 300) {
                var error = new Error(response.statusText);
                error.response = response;
                throw error;
            }
            return response;
        })
        .then(function(response) {
            return response.json();
        })
        .then(function(casino) {
            return dispatch(
                fetchCasinoDetailsSuccess(casino)
            );
        })
        .catch(function(error) {
            return dispatch(
                fetchCasinoDetailsError(error)
            );
        });
    }
};

var FETCH_CASINO_DETAILS_SUCCESS = 'FETCH_CASINO_DETAILS_SUCCESS';
var fetchCasinoDetailsSuccess = function(casino) {
    return {
        type: FETCH_CASINO_DETAILS_SUCCESS,
        casino: casino
    };
};

var FETCH_CASINO_DETAILS_ERROR = 'FETCH_CASINO_DETAILS_ERROR';
var fetchCasinoDetailsError = function(error) {
    return {
        type: FETCH_CASINO_DETAILS_ERROR,
        error: error
    };
};

// GET TOURNAMENT INFO
var fetchTournamentInfo = function(casinoName) {
    return function(dispatch) {
        var url = '/casinos/' + casinoName + '/tournaments';
        var request = { 
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
        };
        return fetch(url, request)
        .then(function(response) {
            if (response.status < 200 || response.status >= 300) {
                var error = new Error(response.statusText);
                error.response = response;
                throw error;
            }
            return response;
        })
        .then(function(response) {
            return response.json();
        })
        .then(function(tournaments) {
            return dispatch(
                fetchTournamentInfoSuccess(tournaments)
            );
        })
        .catch(function(error) {
            return dispatch(
                fetchTournamentInfoError(error)
            );
        });
    }
};

var FETCH_TOURNAMENT_INFO_SUCCESS = 'FETCH_TOURNAMENT_INFO_SUCCESS';
var fetchTournamentInfoSuccess = function(tournaments) {
    return {
        type: FETCH_TOURNAMENT_INFO_SUCCESS,
        tournaments: tournaments
    };
};

var FETCH_TOURNAMENT_INFO_ERROR = 'FETCH_TOURNAMENT_INFO_ERROR';
var fetchTournamentInfoError = function(error) {
    return {
        type: FETCH_TOURNAMENT_INFO_ERROR,
        error: error
    };
};

/*---------- EXPORTS ---------*/
exports.editMed = editMed;

exports.ADD_INPUT = ADD_INPUT;
exports.addInput = addInput;

exports.fetchCasinoDetails = fetchCasinoDetails;
exports.FETCH_CASINO_DETAILS_SUCCESS = FETCH_CASINO_DETAILS_SUCCESS;
exports.FETCH_CASINO_DETAILS_ERROR = FETCH_CASINO_DETAILS_ERROR;
exports.fetchCasinoDetailsSuccess = fetchCasinoDetailsSuccess;
exports.fetchCasinoDetailsError  = fetchCasinoDetailsError;

exports.fetchTournamentInfo = fetchTournamentInfo;
exports.FETCH_TOURNAMENT_INFO_SUCCESS = FETCH_TOURNAMENT_INFO_SUCCESS;
exports.FETCH_TOURNAMENT_INFO_ERROR = FETCH_TOURNAMENT_INFO_ERROR;
exports.fetchTournamentInfoSuccess = fetchTournamentInfoSuccess;
exports.fetchTournamentInfoError = fetchTournamentInfoError;