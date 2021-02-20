import { ApolloClient, InMemoryCache } from '@apollo/client';

// 创建客户端
const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache(),
});

export { client };
