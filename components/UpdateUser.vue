<template>
  <div class="background_update-user">
    <div class="container-_update-user">
      <form>
        <div class="label">
          <label for="prenom">Prénom</label>
          <input type="text" id="prenom" name="prenom" v-model="editUser.firstName">
        </div>
        <div class="label">
          <label for="nom">Nom</label>
          <input type="text" id="nom" name="nom" v-model="editUser.lastName">
        </div>
        <div class="label">
          <label for="telephone">Numéro de téléphone</label>
          <input
            type="text"
            id="telephone"
            name="Telephone"
            placeholder="+33..."
            v-model="editUser.phone_number"
          >
        </div>
        <div class="label">
          <label for="email">Email</label>
          <input type="email" id="email" name="email" v-model="editUser.email">
        </div>
        <div class="label">
          <label for="birthdate">Date de naissance</label>
          <input type="birthdate" id="birthdate" name="birthdate" v-model="editUser.birthdate">
        </div>
        <div class="label">
          <label for="adminAccount">Administrateur</label>
          <input type="checkbox" id="adminAccount" name="adminAccount" v-model="editUser.admin">
        </div>
        <div v-if="editUser.admin">
          <div class="label">
            <label for="password">Modifier le mot de passe</label>
            <input type="password" v-model="editUser.password">
          </div>
          <div class="label">
            <label for="password_confirmation">Confirmer le mot de passe</label>
            <input type="password" v-model="editUser.password_confirmation">
          </div>
        </div>
      </form>
      <button type="submit" form value @click="changedUser">Valider</button>
      <button @click="cancelUpdate">Annuler</button>
      <!-- <div class="line"></div>
      <form>
        <div v-if="editUser.attributes.admin">
          <p>compte admin</p>
          <div class="label">
            <label for="password">Modifier le mot de passe</label>
            <input type="password" v-model="editPassword.password">
          </div>
          <div class="label">
            <label for="password_confirmation">Reconfirmer le mot de passe</label>
            <input type="password" v-model="editPassword.password_confirmation">
          </div>
        </div>
      </form>
      <button type="submit" @click="changedPassword">Valider</button>
      <button @click="cancelUpdate">Annuler</button>-->
    </div>
  </div>
</template>

<script>
export default {
  props: ["user"],
  data() {
    return {
      editUser: {
        phone_number: this.user.attributes.phone_number,
        lastName: this.user.attributes.lastName,
        firstName: this.user.attributes.firstName,
        email: this.user.attributes.email,
        birthdate: this.user.attributes.birthdate,
        admin: this.user.attributes.admin,
        password: undefined,
        password_confirmation: undefined
      }
    };
  },
  computed: {},
  methods: {
    changedUser() {
      const axios = require("axios");

      const headers = {
        "Content-Type": "application/x-www-form-urlencoded"
      };

      this.$axios
        .$put(
          "http://104.248.229.222/api/user/" + this.user.id,
          this.editUser,
          headers
        )
        .then(response => {
          // handle success
          window.location.replace("/admin");
        })
        .catch(error => {
          console.log(error);
        });
    },
    cancelUpdate() {
      this.$emit("closedEdit");
    }
  }
};
</script>
<style>
.background_update-user {
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}

.container-_update-user {
  background: white;
  padding: 40px;
}
</style>