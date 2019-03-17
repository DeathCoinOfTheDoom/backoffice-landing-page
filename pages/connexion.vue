<template>
  <section class="container">
    <!-- <div>page de connexion à venir</div> -->
    <form action method id class="container-form_connexion">
      <div class="label">
        <label for="email">Adresse mail</label>
        <input type="email" id="email" name="email" value>
      </div>
      <div class="label">
        <label for="password">Mot de passe</label>
        <input type="password" id="password" name="password" value>
      </div>
    </form>
    <button type="submit" form value @click="login">Connexion</button>
  </section>
</template>

<script>
import axios from "axios";

export default {
  methods: {
    login: function() {
      axios
        .post("http://104.248.229.222/api/signin", {
          email: email.value,
          password: password.value
        })
        .then(response => {
          sessionStorage.setItem("token", response.data.token);
          this.$nuxt.$router.push({ path: "/" });
        });
    }
  }
};
</script>

<style>
.container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  flex-direction: column;
}

.container-form_connexion {
  width: 400px;
}

.container-form_connexion .label label {
  width: 50%;
  text-align: left;
}

button {
  margin-top: 40px;
}
</style>

