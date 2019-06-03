<template>
  <div class="modal__background">
    <div class="modal update-type">
      <div class="field">
        <label for="type">Modifier le nom du type :</label>
        <input class="input-modal" id="type" name="type" type="text" v-model="typeForm.title">
      </div>
      <div class="container__buttons">
        <button class="button--action" type="submit" @click="updateType">Valider</button>
        <button class="button--cancel" type="submit" @click="cancelUpdate">Annuler</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["type"],
  data() {
    return {
      //Initiliase les données du formulaire
      typeForm: {
        title: this.type.attributes.title,
        category: this.type.relationships.category.data.id
      }
    };
  },
  methods: {
    /**
     * Modifie le nouvel intitulé pour un type de document/fichier
     */
    updateType() {
      this.$axios
        .$put("/api/type/" + this.type.id, this.typeForm)
        .then(response => {
          //Retour au tableau de bord des catégories pour afficher les changements
          window.location.replace("/admin/category");
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
.update-type {
  .field {
    @include flexbox();
    @include justify-content(center);
    @include align-items(center);
  }
}
</style>

