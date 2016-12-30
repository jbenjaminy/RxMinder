/*---------- DEPENDENCIES ----------*/

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const knex = require('./backend/database/connect')


/*--------- EXPRESS CONFIG ----------*/

// Serve the static frontend files
app.use(express.static('./build'));

// Use JSON Parser everywhere
app.use(jsonParser);

// CORs handling
app.use((request, response, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});


/*---------- DATABASE QUERIES ----------*/

// Select all medication entries from medication table and separate out the ones that are due to be taken
app.get('/medication', jsonParser, (request, response) => {
	let time = new Date().getTime() / 1000;
	let dueMeds = [];
	let upcomingMeds = [];
	knex.select()
        .from('medication')
        .orderBy('next_dose_secs')
        .then((data) => {
        	data.forEach((med) => {
        		if (time > next_dose_secs) {
        			dueMeds.push(med);
        		} else {
        			upcomingMeds.push(med);
        		}
        	});
        	return response.status(200).json({
        		dueMeds: dueMeds, upcomingMeds: upcomingMeds
        	});
        })
        .catch((error) => {
            response.status(500).json({
            	error: error
            });
        });
)};

// Select all medication entries from medication table
app.get('/medication/all', jsonParser, (request, response) => {
    knex.select()
        .from('medication')
        .orderBy('name')
        .then((data) => {
            return response.status(200).json({
                allMeds: data
            });
        })
        .catch((error) => {
            response.status(500).json({
                error: error
            });
        });
)};

// Select the details of a specific medication by id
app.get('/medication/:id', jsonParser, (request, response) => {
	let id = request.params.id;
	knex.select()
        .from('medications')
        .where({ id: id })
        .returning(['id', 'name', 'dosage', 'num_doses', 'frequency', 'next_dose_secs', 'next_dose_date', 'instructions', 'precautions'])
        .then((medication) => {
            return response.status(200).json({
            	id: medication.id, name: medication.name, dosage: medication.dosage, frequency: medication.frequency, numDoses: medication.num_doses, nextDoseSecs: medication.next_dose_secs, nextDoseDate: medication.next_dose_date, instructions: medication.instructions, precautions: medication.precautions
            });
        })
        .catch((error) => {
            response.status(500).json({
            	error: error
            });
        });
});

// Select all past doses from dose_history table
app.get('/medication/history', jsonParser, (request, response) => {
	knex.select()
        .from('doseHistory')
        .orderBy('next_dose_secs', 'desc')
        .returning(['id', 'med_name', 'med_id', 'med_dosage', 'when_taken'])
        .then((data) => {
        	return response.status(200).json({
        		doseHistory: data
        	});
        })
        .catch((error) => {
            response.status(500).json({
            	error: error
            });
        });

})

// Add a new medication to the medication table
app.post('/medication/new', jsonParser, (request, response) => {
	let name = request.body.name;
	let dosage = request.body.dosage;
	let numDoses = request.body.numDoses;
	let firstDose = request.body.firstDose;
	let instructions = request.body.instructions;
	let precautions = request.body.precautions;

	let frequency = Math.floor(24 / numDoses);
	frequecy = 3600 * frequency;
	firstDose = 3600 * firstDose;
	let time = new Date().getTime() / 1000;
	let nextDoseSecs = firstDose + time;
	let nextDoseDate = new Date(0);
	nextDoseDate.setUTCSeconds(nextDoseSecs);

	knex.insert({ name: name, dosage: dosage, num_doses: numDoses, frequency: frequency, next_dose_secs: nextDoseSecs, next_dose_date: nextDoseDate, instructions: instructions, precautions: precautions })
        .returning(['id', 'name', 'dosage', 'num_doses', 'frequency', 'next_dose_secs', 'next_dose_date', 'instructions', 'precautions'])
        .into('medication')
        .then((data) => {
            return response.status(201).json({
            	id: data[0].id, name: data[0].name, dosage: data[0].dosage, numDoses: data[0].num_doses, frequency: data[0].frequency, nextDoseSecs: data[0].next_dose_secs, nextDoseDate: data[0].next_dose_date, instructions: data[0].instructions, precautions: data[0].precautions
            });
        })
        .catch((error) => {
            response.status(500).json({
            	error: error
            });
        });
});

// Add a new row to the dose_history table
app.post('/history/new/:id', jsonParser, (request, response) => {
	let id = request.params.id;
	const promise = selectMed(id);
    promise.then((data) => {
		knex.insert({ med_id: data.medId, med_name: data.medName, med_dosage: data.medDosage
        	.into('dose_history')
        	.then((data) => {
            return response.status(201).json({
            	result: 'Dose added to history successfully.'
	        })
	        .catch((error) => {
	            response.status(500).json({
	            	error: error
	            });
	        });
	});
    let selectMed = (id) => {
        return new Promise((resolve, reject) => {
			knex.select()
				.from('medication')
				.where({ id: id })
				.returning(['id', 'name', 'dosage'])
				.then((medication) => {
					resolve({
						'medId': id, 'medName': name, 'medDosage': dosage
					});
				})
				.catch((error) => {
					reject({
						error: error
					});
				});
		});
	}
});

// Edit the details of an existing medication
app.put('/medication/update/:id', jsonParser, (request, response) => {
	let column = request.body.editProp;
	let value = request.body.editVal;
	knex.('medication')
		.update({column: value})
		.where({id: id})
		.returning(['id', 'name', 'dosage', 'num_doses', 'frequency', 'next_dose_secs', 'next_dose_date', 'instructions', 'precautions'])
		.then((medication) => {
			return response.status(200).json({
                result: 'Medication edited successfully.'
			})
		})
		.catch((error) => {
            response.status(500).json({
            	error: error
            });
        });
});

// Delete a medication from the medication table
app.delete('/medication/:id', jsonParser, (request, response) => {
	let id = request.params.id;
    const promise = deleteHistory(id);
    promise.then((id) => {
    	knex.delete()
			.from('medication')
			.where({ id: id })
			.then((data) => {
				return response.status(200).json({result: 'Medication deleted successfully.'});
			})
			.catch((error) => {
				response.status(500).json({
            		error: error
            	});
			});
    });

    let deleteHistory = (id) => {
        return new Promise((resolve, reject) => {
			knex.delete()
				.from('dose_history')
				.where({ med_id: id })
				.then((data) => {
					resolve(id);
				})
				.catch((error) => {
					reject({
						error: error
					});
				});
		});
	}
});

/*---------- RUN SERVER FUNCTION ----------*/

function runServer(callback) {
    let PORT = process.env.PORT || 8080;
    app.listen(PORT, () => {
        console.log(`Listening on localhost: ${PORT}`);
        if (callback) {
            callback();
        }
    });
}

if (require.main === module) {
    runServer((err) => {
        if (err) {
            throw new Error(err);
        }
    });
}