<template>
  <section class="container">
    <form action method id class="container-form_login">
      <div class="label">
        <label for="email">Adresse mail</label>
        <input type="email" id="email" name="email" value>
      </div>
      <div class="label">
        <label for="password">Mot de passe</label>
        <input type="password" id="password" name="password" value>
      </div>
      <div>{{this.errorMessage}}</div>
    </form>
    <button type="submit" form value @click="login">Se connecter</button>
  </section>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      errorMessage: ""
    };
  },
  methods: {
    login: function() {
      this.$auth
        .loginWith("local", {
          data: {
            email: email.value,
            password: password.value
          }
        })
        .catch(error => {
          this.errorMessage = error.response.data.error.title;
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
  text-align: center;
  flex-direction: column;
}

.container-form_login {
  width: 400px;
}

.container-form_login .label label {
  width: 50%;
  text-align: left;
}

button {
  margin-top: 40px;
}
</style>

