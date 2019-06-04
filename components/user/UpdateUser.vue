<template>
  <div class="modal__background">
    <div class="modal update">
      <form>
        <div class="container__field">
          <label for="prenom">Prénom :</label>
          <input
            class="input-modal"
            type="text"
            id="prenom"
            name="prenom"
            v-model="editUser.firstName"
          >
        </div>
        <div class="container__field">
          <label for="nom">Nom :</label>
          <input class="input-modal" type="text" id="nom" name="nom" v-model="editUser.lastName">
        </div>
        <div class="container__field">
          <label for="telephone">Numéro de téléphone :</label>
          <input
            class="input-modal"
            type="text"
            id="telephone"
            name="Telephone"
            placeholder="+33..."
            v-model="editUser.phone_number"
          >
        </div>
        <div class="container__field">
          <label for="email">Email :</label>
          <input class="input-modal" type="email" id="email" name="email" v-model="editUser.email">
        </div>
        <div class="container__field">
          <label for="birthdate">Date de naissance :</label>
          <input
            class="input-modal"
            type="date"
            id="birthdate"
            name="birthdate"
            v-model="editUser.birthdate"
          >
        </div>
        <div class="container__field">
          <label for="adminAccount">Administrateur :</label>
          <input
            class="input-modal"
            type="checkbox"
            id="adminAccount"
            name="adminAccount"
            v-model="editUser.admin"
          >
        </div>
        <div v-if="editUser.admin">
          <div class="container__field">
            <label for="password">Modifier le mot de passe :</label>
            <input class="input-modal" type="password" v-model="editUser.password">
          </div>
          <div class="container__field">
            <label for="password_confirmation">Confirmer le mot de passe :</label>
            <input class="input-modal" type="password" v-model="editUser.password_confirmation">
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
      //Initialise les données du formulaire de l'utilisateur sélectionné
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
      //Spécifique à l'API
      const headers = {
        "Content-Type": "application/x-www-form-urlencoded"
      };

      this.$axios
        .$put("/api/user/" + this.user.id, this.editUser, headers)
        .then(response => {
          //Retour au tableau de bord des utilisateurs
          window.location.replace("/admin/user");
        })
        .catch(error => {
          console.log(error);
        });
    },
    cancelUpdate() {
      //ferme la popup
      this.$emit("closedEdit");
    }
  }
};
</script>