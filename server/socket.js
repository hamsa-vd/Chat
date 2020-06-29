const { mongodb } = require('./requires');
const { router } = require('./router');
const dbName = 'Chat';
const mongoClient = mongodb.MongoClient;
const mongoUrl = process.env.MONGO_URL;
const onConnect = (socket) => {
	console.log(socket.id, socket.handshake.time);

	//client on send  message

	socket.on('message', ({ username }) => {
		mongoClient.connect(mongoUrl, async (err, client) => {
			if (err) throw err;
			const db = client.db(dbName);
			const collection = db.collection('users');
			const document = await collection.findOne({ username: username });
			console.log(document);
		});
	});

	//client emit

	socket.on('create room', ({ room }) => console.log(room));

	socket.on('join room', ({ room }) => console.log(room));

	socket.on('add friend', ({ friend }) => console.log(friend));
	//server emits

	//disconnected

	socket.on('disconnect', () => console.log(socket.id + 'is disconnected'));
};

module.exports = onConnect;
