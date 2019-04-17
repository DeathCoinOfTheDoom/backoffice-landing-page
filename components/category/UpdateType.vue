<template>
  <div class="background_update-type">
    <div class="container-_update-type">
      <div>
        <input type="text" v-for="type in types" :key="type.id" :value="type">
      </div>
      <button @click="hideType">Fermer</button>
    </div>
  </div>
</template>

<script>
export default {
  props: ["category"],
  data() {
    return {
      types: []
    };
  },
  mounted() {
    this.category.relationships.type.data
      .map(type => type.id)
      .map(id => {
        this.$axios
          .$get("http://104.248.229.222/api/type/" + id)
          .then(response => this.types.push(response.data.attributes.title))
          .catch(error => {
            console.log(error);
          });
      });

    // this.user.relationships.folders.data
    //   .map(folder => folder.id)
    //   .map(id => {
    //     this.$axios
    //       .$get("http://104.248.229.222/api/folder/" + id)
    //       .then(response => {
    //         this.folders.push({
    //           title: response.data.attributes.title,
    //           numberFile: response.data.relationships.files.data.length
    //         });
    //       })
    //       .catch(error => {
    //         console.log(error);
    //       });
    //   });
  },
  methods: {
    hideType() {
      this.$emit("closedType");
    }
  }
};
</script>
<style scoped>
.background_update-type {
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

.container-_update-type {
  background: white;
  padding: 40px;
}

table {
  width: 100%;
}
</style>