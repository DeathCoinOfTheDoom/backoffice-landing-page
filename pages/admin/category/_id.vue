<template>
  <div class="edit-page">
    <div v-if="category" class="modal__page">
      <p class="modal__title">Information de la catégorie : {{this.category.attributes.title}}</p>
      <img class="type__image" :src="this.category.attributes.icon">
      <p class="modal__text">
        <span class="text-bold">Description :</span>
        {{this.category.attributes.description}}
      </p>
      <p class="modal__text">
        <span class="text-bold">Description détaillé :</span>
        {{this.category.attributes.extended_description}}
      </p>
      <p class="modal__title">Les types dans la catégorie {{this.category.attributes.title}} :</p>
      <no-ssr>
        <v-table class="table" :data="types">
          <thead slot="head">
            <th>Types</th>
            <th colspan="1">Action</th>
          </thead>
          <tbody slot="body" slot-scope="{displayData}">
            <tr v-for="type in displayData" :key="type.id">
              <td>{{ type.attributes.title }}</td>
              <td class="modifier">
                <div @click="selectedType = type, editType = true">
                  <img class="button--table" src="~assets/images/edit.svg" alt>
                </div>
              </td>
            </tr>
          </tbody>
        </v-table>
      </no-ssr>
      <nuxt-link class="button--cancel" to="/admin/category">Retour</nuxt-link>
      <UpdateType v-if="editType" v-on:closedEdit="closeEdit" v-bind:type="selectedType"/>
    </div>

    <div v-else>Loading...</div>
  </div>
</template>

<script>
import UpdateType from "~/components/category/UpdateType.vue";

export default {
  components: {
    UpdateType
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
    //on récupère la catégorie correspondant à l'ID de l'url
    await this.$axios
      .$get(`/api/category/${this.$nuxt.$route.params.id}`)
      .then(response => (this.category = response.data));

    //on récupère les types de fichiers/documents de la catégorie
    this.category.relationships.type.data
      .map(type => type.id)
      .map(id => {
        this.$axios
          .$get("/api/type/" + id)
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

<style lang="scss">
.edit-page {
  .modal {
    &__title {
      padding-top: 40px;
      text-align: left;

      &:first-child {
        padding-top: 0;
      }
    }
  }

  th {
    &:last-child {
      text-align: center;
    }
  }

  tr {
    height: 50px;
  }

  td {
    &:first-child {
      text-align: left;
    }
  }
}

.type {
  &__image {
    display: block;
    margin: 0 auto;
    width: 130px;
    height: auto;
    padding-bottom: 20px;
  }
}
</style>

