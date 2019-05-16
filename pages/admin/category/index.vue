<template>
  <section class="body">
    <aside>
      <img class="logo-backoffice" src="~assets/images/logo-bob.svg" alt>
      <nuxt-link to="/admin/user/" class="tab">
        <span>
          <img class="picto__tab-user" src="~assets/images/dogo-user.svg" alt>
        </span>Utilisateurs
      </nuxt-link>
      <nuxt-link to="/admin/category/" class="tab active">
        <span>
          <img class="picto__tab-category" src="~assets/images/listing.svg" alt>
        </span>
        <p>Catégories</p>
      </nuxt-link>
      <div class="logout" @click="logout">
        <span>
          <img class="picto__logout" src="~assets/images/logout.svg" alt>
        </span>Déconnexion
      </div>
    </aside>
    <div class="main">
      <div class="table category">
        <no-ssr>
          <v-table :data="categorys">
            <thead slot="head">
              <th>ID</th>
              <th>Photo</th>
              <th>Catégories</th>
              <th colspan="3">Action</th>
            </thead>
            <tbody slot="body" slot-scope="{displayData}">
              <tr v-for="category in displayData" :key="category.id">
                <td class="id__text">{{ category.id }}</td>
                <td class="avatar">
                  <img class="avatar__category" :src="category.attributes.icon">
                </td>
                <td>{{ category.attributes.title}}</td>
                <td class="Voir sa fiche">
                  <nuxt-link v-bind:to="`/admin/category/${category.id}`" class="button__voir">Voir</nuxt-link>
                </td>
                <td class="modifier">
                  <div
                    class="button__modifier"
                    @click="showEdit = true, selectedCategory = category"
                  >Modifier la catégorie</div>
                </td>
              </tr>
            </tbody>
          </v-table>
        </no-ssr>
        <UpdateCategory
          v-if="showEdit"
          v-on:closedEdit="closeEdit"
          v-bind:category="selectedCategory"
        />
        <ReadCategory
          v-if="showInfo"
          v-on:closedInfo="closeInfo"
          v-bind:category="selectedCategory"
        />
      </div>
    </div>
  </section>
</template>

<script>
import UpdateCategory from "~/components/category/UpdateCategory.vue";
import ReadCategory from "~/components/category/ReadCategory.vue";

export default {
  components: {
    UpdateCategory,
    ReadCategory
  },
  data() {
    return {
      categorys: [],
      showEdit: false,
      showInfo: false
    };
  },
  mounted() {
    this.$axios
      .$get("/api/category")
      .then(response => {
        // handle success
        this.categorys = response.data;
        console.log(this.categorys);
      })
      .catch(error => {
        console.log(error);
      });
  },
  methods: {
    logout: function() {
      this.$auth.logout();
    },
    closeEdit: function() {
      this.showEdit = false;
    },
    closeInfo: function() {
      this.showInfo = false;
    },
    closeType: function() {
      this.showType = false;
    }
  }
};
</script>

<style lang="scss">
.table {
  &.category {
    @include flexbox();
    @include justify-content(center);

    table {
      width: 800px;
      padding-top: 50px;
    }
  }
}
.avatar {
  &__category {
    width: 50px;
    color: pink;
  }
}

/* *  {
  padding: 0;
  margin: 0;
}

.logout {
  position: absolute;
  right: 10px;
  top: 10px;
  padding: 5px 10px;
  border: 1px solid grey;
  border-radius: 8px;
  cursor: pointer;
}

.btn {
  padding: 5px 10px;
  border: 1px solid grey;
  border-radius: 8px;
  text-decoration: none;
  color: black;
}

aside .tab {
  padding: 20px;
  display: flex;
  align-items: center;
  cursor: pointer;
  text-decoration: none;
  color: black;
}

aside .tab img {
  width: 35px;
}

aside .active {
  color: black;
  background: #fbfbfb;
}

.table-category {
  width: 85%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.table-category {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1300px;
  width: 80%;
  padding-bottom: 10px;
}

.filter-name {
  max-width: 1300px;
  width: 80%;
  display: flex;
  justify-content: flex-start;
  padding-bottom: 10px;
}

table {
  max-width: 1300px;
  width: 80%;
}

thead {
  background: #eee;
}

.avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  overflow: hidden;
}

.avatar img {
  width: 100%;
  height: auto;
}

.modifier,
.supprimer {
  cursor: pointer;
}

.button__supprimer {
  border-radius: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f05858;
  border: 1px solid #ec4949;
  color: #7f1b1b;
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
}

.button__voir {
  border-radius: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #24b015;
  border: 1px solid rgb(23, 133, 11);
  color: rgb(5, 32, 2);
  text-decoration: none;
  padding: 0 5px;
}

.background_confirm-delete {
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

.container-confirm_delete {
  background: white;
  padding: 40px;
}

button {
  margin-top: 40px;
  cursor: pointer;
  outline: none;
}

.cancel {
  border: none;
  color: red;
  opacity: 0.8;
  font-weight: bold;
  padding: 0 1px;
  padding-bottom: 3px;
  border-bottom: 1px solid white;
  transition: 0.5s ease-in-out;
}

.cancel:hover {
  border-bottom: 1px solid red;
}

.container {
  min-height: 100vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  text-align: center;
  background: #fbfbfb;
}

.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; 
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
} */
</style>

