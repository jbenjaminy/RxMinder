let initialState = {
	meds: {
    all: [],
		upcoming: [],
		due: [],
		history: [],
	},
	medDetails: {
    id: '',
    name: '',
    dosage: '',
    frequency: '',
    nextDose: '',
    instructions: '',
    precautions: '',
    edit: ''
	},
	notifications: []
};

function reducer(state=initialState, action) {
	switch(action.type) {
  		case 'updateMedsList': {
  			return Object.assign({}, state, {
  			});
    	}
    	case 'updateNotifications': {
    		return Object.assign({}, state, {
  			});
    	}
    	case 'selectMeds': {
    		return Object.assign({}, state, {
  			});
    	}
    	default: {
      		return state;
    	}
    }
}

export default reducer;
