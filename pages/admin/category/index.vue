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
                <td>
                  <nuxt-link
                    class="link__category-view"
                    v-bind:to="`/admin/category/${category.id}`"
                  >
                    <img class="button--table" src="~assets/images/view.svg" alt>
                  </nuxt-link>
                </td>
                <td @click="showEdit = true, selectedCategory = category">
                  <img class="button--table" src="~assets/images/edit.svg" alt>
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

      .link {
        &__category-view {
          display: block;
          margin: 0 auto;
          width: 25px;
        }
      }
    }
  }
}
.avatar {
  &__category {
    width: 50px;
  }
}
</style>

