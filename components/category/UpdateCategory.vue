<template>
  <div class="background_update-category">
    <div class="container-_update-category">
      <form>
        <div class="label">
          <label for="category">Modifier le nom de la catégorie</label>
          <input type="text" id="category" name="category" v-model="editCategory.title">
        </div>
      </form>
      <button type="submit" form value @click="changedCategory">Valider</button>
      <button @click="cancelUpdate">Annuler</button>
    </div>
  </div>
</template>

<script>
export default {
  props: ["category"],
  data() {
    return {
      editCategory: {
        title: this.category.attributes.title
      }
    };
  },
  methods: {
    changedCategory() {
      this.$axios
        .$put("/api/category/" + this.category.id, this.editCategory)
        .then(response => {
          // handle success
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
<style>
.background_update-category {
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

.container-_update-category {
  background: white;
  padding: 40px;
}
</style>