import express from 'express';
const cors = require('cors');
import getQueryOptions from './getQueryOptions';

const app = express();
const port = 8080;

app.use(cors());

app.listen(
    port,
    () => console.log(`Running on http://localhost:${port}/`)
);

// Extract organizationID from URL and return array of QueryOption
app.get('/organizationID/:organizationID', (req, res) => {
    const { organizationID } = req.params;
    const queryOptions = getQueryOptions(organizationID);
    res.status(200).send(queryOptions);
});