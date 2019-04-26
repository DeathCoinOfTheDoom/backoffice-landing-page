<template>
  <div class="background_read-category">
    <div class="container-_read-category">
      <input type="text" v-model="typeForm.title">
      <button @click="cancelUpdate">Annuler</button>
      <button @click="updateType">Valider</button>
    </div>
  </div>
</template>

<script>
import UpdateType from "~/components/category/UpdateType.vue";

export default {
  props: ["type"],
  data() {
    return {
      typeForm: {
        title: this.type.attributes.title,
        category: this.type.relationships.category.data.id
      }
    };
  },
  methods: {
    updateType() {
      this.$axios
        .$put("/api/type/" + this.type.id, this.typeForm)
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
.background_read-category {
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

p {
  text-align: left;
}

img {
  width: 150px;
}

.text {
  padding: 20px 0px 10px;
}

.container-_read-category {
  background: white;
  padding: 40px;
}
</style>