<template>
  <section class="container">
    <aside>
      <nuxt-link to="/admin/" class="tab active">
        <span>
          <img src="~assets/images/user.png" alt>
        </span>Utilisateurs
      </nuxt-link>
      <nuxt-link to="/admin/categoriesTable" class="tab">
        <span>
          <img src="~assets/images/format-list-bulleted-type.png" alt>
        </span>
        <p>Catégories</p>
      </nuxt-link>
    </aside>
    <div class="logout btn" @click="logout">Déconnexion</div>
    <div class="table-user">
      <div class="tab-user">
        <div class="filter-name">
          <label>Filtrer par nom d'utilisateur :</label>
          <input class="form-control" v-model="filters.name.value">
        </div>
        <nuxt-link to="/admin/newUser" class="btn">Créer un nouvel utilisateur</nuxt-link>
      </div>
      <no-ssr>
        <v-table :data="users" :filters="filters">
          <thead slot="head">
            <th>ID</th>
            <th>Photo</th>
            <th>Nom d'utilisateur</th>
            <th>Rejoint le</th>
            <th>Téléphone</th>
            <th>Email</th>
            <th>Date de naissance</th>
            <th colspan="2">Edition</th>
          </thead>
          <tbody slot="body" slot-scope="{displayData}">
            <tr v-for="user in displayData" :key="user.id">
              <td>{{ user.id }}</td>
              <td class="avatar">
                <img src="~assets/images/pikachu-avatar.png">
              </td>
              <td>{{ user.attributes.firstName ? user.attributes.firstName : "/"}} {{ user.attributes.lastName ? user.attributes.lastName : "/"}}</td>
              <td>{{ user.attributes.created_at ? user.attributes.created_at : "/" }}</td>
              <td>{{ user.attributes.phone_number}}</td>
              <td>{{ user.attributes.email ? user.attributes.email : "/" }}</td>
              <td>{{ user.attributes.birthdate ? user.attributes.birthdate : "/"}}</td>
              <td class="modifier">
                <nuxt-link to="/admin/editUser" class="button__modifier" @click="editTest">Modifier</nuxt-link>
              </td>
              <td class="supprimer">
                <div
                  class="button__supprimer"
                  @click="showModal = user.id, namee = user.name"
                >Supprimer</div>
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
      users: [
        // {
        //   type: "user",
        //   id: "1",
        //   attributes: {
        //     phone_number: "+33651520836",
        //     email: "axel.rayer@gmail.com",
        //     firstName: "Axel",
        //     lastName: "Rayer",
        //     birthdate: "1997-05-30",
        //     admin: "1",
        //     created_at: "2019-03-15 09:16:20",
        //     updated_at: "2019-03-15 09:21:10"
        //   },
        //   relationships: {
        //     folders: {
        //       links: {
        //         self: "http://104.248.229.222/api/user/1/relationships/folder",
        //         related: "http://104.248.229.222/api/user/1/folder"
        //       },
        //       data: []
        //     },
        //     files: {
        //       links: {
        //         self: "http://104.248.229.222/api/user/1/relationships/file",
        //         related: "http://104.248.229.222/api/user/1/file"
        //       },
        //       data: []
        //     }
        //   },
        //   links: {
        //     self: "http://104.248.229.222/api/user/1"
        //   }
        // },
        // {
        //   type: "user",
        //   id: "2",
        //   attributes: {
        //     phone_number: "+33663149859",
        //     email: "gerome.lacaux@hetic.net",
        //     firstName: "Gérome",
        //     lastName: "Lacaux",
        //     birthdate: "0000-00-00",
        //     admin: "1",
        //     created_at: "2019-03-15 09:16:20",
        //     updated_at: "2019-03-15 09:21:10"
        //   },
        //   relationships: {
        //     folders: {
        //       links: {
        //         self: "http://104.248.229.222/api/user/2/relationships/folder",
        //         related: "http://104.248.229.222/api/user/2/folder"
        //       },
        //       data: [
        //         {
        //           type: "folder",
        //           id: "1"
        //         }
        //       ]
        //     },
        //     files: {
        //       links: {
        //         self: "http://104.248.229.222/api/user/2/relationships/file",
        //         related: "http://104.248.229.222/api/user/2/file"
        //       },
        //       data: []
        //     }
        //   },
        //   links: {
        //     self: "http://104.248.229.222/api/user/2"
        //   }
        // },
        // {
        //   type: "user",
        //   id: "3",
        //   attributes: {
        //     phone_number: "Numéro Exemple",
        //     email: "jessica.thielemans@hetic.net",
        //     firstName: "Jessica",
        //     lastName: "Thielemans",
        //     birthdate: "0000-00-00",
        //     admin: "1",
        //     created_at: "2019-03-15 09:16:20",
        //     updated_at: "2019-03-15 09:21:10"
        //   },
        //   relationships: {
        //     folders: {
        //       links: {
        //         self: "http://104.248.229.222/api/user/3/relationships/folder",
        //         related: "http://104.248.229.222/api/user/3/folder"
        //       },
        //       data: []
        //     },
        //     files: {
        //       links: {
        //         self: "http://104.248.229.222/api/user/3/relationships/file",
        //         related: "http://104.248.229.222/api/user/3/file"
        //       },
        //       data: []
        //     }
        //   },
        //   links: {
        //     self: "http://104.248.229.222/api/user/3"
        //   }
        // }
      ],
      filters: {
        name: { value: "", custom: this.nameFilter }
      },
      showModal: false
    };
  },
  mounted() {
    const axios = require("axios");
    this.$axios.$get("http://104.248.229.222/api/user").then(response => {
      // handle success
      this.users = response.data;
      console.log(users);
    });
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
    },
    editTest: function() {},
    nameFilter: function(filterValue, row) {
      var fullName =
        row.attributes.firstName.toLowerCase() +
        " " +
        row.attributes.lastName.toLowerCase();
      var fullNameReverse =
        row.attributes.lastName.toLowerCase() +
        " " +
        row.attributes.firstName.toLowerCase();
      return (
        fullName.includes(filterValue) || fullNameReverse.includes(filterValue)
      );
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

.btn {
  padding: 5px 10px;
  border: 1px solid grey;
  border-radius: 8px;
  text-decoration: none;
  color: black;
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

.table-user {
  width: 85%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.tab-user {
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

