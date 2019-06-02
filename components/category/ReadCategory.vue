<template>
  <div class="modal__background">
    <div class="modal">
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
      <button class="button--cancel" @click="hideInfo">Fermer</button>
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
    //On récupère les informations trouvés pour une catégorie et les types de fichiers/documents qui se trouvent dans la catégorie
    this.category.relationships.type.data
      .map(type => type.id)
      .map(id => {
        this.$axios
          .$get("/api/type/" + id)
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