let initialState = {
	meds: {
        list: [],
		due: []
	},
	medDetails: {
        id: '',
        name: '',
        dosage: '',
        numDoses: '',
        frequency: '',
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
            let list = action.data.list || state.meds.list;
            let due = action.data.due || state.meds.due;
  			return Object.assign({}, state, {
                meds: {
                    list: list,
                    due: due
                } 
  			});
    	}
    	case 'updateMedDetails': {
            let id = action.data.id || state.medDetails.id;
            let name = action.data.name || state.medDetails.name;
            let dosage = action.data.dosage || state.medDetails.dosage;
            let numDoses = action.data.numDoses || state.medDetails.numDoses;
            let frequency = action.data.frequency || state.medDetails.frequency;
            let nextDoseSecs = action.data.nextDoseSecs || state.medDetails.nextDoseSecs;
            let nextDoseDate = action.data.nextDoseDate || state.medDetails.nextDoseDate;
            let instructions = action.data.instructions || state.medDetails.instructions;
            let precautions = action.data.precautions || state.medDetails.precautions;
            let edit = action.data.edit || "";
    		return Object.assign({}, state, {
                medDetails: {
                    id: id,
                    name: name,
                    dosage: dosage,
                    numDoses: numDoses,
                    frequency: frequency,
                    nextDoseSecs: nextDoseSecs,
                    nextDoseDate: nextDoseDate,
                    instructions: instructions,
                    precautions: precautions,
                    edit: edit
                },
  			});
    	}
        case 'removeMedDetails': {
            return Object.assign({}, state, {
                medDetails: {
                    id: "",
                    name: "",
                    dosage: "",
                    numDoses: "",
                    frequency: "",
                    nextDoseSecs: "",
                    nextDoseDate: "",
                    instructions: "",
                    precautions: "",
                    edit: ""
                },
            });
        }
        case 'updateNotifications': {
            let notifications = state.notifications.slice();
            notifications.push(action.data.notification)
            return Object.assign({}, state, {
                notifications: notifications
            });
        }
    	default: {
      		return state;
    	}
    }
}

export default reducer;
