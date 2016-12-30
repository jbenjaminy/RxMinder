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

// Select all medication entries from medication table
app.get('/medication', jsonParser, (request, response) => {
	knex.select()
        .from('messages')
        .where({ question_id: questionID })
        .returning('message_text', 'user_name', 'when_sent')
        .orderBy('when_sent')
        .then((messages) => {
            resolve({ messages: messages });
        }).catch((err) => {
            reject(err);
        });
)};

// Select the details of a specific medication by id
app.get('/medication/:id', jsonParser, (request, response) => {

});

// Select all past doses from dose_history table
app.get('/medication/history', jsonParser, (request, response) => {

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
	let nextDose = firstDose + time;
	} else if (hours.length === 1) {
		hours = `0${hours}`
	}
	let mins = time.getMinutes();
	let secs = time.getSeconds();
	nextDose = `${hours}:${mins}:${secs}`

	knex.insert({ name: name, dosage: dosage, num_doses: numDoses, frequency: frequency, next_dose: nextDose, instructions: instrucstions, precautions: precautions })
        .returning(['name', 'dosage', 'num_doses', 'next_dose', 'instructions', 'precautions'])
        .into('medication')
        .then((data) => {
            return response.status(201).json({
            	name: data[0].name, dosage: data[0].dosage, numDoses: data[0].num_doses, nextDose: data[0].next_dose, instructions: data[0].instrucstion, precautions: data[0].precautions
            });
        })
        .catch((error) => {
            response.status(500).json({'error: ' error});
        });
});

// Edit the details of an existing medication
app.put('/medication/update/:id', jsonParser, (request, response) => {
	let column = request.body.editProp;
	let value = request.body.editVal;

});

// Delete a medication from the medication table
app.delete('/medication/:id', jsonParser, (request, response) => {

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