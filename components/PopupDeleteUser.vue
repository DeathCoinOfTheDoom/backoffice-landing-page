<template>
  <div class="background_confirm-delete">
    <div class="container-confirm_delete">
      <p>Êtes-vous sûr de vouloir supprimer {{this.userFirstName}} {{this.userLastName}} ? Une fois supprimer vous ne pourrez plus récupérer ses données</p>
      <button @click="deleteUser">Valider</button>
      <button class="cancel" @click.prevent="cancelButton">Annuler</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "PopupDeleteUser",
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
    deleteUser(userId) {
      const axios = require("axios");
      this.$axios
        .$delete("http://104.248.229.222/api/user/" + this.userId)
        .then(response => {
          // handle success
          window.location.reload(true);
        })
        .catch(error => {
          //console.log(error);
        });

      // ensuite ferme la popup
      this.$emit("closed");
    }
  }
};
</script>

<style>
.background_confirm-delete {
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

.container-confirm_delete {
  background: white;
  padding: 40px;
}

button {
  margin-top: 40px;
  cursor: pointer;
  outline: none;
}

.cancel {
  border: none;
  color: red;
  opacity: 0.8;
  font-weight: bold;
  padding: 0 1px;
  padding-bottom: 3px;
  border-bottom: 1px solid white;
  transition: 0.5s ease-in-out;
}

.cancel:hover {
  border-bottom: 1px solid red;
}
</style>

