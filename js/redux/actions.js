import fetch from 'isomorphic-fetch';

// Get updated lists of scheduled and due medication
let fetchSchedule = () => {
    return (dispatch) => {
        let url = '/medication';
        let request = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        };
        return fetch(url, request)
        .then((response) => {
            if (response.status < 200 || response.status >= 300) {
                let error = new Error(response.statusText);
                error.response = response;
                throw error;
            }
            return response.json();
        })
        .then((data) => {
            return dispatch ({
                type: 'updateMedList',
                data: {
                    due: data.dueMeds,
                    list: data.upcomingMeds
                }
            });
        })
        .catch((error) => {
            console.error(error);
        });
    }
};

// Get a complete list of all medications
let fetchMeds = () => {
    return (dispatch) => {
        let url = '/medication/all';
        let request = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        };
        return fetch(url, request)
        .then((response) => {
            if (response.status < 200 || response.status >= 300) {
                let error = new Error(response.statusText);
                error.response = response;
                throw error;
            }
            return response.json();
        })
        .then((data) => {
            return dispatch ({
                type: 'updateMedList',
                data: {
                    list: data.allMeds
                }
            });
        })
        .catch((error) => {
            console.error(error);
        });
    }
};

// Get a list of medication history
let fetchHistory = () => {
    return (dispatch) => {
        let url = '/medication/history';
        let request = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        };
        return fetch(url, request)
        .then((response) => {
            if (response.status < 200 || response.status >= 300) {
                let error = new Error(response.statusText);
                error.response = response;
                throw error;
            }
            return response.json();
        })
        .then((data) => {
            return dispatch ({
                type: 'updateMedList',
                data: {
                    list: data.doseHistory
                }
            });
        })
        .catch((error) => {
            console.error(error);
        });
    }
};

// Add a new medication to the database
let addMed = (name, dosage, numDoses, firstDose, instructions, precautions) => {
    return (dispatch) => {
        let url = '/medication/new';
        let request = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                name: name,
                dosage: dosage,
                numDoses: numDoses,
                firstDose: firstDose,
                instructions: instructions,
                precautions: precautions
            })
        };
        return fetch(url, request)
        .then((response) => {
            if (response.status < 200 || response.status >= 300) {
                let error = new Error(response.statusText);
                error.response = response;
                throw error;
            }
            return response.json();
        })
        .then((data) => {
            return dispatch ({
                type: 'updateMedDetails',
                data: data
            });
        })
        .catch((error) => {
            console.error(error);
        });
    }
};

// Add a new entry to the medication history
let addHistory = (id) => {
    return (dispatch) => {
        let url = `/history/new/${id}`;
        let request = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        };
        return fetch(url, request)
        .then((response) => {
            if (response.status < 200 || response.status >= 300) {
                let error = new Error(response.statusText);
                error.response = response;
                throw error;
            }
            return response.json();
        })
        .then((data) => {
            console.log('History added successfully');
        })
        .catch((error) => {
            console.error(error);
        });
    }
};

// Get the details for a particular medication
let selectMed = (id) => {
    return (dispatch) => {
        let url = `/medication/${id}`;
        let request = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        };
        return fetch(url, request)
        .then((response) => {
            if (response.status < 200 || response.status >= 300) {
                let error = new Error(response.statusText);
                error.response = response;
                throw error;
            }
            return response.json();
        })
        .then((data) => {
            return dispatch ({
                type: 'updateMedDetails',
                data: data
            });
        })
        .catch((error) => {
            console.log(error);
        });
    }
};

// Reset state for medication details
let deselectMed = () => {
    return {
        type: 'removeMedDetails',
        data: {}
    };
};

// Begin editing property of a selected medication
let editMed = (property) => {
    console.log('property', property);
    return {
        type: 'updateMedDetails',
        data: {
        	edit: property
        }
    };
};

// Cancel medication edit
let cancelEdit = () => {
    return {
        type: 'updateMedDetails',
        data: {}
    };
};

// Update medication details in the database
let submitEdit = (id, editProp, editVal) => {
    return (dispatch) => {
        let url = `/medication/update/${id}`;
        let request = {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                editProp: editProp,
                editVal: editVal
            })
        };
        return fetch(url, request)
        .then((response) => {
            if (response.status < 200 || response.status >= 300) {
                let error = new Error(response.statusText);
                error.response = response;
                throw error;
            }
            return response.json();
        })
        .then((data) => {
            console.log('data', data);
            return dispatch ({
                type: 'updateMedDetails',
                data: data
            });
        })
        .catch((error) => {
            console.error(error);
        });
    }
};

// Delete medication from the database
let deleteMed = (id) => {
    return (dispatch) => {
        let url = `/medication/delete/${id}`;
        let request = {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        };
        return fetch(url, request)
        .then((response) => {
            if (response.status < 200 || response.status >= 300) {
                let error = new Error(response.statusText);
                error.response = response;
                throw error;
            }
            return response.json();
        })
        .then((data) => {
            return dispatch ({
                type: 'removeMedDetails',
                data: {}
            });
        })
        .catch((error) => {
            console.error(error);
        });
    }
};

/*---------- EXPORTS ---------*/
exports.fetchSchedule = fetchSchedule;
exports.fetchMeds = fetchMeds;
exports.fetchHistory = fetchHistory;
exports.addMed = addMed;
exports.addHistory = addHistory;
exports.selectMed = selectMed;
exports.deselectMed = deselectMed;
exports.editMed = editMed;
exports.cancelEdit = cancelEdit;
exports.submitEdit = submitEdit;
exports.deleteMed = deleteMed;