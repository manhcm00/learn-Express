require('dotenv').config();

const express = require('express');
const csrf = require('csurf');
const app = express();
const mongoose = require('mongoose');
const csrfProtection = csrf({ cookie: true });
mongoose.connect(process.env.MONGO_URL, 
	{ 
		useNewUrlParser: true, 
		useUnifiedTopology: true 
	});

const userRoute = require('./routes/user.route');
const authRoute = require('./routes/auth.route');
const cookieParser = require('cookie-parser');
const productRoute = require('./routes/product.router');
const cartRoute = require('./routes/cart.route');
const transferRoute = require('./routes/trasfer.route');

const apiProductRoute = require('./api/routes/product.route');

const authMiddleware = require('./middlewares/auth.middleware');
const sessionMiddleware = require('./middlewares/session.middleware');

const port = 3001;

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.static('public'));
app.use(cookieParser(process.env.SESSION_SECRET));
app.use(sessionMiddleware);
app.use(csrf({ cookie: true }));

app.get('/', (req, res) =>
	res.render('index', {
		name: 'Micheal'
	})
);

app.use('/user', authMiddleware.requireAuth, userRoute);
app.use('/auth', authRoute);
app.use('/products', productRoute);
app.use('/cart', cartRoute);
app.use('/transfer', transferRoute);

app.use('./api', apiProductRoute);

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
