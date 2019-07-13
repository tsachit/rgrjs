import express from 'express';
import dotenv from 'dotenv';
import {MongoClient} from 'mongodb';
import GraphQLHTTP from 'express-graphql';

import schema from './data/schema';

dotenv.config();

const app = express();

app.use(express.static('public'));

let db;
MongoClient.connect(process.env.MONGO_URL, (err, client) => {
    if(err) throw err;

    db = client.db('rgrjs');

    // To play with graph QL interface
    app.use('/graphql', GraphQLHTTP({
        schema: schema(db),
        graphiql: true
    }));

    app.listen(5000, () => console.log('listening on port 5000'));

});

// app.get("/data/links", (req, res) => {
//     db.collection("links").find({}).toArray((err, links) => {
//         if(err) throw err;

//         res.json(links);
//     });
// });