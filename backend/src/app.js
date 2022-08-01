import express from 'express';
import morgan from 'morgan';
import firebase from './firebase.js';

const app = express();

app.use(morgan('dev'));

app.get('/', async (req, res) => {
	const querySnapshot = await firebase.db.collection('craftsman').get();
	console.log(querySnapshot.docs[0].data());
	res.send('Hello world');
});

export { app as default };
