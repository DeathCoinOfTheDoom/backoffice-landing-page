<template>
  <div class="modal__background">
    <div class="modal">
      <form>
        <div class="field">
          <label for="category">Modifier le nom de la catégorie :</label>
          <input
            class="input-modal"
            type="text"
            id="category"
            name="category"
            v-model="editCategory.title"
          >
        </div>
      </form>
      <div class="container__buttons">
        <button class="button--action" type="submit" form value @click="changedCategory">Valider</button>
        <button class="button--cancel" @click="cancelUpdate">Annuler</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["category"],
  data() {
    return {
      //Initiliase les données du formulaire
      editCategory: {
        title: this.category.attributes.title
      }
    };
  },
  methods: {
    /**
     * Modifie le titre de la catégorie
     */
    changedCategory() {
      this.$axios
        .$put("/api/category/" + this.category.id, this.editCategory)
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