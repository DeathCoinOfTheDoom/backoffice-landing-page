<template>
  <section class="container">
    <img class="logo-backoffice" src="~assets/images/logo-bob.svg" alt>
    <form action method id class="container__form-login">
      <div class="field">
        <label for="email" class="text-bold">Adresse e-mail :</label>
        <input
          class="input-modal"
          type="email"
          id="email"
          name="email"
          placeholder="Adresse e-mail"
          value
        >
      </div>
      <div class="field">
        <label for="password" class="text-bold">Mot de passe :</label>
        <input class="input-modal" type="password" id="password" name="password" value>
      </div>
      <div>{{this.errorMessage}}</div>
      <button class="button--action" type="submit" form value @click="login">Se connecter</button>
    </form>
  </section>
</template>

<script>
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

<style lang="scss">
.container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  flex-direction: column;

  &__form-login {
    width: 400px;
    padding-top: 40px;

    label {
      display: inline-block;
      width: 130px;
      text-align: left;
    }
  }
}
</style>

