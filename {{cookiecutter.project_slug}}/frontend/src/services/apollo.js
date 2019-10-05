import Vue from 'vue'

import store from '../store'
import CONSTANTS from './parameters'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import VueApollo from 'vue-apollo'
import { concat, ApolloLink } from 'apollo-link'

const httpLink = new HttpLink({
  uri: CONSTANTS.BASE_URL + 'graphql'
})

const authMiddleware = new ApolloLink((operation, forward) => {
  var token = store.getters['UserModule/token']
  if (token) {
    operation.setContext({
      headers: {
        authorization: `JWT ${token}`
      }
    })
  }
  return forward(operation)
})

const apolloClient = new ApolloClient({
  link: concat(authMiddleware, httpLink),
  cache: new InMemoryCache(),
  connectToDevTools: true
})

const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
  defaultOptions: {
    $query: {
      loadingKey: 'loading',
      fetchPolicy: 'cache-and-network'
    }
  },
  errorHandler (error) {
    if (error.message === 'GraphQL error: Signature verification failed' ||
        error.message === 'GraphQL error: Signature has expired') {
      store.commit('UserModule/LOGOUT_USER')
    }
  }
})

Vue.use(VueApollo)

export default apolloProvider
