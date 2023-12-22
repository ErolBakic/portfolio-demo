// https://nuxt.com/docs/api/configuration/nuxt-config

import { resolve } from 'path';

export default defineNuxtConfig({
  devtools: { 
    enabled: true 
  },
  alias: {
    '@' : resolve( __dirname, '/' )
  },
  css: [
    '~/assets/scss/main.scss'
  ],
  runtimeConfig: {

    // --- Available to clientside ---
    public : {
      contentfulSpaceID : process.env.CONTENTFUL_SPACEID,
      contentfulEntryID : process.env.CONTENTFUL_ENTRYID
    },

    // --- Available to serverside ---

    // Contentful get API values
    contentfulCDAToken : process.env.CONTENTFUL_CDA_TOKEN,
    contentfulCPAToken : process.env.CONTENTFUL_CPA_TOKEN

  },
  routeRules:{
    '/case/kh': { redirect: process.env.KH_REDIR_MAIN },
    '/case/kh-doc': { redirect: process.env.KH_REDIR_DOC }
  }
});
