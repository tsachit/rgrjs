/* eslint-disable no-plusplus */
import { 
  GraphQLSchema, 
  GraphQLObjectType, 
  GraphQLList,
  GraphQLInt, 
  GraphQLString 
} from 'graphql';

const Schema = (db) => {

  const linkType = new GraphQLObjectType({
    name: 'Counter',
    fields: () => ({
      _id: { type: GraphQLString },
      title: { type: GraphQLString },
      url: { type: GraphQLString },
    })
  });

  const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
      name: 'Query',
      fields: () => ({
        links: {
          type: new GraphQLList(linkType),
          resolve: () => db.collection("links").find({}).toArray()
        }
      })
    })
    // mutation: new GraphQLObjectType({
    //   name: 'Mutation',
    //   fields: () => ({
    //     incrementCounter: {
    //       type: GraphQLInt,
    //       resolve: () => ++counter
    //     }
    //   })
    // })
  });

  return schema;
};

export default Schema;