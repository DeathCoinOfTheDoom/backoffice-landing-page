<template>
  <div class="modal__background">
    <div class="modal delete">
      <p>
        Êtes-vous sûr de vouloir supprimer
        <span
          class="text-bold"
        >{{this.userFirstName}} {{this.userLastName}}</span> ? Cette action sera définitive.
      </p>
      <div class="container__buttons">
        <button class="button--action" @click="deleteUser">Valider</button>
        <button class="button--cancel" @click.prevent="cancelButton">Annuler</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DeleteUser",
  props: ["userId", "userFirstName", "userLastName"],
  data() {
    return {
      showPopup: true
    };
  },
  methods: {
    cancelButton: function() {
      this.$emit("closed");
    },
    /**
     * Supprime de l'API l'utilisateur sélectionné
     * @param {number} userId - user ID to delete
     */
    deleteUser(userId) {
      this.$axios.$delete("/api/user/" + this.userId).then(response => {
        //Recharge la page pour actualiser les utilisateurs existant
        window.location.reload(true);
      });

      // Ensuite ferme la popup
      this.$emit("closed");
    }
  }
};
</script>

<style lang="scss">
.delete {
  p {
    text-align: center;
  }
}
</style>

