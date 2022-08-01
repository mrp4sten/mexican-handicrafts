import { Router } from 'express';
import firebase from '../firebase.js';

const router = Router();

router.get('/craftsman', async (req, res) => {
	const querySnapshot = await firebase.db.collection('craftsman').get();

	const artisans = querySnapshot.docs.map((doc) => ({
		id: doc.id,
		...doc.data(),
	}));

	res.send(artisans);
});

router.get('/craftsman/:id', async (req, res) => {
	const doc = await firebase.db
		.collection('craftsman')
		.doc(req.params.id)
		.get();
	console.log({
		id: req.params.id,
		...doc.data(),
	});
	res.send(doc.data());
});

router.post('/craftsman/new', async (req, res) => {
	const { name, lastname, address, phone_number } = req.body;

	try {
		await firebase.db.collection('craftsman').add({
			name,
			lastname,
			address,
			phone_number,
		});
	} catch (error) {
		console.error('caftsman not created, error: ', error);
		res.sendStatus(400);
	}
	res.sendStatus(201);
});

router.delete('/craftsman/:id', async (req, res) => {
	await firebase.db.collection('craftsman').doc(req.params.id).delete();
	res.sendStatus(200);
});

router.put('/craftsman/:id', async (req, res) => {
	const { id } = req.params;
	firebase.db.collection('craftsman').doc(id).update(req.body);
	res.sendStatus(200);
});

export default router;
