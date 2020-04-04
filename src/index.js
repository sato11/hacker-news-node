const { GraphQLServer } = require('graphql-yoga');

const links = [
  {
    id: 'link-0',
    url: 'www.howtographql.com',
    description: 'Fullstack tutorial for GraphQL',
  },
];

let idCount = links.length;

const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews Clone`,
    feed: () => links,
  },
  Mutation: {
    post: (parent, args) => {
      const link = {
        id: `link-${idCount++}`,
        description: args.description,
        url: args.url,
      };
      links.push(link);
      return link;
    },
    updateLink: (parent, args) => {
      const link = links.find(l => l.id === args.id);
      if (!link) return null;
      const index = links.indexOf(link);
      links.splice(index, 1);
      const updatedLink = {
        id: link.id,
        url: args.url || link.url,
        description: args.description || link.description
      };
      links.push(updatedLink);
      return updatedLink;
    },
    deleteLink: (parent, args) => {
      const link = links.find(l => l.id === args.id);
      if (!link) return null;
      const index = links.indexOf(link);
      links.splice(index, 1);
      return link;
    },
  },
};

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
});

server.start(() => console.log(`Server is running on http://localhost:4000`));
