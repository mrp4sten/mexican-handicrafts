import express from 'express';
import morgan from 'morgan';
import routes from './routes/index.js';

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(routes);

export { app as default };
