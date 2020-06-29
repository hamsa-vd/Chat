const { cors, bodyParser, express } = require('./server/requires');
const { router } = require('./server/router');
const app = express();
const onConnnect = require('./server/socket');
app.use(bodyParser.json());
app.use(cors());
app.use(router);

const port = process.env.PORT || 4200;
const server = app.listen(port, () => console.log(`app is listening at port ${port}....`));
const io = require('socket.io')(server);
io.on('connect', onConnnect);
