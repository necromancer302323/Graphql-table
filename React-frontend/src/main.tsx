import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
const httpLink = new HttpLink({
  uri: 'http://localhost:4000/graphql',
   credentials: 'include'
});
const authLink = setContext((operation) => {
  const operationName = operation.operationName;
  if (operationName === 'Signin' || operationName === 'Signup') {
    return {
    }
  }
  return {
    headers: {
      authorization: 'hello',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ApolloProvider client={client}>
    <App />
    </ApolloProvider>
  </StrictMode>,
)
