<template>
  <section class="container">
    <aside>
      <nuxt-link to="/" class="tab">
        <span>
          <img src="~assets/images/user.png" alt>
        </span>Utilisateurs
      </nuxt-link>
      <nuxt-link to="/categoriesTable" class="tab active">
        <span>
          <img src="~assets/images/format-list-bulleted-type.png" alt>
        </span>
        <p>Catégories</p>
      </nuxt-link>
    </aside>
    <div class="logout" @click="logout">Déconnexion</div>
    <div class="table-user">
      <no-ssr>
        <v-table :data="categories">
          <thead slot="head">
            <th>Catégories</th>
            <th>Information</th>
            <th>Edition</th>
          </thead>
          <tbody slot="body" slot-scope="{displayData}">
            <tr v-for="category in displayData" :key="category.id">
              <td>{{ category.category}}</td>
              <td class="modifier">
                <nuxt-link to class="button__modifier">Voir la fiche</nuxt-link>
              </td>
              <td class="modifier">
                <nuxt-link to="/editUser" class="button__modifier">Modifier</nuxt-link>
              </td>
            </tr>
          </tbody>
        </v-table>
      </no-ssr>
      <ConfirmDeleteUser
        v-if="showModal"
        @confirmDelete="deleteUser($event)"
        @cancelDeleteUser="closeModal"
        :userId="showModal"
        :userName="namee"
      />
    </div>
  </section>
</template>

<script>
import ConfirmDeleteUser from "~/components/ConfirmDeleteUser.vue";

export default {
  components: {
    ConfirmDeleteUser
  },
  data() {
    return {
      categories: [
        {
          id: 1,
          category: "Identité",
          date: "01/01/19",
          number: "0678586978",
          mail: "hello@juliette.fr"
        },
        {
          id: 2,
          category: "Garant",
          date: "02/02/19",
          number: "0677667766",
          mail: "hello@jules.fr"
        },
        {
          id: 3,
          category: "Domicile",
          date: "02/03/19",
          number: "0677667777",
          mail: "hello@john.fr"
        },
        {
          id: 4,
          category: "Emploi",
          date: "02/03/19",
          number: "0677667777",
          mail: "hello@john.fr"
        }
      ],
      showModal: false
    };
  },
  methods: {
    deleteUser(userId) {
      const userIndex = this.users.findIndex(user => user.id === userId);

      this.users.splice(userIndex, 1);

      // ensuite ferme la modal
      this.closeModal();
    },
    closeModal() {
      this.showModal = false;
    },
    logout: function() {
      this.$auth.logout();
    }
  }
};
</script>

<style>
*  {
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

aside {
  width: 15%;
  max-width: 250px;
  height: 100vh;
  background: #bbbbbb;
}

aside .tab {
  padding: 20px;
  display: flex;
  align-items: center;
  cursor: pointer;
}

aside .tab img {
  width: 35px;
}

aside .active {
  color: black;
  background: #fbfbfb;
}

.table-user {
  width: 85%;
  display: flex;
  flex-direction: column;
  align-items: center;
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
    "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; /* 1 */
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
}
</style>

