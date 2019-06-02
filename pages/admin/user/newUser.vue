<template>
  <section class="edit-page">
    <div class="modal__page">
      <p class="modal__title">Création d'un nouvel utilisateur</p>
      <form>
        <div class="container__field">
          <label for="telephone">
            Numéro de téléphone
            <sup>*</sup> :
          </label>
          <input
            class="input-modal"
            v-validate="'required'"
            type="text"
            id="telephone"
            name="phone_number"
            placeholder="+33..."
            v-model="newUser.phone_number"
          >
        </div>
        <span>{{ errors.first('phone_number') }}</span>
        <div class="container__field">
          <label for="lastName">Nom :</label>
          <input
            class="input-modal"
            type="text"
            id="lastName"
            name="lastName"
            v-model="newUser.lastName"
          >
        </div>
        <div class="container__field">
          <label for="firstName">Prénom :</label>
          <input
            class="input-modal"
            type="text"
            id="firstName"
            name="firstName"
            v-model="newUser.firstName"
          >
        </div>
        <div class="container__field">
          <label for="email">E-mail :</label>
          <input class="input-modal" type="email" id="email" name="email" v-model="newUser.email">
        </div>
        <div class="container__field">
          <label for="birthdate">Date de naissance :</label>
          <input
            class="input-modal"
            type="date"
            id="birthdate"
            name="birthdate"
            v-model="newUser.birthdate"
          >
        </div>
        <div class="container__field">
          <label for="adminAccount">Administrateur :</label>
          <input
            class="input-modal"
            v-validate
            ref="adminAccount"
            type="checkbox"
            id="adminAccount"
            name="adminAccount"
            v-model="newUser.admin"
          >
        </div>
        <div class="container__field" v-if="newUser.admin">
          <label for="password">Si oui, définissez un mot de passe :</label>
          <input
            class="input-modal"
            v-validate="'required'"
            name="password"
            type="password"
            placeholder="Password"
            ref="password"
            v-model="newUser.password"
          >
        </div>
        <div class="container__field" v-if="newUser.admin">
          <label for="passwordChecked">Confirmez votre mot de passe :</label>
          <input
            class="input-modal"
            v-validate="'required|confirmed:password'"
            name="password_confirmation"
            type="password"
            placeholder="Password, Again"
            data-vv-as="password"
            v-model="newUser.password_confirmation"
          >
        </div>
        <div class="alert alert-danger" v-show="errors.any()">
          <div v-if="errors.has('password')">{{ errors.first('password') }}</div>
          <div
            v-if="errors.has('password_confirmation')"
          >{{ errors.first('password_confirmation') }}</div>
        </div>
        <div class="container__buttons">
          <button class="button--action" v-bind:disabled="!submitable" @click="createUser">Valider</button>
          <nuxt-link class="button--cancel" to="/admin/user">Annuler</nuxt-link>
        </div>
      </form>
    </div>
  </section>
</template>

<script>
import { VeeValidate } from "vee-validate";

export default {
  data() {
    return {
      //initialisation des données du formulaire pour créer un nouvel utilisateur
      newUser: {
        phone_number: "",
        lastName: "",
        firstName: "",
        email: "",
        birthdate: "",
        admin: false,
        password: undefined, //undefined pour ne rien envoyer à la création d'un user normal
        password_confirmation: undefined
      }
    };
  },
  watch: {
    admin(newValue, oldValue) {
      //Vérifie si la case est coché pour créer un compte admin
      if (this.admin == false) {
        this.newUser.password = undefined;
        this.newUser.password_confirmation = undefined;
      }
    }
  },
  computed: {
    hasError() {
      //Vérifie si les champs obligatoire sont rempli
      return this.errors.all().length > 0;
    },
    submitable() {
      //Vérifie si le mot de passe est entré et si les deux mots de passe sont identiques
      //pour ne pas envoyer un mauvais mot de passe à l'API
      if (this.newUser.admin && !this.errors.first("password_confirmation")) {
        return (
          this.newUser.password != undefined &&
          this.newUser.password_confirmation != undefined &&
          !this.hasError
        );
      }
      //Vérifie si le téléphone est rempli pour envoyer le formulaire avec les champs requis
      return this.newUser.phone_number != "" && !this.hasError;
    },
    admin() {
      return this.newUser.admin;
    }
  },
  methods: {
    createUser: function() {
      //Créer le nouvel utilisateur à l'API
      this.$axios.$post("/api/user", this.newUser).then(response => {
        window.location.replace("/admin/user");
      });
    }
  }
};
</script>

<style lang="scss">
.modal {
  &__title {
    font-size: 20px;
    font-weight: 500;
    text-align: center;
    padding-bottom: 20px;
  }

  .button--action {
    display: block;
    margin: 20px auto 0;
  }
}

#fadminAccount {
  margin-right: 7px;
}
</style>

