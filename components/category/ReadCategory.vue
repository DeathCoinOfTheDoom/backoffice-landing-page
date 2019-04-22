<template>
  <div class="background_read-category">
    <div class="container-_read-category">
      <img :src="this.category.attributes.icon">
      <p>Description: {{this.category.attributes.description}}</p>
      <p>Description détaillé: {{this.category.attributes.extended_description}}</p>
      <p class="text">Les types dans la catégorie {{this.category.attributes.title}} :</p>
      <no-ssr>
        <v-table :data="types">
          <thead slot="head">
            <th>Types</th>
            <th colspan="1">Action</th>
          </thead>
          <tbody slot="body" slot-scope="{displayData}">
            <tr v-for="type in displayData" :key="type.id">
              <td>{{ type.title }}</td>
              <td class="modifier">
                <div
                  class="button__modifier"
                  @click="showType = true, selectedCategory = category"
                >Modifier</div>
              </td>
            </tr>
          </tbody>
        </v-table>
      </no-ssr>
      <button @click="hideInfo">Fermer</button>
    </div>
  </div>
</template>

<script>
import UpdateType from "~/components/category/UpdateType.vue";

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
          .then(response => this.types.push(response.data.attributes))
          .catch(error => {
            console.log(error);
          });
      });
  },
  methods: {
    hideInfo() {
      this.$emit("closedInfo");
    }
  }
};
</script>
<style scoped>
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

li {
  text-align: left;
}

.line {
  background: #bebebe;
  height: 2px;
  margin: 5px;
}

table {
  width: 100%;
}
</style>