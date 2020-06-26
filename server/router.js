const { express, mongodb, bcrypt, jwt } = require('./requires');
const router = express.Router();
const { transporter, activateOptions, forgotOptions } = require('./nodemail');
const { tokenAuth } = require('./middleware');
const mongoClient = mongodb.MongoClient;
const objectId = mongodb.ObjectID;
const mongoUrl = process.env.MONGO_URL;
const dbName = 'forgot-password';
router.post('/api/register', (req, res) => {
	mongoClient.connect(mongoUrl, async (err, client) => {
		if (err) res.json({ status: false, msg: 'internal error try again', err });
		const db = client.db(dbName);
		const collection = db.collection('users');
		const emailcheck = await collection.findOne({ email: req.body.email });
		const namecheck = await collection.findOne({ username: req.body.username });
		if (!emailcheck)
			if (!namecheck)
				bcrypt.hash(req.body.password, 10, async function(err, hash) {
					if (err) res.json({ status: false, msg: 'internal error try again', err });
					await collection.insertOne({
						...req.body,
						password: hash,
						token: '',
						activated: false
					});
					const data = await collection.findOne({ email: req.body.email });
					await transporter.sendMail(activateOptions(req.body.email, data['_id']), (err, info) => {
						if (err) {
							collection.remove({ _id: data['_id'] });
							res.json({ status: false, msg: 'Unable to send email', err });
						} else
							res.status(201).json({ status: true, msg: 'successfully added and activation mail sent' });
					});
				});
			else {
				client.close();
				res.json({ status: false, msg: 'username is already taken' });
			}
		else {
			client.close();
			res.json({ status: false, msg: 'email already exists' });
		}
	});
});
router.post('/api/login', (req, res) => {
	mongoClient.connect(mongoUrl, async (err, client) => {
		if (err) res.json({ status: false, msg: 'internal error, refresh and try again', err });
		const db = client.db(dbName);
		const collection = db.collection('users');
		const hash = await collection.findOne({ username: req.body.username });
		if (hash)
			if (hash.activated)
				bcrypt.compare(req.body.password, hash.password, async function(err, result) {
					if (err) {
						client.close();
						res.status().json({ status: false, msg: 'invalid password' });
					}
					const token = jwt.sign({ username: req.body.username }, process.env.JWT_SECRET_KEY);
					await collection.updateOne({ username: req.body.username }, { $set: { token: token } });
					client.close();
					res.status(200).json({
						status: true,
						msg: 'successfully logged in',
						out: { username: req.body.username, token: token }
					});
				});
			else {
				client.close();
				res.json({ status: false, msg: 'activate your account' });
			}
		else {
			client.close();
			res.json({ status: false, msg: "username doesn't exist" });
		}
	});
});

router.get('/api/activate/:id', (req, res) => {
	mongoClient.connect(mongoUrl, async (err, client) => {
		if (err) res.json({ status: false, msg: 'refresh and try again', err });
		const db = client.db(dbName);
		const collection = db.collection('users');
		const data = await collection.findOne({ _id: new objectId(req.params.id) });
		if (data)
			collection.updateOne({ _id: new objectId(req.params.id) }, { $set: { activated: true } }, (err, result) => {
				if (err) {
					client.close();
					res.json({ status: false, msg: 'unable to activate account', err });
				}
				res.status(200).json({ status: true, msg: 'account successfully activated' });
			});
		else {
			client.close();

			res.json({ status: false, msg: 'unable to activate account' });
		}
	});
});
router.post('/api/forgot', (req, res) => {
	mongoClient.connect(mongoUrl, async (err, client) => {
		if (err) res.json({ status: false, msg: 'refresh and try again', err });
		const db = client.db(dbName);
		const collection = db.collection('users');
		const data = await collection.findOne({ email: req.body.email });
		if (data) {
			client.close();
			await transporter.sendMail(forgotOptions(req.body.email, data['_id']), (err, info) => {
				if (err) res.json({ status: false, msg: 'Unable to send email', err });
				else res.status(201).json({ msg: 'change password' });
			});
		} else {
			client.close();
			res.json({ status: false, msg: 'no such email is found' });
		}
	});
});

router.post('/api/changepass', (req, res) => {
	mongoClient.connect(mongoUrl, async (err, client) => {
		if (err) res.json({ status: false, msg: 'refresh and try again', err });
		const db = client.db(dbName);
		const collection = db.collection('users');
		const data = await collection.findOne({ _id: new objectId(req.body.id) });
		if (data) {
			bcrypt.hash(req.body.password, 10, async function(err, hash) {
				if (err) res.json({ status: false, msg: 'internal error, try again', err });
				collection.updateOne(
					{ _id: new objectId(req.body.id) },
					{ $set: { password: hash } },
					(err, result) => {
						client.close();
						if (err) res.json({ status: false, msg: 'unable to update account', err });
						res.status(200).json({ status: true, msg: 'password successfully updated' });
					}
				);
			});
		} else {
			client.close();
			res.json({ status: false, msg: 'no such id is found' });
		}
	});
});

router.get('/api/all', (req, res) => {
	mongoClient.connect(mongoUrl, async (err, client) => {
		if (err) res.json({ status: false, msg: 'refresh and try again', err });
		const db = client.db(dbName);
		const collection = db.collection('users');
		const data = await collection.find({}).toArray();
		client.close();
		res.json({ status: true, out: data });
	});
});

module.exports = { router };
