<template>
  <section class="container">
    <p>Création d'un utilisateur</p>
    <form action method id class="container-form_edit">
      <div class="label">
        <label for="telephone">
          Numéro de téléphone
          <sup>*</sup>
        </label>
        <input
          type="text"
          id="telephone"
          name="phone_number"
          v-model="newUser.phone_number"
          required
        >
      </div>
      <div class="label">
        <label for="lastName">Nom</label>
        <input type="text" id="lastName" name="lastName" v-model="newUser.lastName">
      </div>
      <div class="label">
        <label for="firstName">Prénom</label>
        <input type="text" id="firstName" name="firstName" v-model="newUser.firstName">
      </div>
      <div class="label">
        <label for="email">Email</label>
        <input type="email" id="email" name="email" v-model="newUser.email">
      </div>
      <div class="label">
        <label for="birthdate">Date de naissance</label>
        <input type="date" id="birthdate" name="birthdate" v-model="newUser.birthdate">
      </div>
      <div class="label">
        <input type="checkbox" id="adminAccount" name="adminAccount" v-model="newUser.admin">
        <label for="adminAccount">Voulez-vous créer un compte administrateur ?</label>
      </div>
      <div class="label" v-if="newUser.admin">
        <label for="password">Si oui, définissez un mot de passe</label>
        <input type="password" id="password" name="password" v-model="newUser.password" required>
      </div>
      <div class="label" v-if="newUser.admin">
        <label for="passwordChecked">Confirmez votre mot de passe</label>
        <input
          type="passwordChecked"
          id="passwordChecked"
          name="passwordChecked"
          v-model="newUser.password"
          required
        >
      </div>
    </form>
    <button type="submit" form @click="newTest">Valider</button>
  </section>
</template>

<script>
import AppLogo from "~/components/AppLogo.vue";

export default {
  components: {
    AppLogo
  },
  data() {
    return {
      newUser: {
        phone_number: "",
        lastName: "",
        firstName: "",
        email: "",
        birthdate: "",
        admin: false,
        password: null
      }
    };
  },
  methods: {
    newTest: function() {
      // if (this.newUser.phone_number.value != "") {
      //   console.log("he");
      // } else {
      //   console.log("nope");
      // }

      const axios = require("axios");
      this.$axios
        .$post("http://104.248.229.222/api/user", this.newUser)
        .then(response => {
          // handle success
          window.location.replace("/admin");
        });
    }
  }
};
</script>

<style scoped>
.container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
}

.container-form_edit {
  width: 700px;
}

.label {
  display: flex;
  /* align-items: flex-start; */
  align-items: center;
  margin: 5px 0px;
}

.label label {
  width: 50%;
  text-align: left;
}

.label input {
  width: 40%;
}

input[type="checkbox"] {
  width: auto;
}

#adminAccount {
  margin-right: 7px;
}

button {
  margin-top: 20px;
}

.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; /* 1 */
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>

