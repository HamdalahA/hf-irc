import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import 'dotenv';

import routes from './routes';

const app = express();
const port = process.env.PORT || 8000;

app.set('port', port);

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
routes(app);

app.use(express.static('server/'));

app.listen(port);
console.log(`server has started on port: ${port}`);


export default app;
