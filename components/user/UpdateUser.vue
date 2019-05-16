<template>
  <div class="modal__background">
    <div class="modal update">
      <form>
        <div class="update__field">
          <label for="prenom">Prénom :</label>
          <input type="text" id="prenom" name="prenom" v-model="editUser.firstName">
        </div>
        <div class="update__field">
          <label for="nom">Nom :</label>
          <input type="text" id="nom" name="nom" v-model="editUser.lastName">
        </div>
        <div class="update__field">
          <label for="telephone">Numéro de téléphone :</label>
          <input
            type="text"
            id="telephone"
            name="Telephone"
            placeholder="+33..."
            v-model="editUser.phone_number"
          >
        </div>
        <div class="update__field">
          <label for="email">Email :</label>
          <input type="email" id="email" name="email" v-model="editUser.email">
        </div>
        <div class="update__field">
          <label for="birthdate">Date de naissance :</label>
          <input type="date" id="birthdate" name="birthdate" v-model="editUser.birthdate">
        </div>
        <div class="update__field">
          <label for="adminAccount">Administrateur :</label>
          <input type="checkbox" id="adminAccount" name="adminAccount" v-model="editUser.admin">
        </div>
        <div v-if="editUser.admin">
          <div class="update__field">
            <label for="password">Modifier le mot de passe :</label>
            <input type="password" v-model="editUser.password">
          </div>
          <div class="update__field">
            <label for="password_confirmation">Confirmer le mot de passe :</label>
            <input type="password" v-model="editUser.password_confirmation">
          </div>
        </div>
      </form>
      <div class="container__buttons">
        <button class="button--action" type="submit" form value @click="changedUser">Valider</button>
        <button class="button--cancel" @click="cancelUpdate">Annuler</button>
      </div>
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
  methods: {
    changedUser() {
      const headers = {
        "Content-Type": "application/x-www-form-urlencoded"
      };

      this.$axios
        .$put("/api/user/" + this.user.id, this.editUser, headers)
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
<style lang="scss">
.update {
  &__field {
    @include flexbox();
    @include align-items(center);
  }

  label {
    font-weight: bold;
  }

  input {
    width: 200px;
    height: 38px;
    font-size: 16px;
    color: $light-grey;
    border-radius: 10px;
    border: 1px solid $very-light-blue;
    padding: 10px;
    margin: 3px 0 3px 10px;
    background-color: transparent;

    &:focus {
      outline: none;
      color: $black;
      border: 1px solid $blue;
      transition: all 0.5s;
    }
  }
}
</style>