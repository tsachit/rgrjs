import express from 'express';
import fs from 'fs';
import dotenv from 'dotenv';
import {MongoClient} from 'mongodb';
import GraphQLHTTP from 'express-graphql';
import {graphql} from 'graphql';
import {introspectionQuery} from 'graphql/utilities';

import Schema from './data/schema';

dotenv.config();

const app = express();

app.use(express.static('public'));

(async() => {

    const client = await MongoClient.connect(process.env.MONGO_URL, { useNewUrlParser: true });

    if (!client) {
        return;
    }

    const db = client.db();
    const schema = Schema(db);

    // To play with graph QL interface
    app.use('/graphql', GraphQLHTTP({
        schema,
        graphiql: true
    }));

    app.listen(5000, () => console.log('listening on port 5000'));

    // Generate schema.json(for relay)
    const json = await graphql(schema, introspectionQuery);
    fs.writeFile('./data/schema.json', JSON.stringify(json, null, 2), err => {
        if(err) throw err;

        console.log("JSON schema created");
    });

})();

// app.get("/data/links", (req, res) => {
//     db.collection("links").find({}).toArray((err, links) => {
//         if(err) throw err;

//         res.json(links);
//     });
// });