module.exports = {
  /*
   ** Headers of the page
   */
  head: {
    title:
      "Bob, votre compagnon personnel pour la création de dossiers locatifs sécurisés",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content:
          "Télécharger l’application Bob sur Iphone, Ipod Touch et Ipad, un compagnon personnel vous permettant de stocker et organiser vos documents locatifs en toutes sécurité, de créer des dossier personnalisé et de les envoyer à des propriétaire et le tout avec simplicité. Bob vous guide et vous accompagne afin de ne jamais oublié un seul document ! Plusieurs catégories sont à votre disposition pour disposer vos documents par thème et ainsi ne pas vous perdre lors de la constitution de votre dossiers locatif. Intuitif, simple et sécurisé Bob vous permettra de mettre en avant votre dossier pour vous différencier des autre candidat."
      }
    ],
    link: [{ rel: "icon", type: "image/png", href: "/favicon.png" }]
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
  modules: ["@nuxtjs/axios", "@nuxtjs/auth", "@nuxtjs/style-resources"],
  styleResources: {
    scss: ["@/assets/scss/styles.scss"]
  },

  /*
   ** Style
   */
  css: ["@/assets/scss/styles.scss"],

  auth: {
    // Options
    redirect: {
      login: "/admin/login",
      logout: "/admin/login",
      home: "/admin/user/"
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
