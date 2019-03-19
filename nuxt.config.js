module.exports = {
  /*
   ** Headers of the page
   */
  head: {
    title: "crud",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "Nuxt.js project" }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },
  /*
   ** Customize the progress bar color
   */
  loading: { color: "#3B8070" },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** Run ESLint on save
     */
    extend(config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: "pre",
          test: /\.(js|vue)$/,
          loader: "eslint-loader",
          exclude: /(node_modules)/
        });
      }
    },
    vendor: ["axios"]
  },
  /*
   ** Plugins
   */
  plugins: [{ src: "~/plugins/smart-table", ssr: false }],
  /*
   ** Modules
   */
  modules: ["@nuxtjs/axios", "@nuxtjs/auth"],

  auth: {
    // Options
    redirect: {
      logout: "/login"
    },
    strategies: {
      local: {
        endpoints: {
          login: { url: "/api/signin", method: "post", propertyName: "token" }
          //user: { url: '/api/auth/user', method: 'get', propertyName: 'user' }
        }
        // tokenRequired: true,
        // tokenType: 'bearer',
      }
    },
    resetOnError: true
  },

  /*
   ** Router
   */
  router: {
    middleware: ["auth"]
  },

  /*
   ** Router
   */
  axios: {
    baseURL: "http://104.248.229.222"
  }
};
