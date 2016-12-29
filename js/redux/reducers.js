let initialState = {
	meds: {
		upcoming: [],
		due: [],
		history: [],
	},
	medDetails: {
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
