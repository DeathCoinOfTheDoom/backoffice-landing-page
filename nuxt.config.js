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
  plugins: [
    { src: "~/plugins/smart-table", ssr: false },
    { src: "~plugins/vee-validate", ssr: true }
  ],
  /*
   ** Modules
   */
  modules: ["@nuxtjs/axios", "@nuxtjs/auth"],

  auth: {
    // Options
    redirect: {
      login: "/admin/login",
      logout: "/admin/login",
      home: "/admin/"
    },
    strategies: {
      local: {
        endpoints: {
          login: {
            url: "/api/auth/signin",
            method: "post",
            propertyName: "token"
          },
          logout: { url: "/api/auth/logout", method: "get" },
          user: {
            url: "/api/auth/user",
            method: "get",
            propertyName: "data.attributes"
          }
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
    baseURL: "http://104.248.229.222",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    }
  }
};
