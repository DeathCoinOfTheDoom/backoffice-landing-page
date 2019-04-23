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
          v-validate="'required'"
          type="text"
          id="telephone"
          name="phone_number"
          placeholder="+33..."
          v-model="newUser.phone_number"
        >
      </div>
      <span>{{ errors.first('phone_number') }}</span>
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
        <label for="adminAccount">Administrateur</label>
        <input
          v-validate
          ref="adminAccount"
          type="checkbox"
          id="adminAccount"
          name="adminAccount"
          v-model="newUser.admin"
        >
      </div>
      <div class="label" v-if="newUser.admin">
        <label for="password">Si oui, définissez un mot de passe</label>
        <input
          v-validate="'required'"
          name="password"
          type="password"
          placeholder="Password"
          ref="password"
          v-model="newUser.password"
        >
      </div>
      <div class="label" v-if="newUser.admin">
        <label for="passwordChecked">Confirmez votre mot de passe</label>
        <input
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
        <div v-if="errors.has('password_confirmation')">{{ errors.first('password_confirmation') }}</div>
      </div>
    </form>
    <button v-bind:disabled="!submitable" @click="createUser">Valider</button>
  </section>
</template>

<script>
import { VeeValidate } from "vee-validate";

export default {
  data() {
    return {
      newUser: {
        phone_number: "",
        lastName: "",
        firstName: "",
        email: "",
        birthdate: "",
        admin: false,
        password: undefined,
        password_confirmation: undefined
      }
    };
  },
  watch: {
    admin(newValue, oldValue) {
      if (this.admin == false) {
        this.newUser.password = undefined;
        this.newUser.password_confirmation = undefined;
      }
    }
  },
  computed: {
    hasError() {
      return this.errors.all().length > 0;
    },
    submitable() {
      if (this.newUser.admin && !this.errors.first("password_confirmation")) {
        return (
          this.newUser.password != undefined &&
          this.newUser.password_confirmation != undefined &&
          !this.hasError
        );
      }
      return this.newUser.phone_number != "" && !this.hasError;
    },
    admin() {
      return this.newUser.admin;
    }
  },
  methods: {
    createUser: function() {
      this.$axios
        .$post("http://104.248.229.222/api/user", this.newUser)
        .then(response => {
          // handle success
          window.location.replace("/admin/user");
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

