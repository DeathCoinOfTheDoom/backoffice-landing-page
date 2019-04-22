<template>
  <div>
    <div v-if="category" class="background_read-category">
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
                <td>{{ type.attributes.title }}</td>
                <td class="modifier">
                  <div
                    class="button__modifier"
                    @click="selectedType = type, editType = true"
                  >Modifier</div>
                </td>
              </tr>
            </tbody>
          </v-table>
        </no-ssr>
        <nuxt-link to="/admin/category">Retour</nuxt-link>
      </div>
      <UpdateTypeForm v-if="editType" v-on:closedEdit="closeEdit" v-bind:type="selectedType"/>
    </div>

    <div v-else>Loading...</div>
  </div>
</template>

<script>
import UpdateTypeForm from "~/components/category/UpdateTypeForm.vue";

export default {
  components: {
    UpdateTypeForm
  },
  data() {
    return {
      category: null,
      types: [],
      editType: false,
      selectedType: null
    };
  },
  async mounted() {
    await this.$axios
      .$get(`/api/category/${this.$nuxt.$route.params.id}`)
      .then(response => (this.category = response.data));

    this.category.relationships.type.data
      .map(type => type.id)
      .map(id => {
        this.$axios
          .$get("http://104.248.229.222/api/type/" + id)
          .then(response => this.types.push(response.data))
          .catch(error => {
            console.log(error);
          });
      });
  },
  methods: {
    hideInfo() {
      this.$emit("closedInfo");
    },
    closeEdit: function() {
      this.editType = false;
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

.button__modifier {
  border-radius: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f66f2c;
  border: 1px solid #d95514;
  color: #772c07;
  text-decoration: none;
  cursor: pointer;
}
</style>

