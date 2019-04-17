<template>
  <div>
    <input type="text" v-model="typeForm.title">
    <button @click="updateType">Valider</button>
  </div>
</template>

<script>
import UpdateTypeForm from "~/components/category/UpdateTypeForm.vue";

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
        .$put("http://104.248.229.222/api/type/" + this.type.id, this.typeForm)
        .then(response => {
          // handle success
          window.location.replace("/admin/category");
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>