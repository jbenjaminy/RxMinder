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
    numDoses: ''
    nextDoseSecs: '',
    nextDoseDate: '',
    instructions: '',
    precautions: '',
    edit: ''
	},
	notifications: []
};

function reducer(state=initialState, action) {
	switch(action.type) {
  		case 'updateMedList': {
  			return Object.assign({}, state, {
  			});
    	}
    	case 'updateMedDetails': {
        let id = action.data.id || state.medDetails.id;
        let name = action.data.name || state.medDetails.name;
        let dosage = action.data.dosage || state.medDetails.dosage;
        let numDoses = action.data.numDoses || state.medDetails.numDoses;
        let nextDoseSecs = action.data.nextDoseSecs || state.medDetails.nextDoseSecs;
        let nextDoseDate = action.data.nextDoseDate || state.medDetails.nextDoseDate;
        let instructions = action.data.instructions || state.medDetails.instructions;
        let precautions = action.data.precautions || state.medDetails.precautions;
        let edit = action.data.edit || state.medDetails.edit;
    		return Object.assign({}, state, {
          medDetails: {
            id: id,
            name: name,
            dosage: dosage,
            numDoses: numDoses,
            appliedFilters: appliedFilters,
            nextDoseSecs: nextDoseSecs,
            nextDoseDate: nextDoseDate,
            instructions: instructions,
            precautions: precautions,
            edit: edit
          },
  			});
    	}
      case 'updateNotifications': {
        return Object.assign({}, state, {
        });
      }
    	default: {
      		return state;
    	}
    }
}

export default reducer;
