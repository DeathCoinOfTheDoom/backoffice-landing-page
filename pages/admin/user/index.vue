<template>
  <section class="body">
    <aside>
      <img class="logo-backoffice" src="~assets/images/logo-bob.svg" alt>
      <nuxt-link to="/admin/user/" class="tab active">
        <span>
          <img class="picto__tab-user" src="~assets/images/dogo-user.svg" alt>
        </span>Utilisateurs
      </nuxt-link>
      <nuxt-link to="/admin/category/" class="tab">
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
      <div class="table">
        <div class="table__option">
          <div class="option--item">
            <label>Trier par :</label>
            <select v-model="filterTypeValue">
              <option value="all" selected>Tous</option>
              <option value="user">Utilisateurs</option>
              <option value="admin">Administrateurs</option>
            </select>
          </div>
          <nuxt-link to="/admin/user/newUser" class="button--action">Créer un nouvel utilisateur</nuxt-link>
          <div class="filter-name option--item">
            <label for="filterName">Filtrer par nom d'utilisateur :</label>
            <div class="underline-animation">
              <input id="filterName" class="form-control" v-model="filters.name.value">
              <span></span>
            </div>
          </div>
        </div>
        <no-ssr>
          <v-table
            class="table__inner"
            :data="filterDisplayData"
            :filters="filters"
            :currentPage.sync="currentPage"
            :pageSize="8"
            @totalPagesChanged="totalPages = $event"
            selectedClass="hide"
          >
            <thead slot="head">
              <th>ID</th>
              <th>Photo</th>
              <th>Nom d'utilisateur</th>
              <th>Téléphone</th>
              <th>E-mail</th>
              <th>Date de naissance</th>
              <th>Admin</th>
              <th colspan="3">Action</th>
            </thead>
            <tbody slot="body" slot-scope="{displayData}">
              <tr v-for="user in displayData" :key="user.id">
                <td class="id__text">{{ user.id }}</td>
                <td class="avatar">
                  <div class="avatar__circle">
                    <img class="avatar__image" src="~assets/images/dogo-user.svg">
                  </div>
                </td>
                <td>{{ user.attributes.firstName ? user.attributes.firstName : "/"}} {{ user.attributes.lastName ? user.attributes.lastName : "/"}}</td>
                <td>{{ user.attributes.phone_number}}</td>
                <td>{{ user.attributes.email ? user.attributes.email : "/" }}</td>
                <td>{{ user.attributes.birthdate ? user.attributes.birthdate : "/"}}</td>
                <td class="admin__text">{{ user.attributes.admin ? user.attributes.admin : "/"}}</td>
                <td @click="showInfo = true, selectedUser = user">
                  <img class="button--table" src="~assets/images/view.svg" alt>
                </td>
                <td @click="showEdit = true, selectedUser = user">
                  <img class="button--table" src="~assets/images/edit.svg" alt>
                </td>
                <td
                  @click="showDelete = true, userId = user.id, userFirstName = user.attributes.firstName, userLastName = user.attributes.lastName"
                >
                  <img class="button--table" src="~assets/images/garbage.svg" alt>
                </td>
              </tr>
            </tbody>
          </v-table>
          <smart-pagination :currentPage.sync="currentPage" :totalPages="totalPages"/>
        </no-ssr>
        <DeleteUser
          v-if="showDelete"
          v-on:closed="closeDelete"
          v-bind:userId="userId"
          v-bind:userFirstName="userFirstName"
          v-bind:userLastName="userLastName"
        />
        <UpdateUser v-if="showEdit" v-on:closedEdit="closeEdit" v-bind:user="selectedUser"/>
        <ReadUser v-if="showInfo" v-on:closedInfo="closeInfo" v-bind:user="selectedUser"/>
      </div>
    </div>
  </section>
</template>

<script>
import DeleteUser from "~/components/user/DeleteUser.vue";
import UpdateUser from "~/components/user/UpdateUser.vue";
import ReadUser from "~/components/user/ReadUser.vue";

export default {
  components: {
    DeleteUser,
    UpdateUser,
    ReadUser
  },
  data() {
    return {
      users: [],
      filters: {
        //Documentation pour les filtres personnalisé
        // https://tochoromero.github.io/vuejs-smart-table/filtering/#custom-filters
        name: { value: "", custom: this.nameFilter }
      },
      showDelete: false,
      showEdit: false,
      showInfo: false,
      filterTypeValue: "all", //la data peut prendre 3 valeurs: "all" pour afficher tous les comptes utilisateurs et administrateurs, "admin" compte administrateur, "user" pour les utilisateurs lambda
      currentPage: 1, //Commence à la premiere page de la pagination
      totalPages: 0 //Initialisation le nombre de pages de la pagination à 0
    };
  },
  mounted() {
    //On récupère les utilisateurs depuis l'API
    this.$axios
      .$get("/api/user")
      .then(response => {
        this.users = response.data;
      })
      .catch(error => {
        if (error.response.status == 403 || error.response.status == 401) {
          this.logout();
        }
      });
  },
  computed: {
    /**
     * Filtre les données des comptes utilisateurs par leur type ("user", "admin", "all")
     * @returns {Array} an array that contains a result of filter
     */
    filterDisplayData() {
      return this.users.filter(user => {
        //affiche les comptes admin
        if (this.filterTypeValue == "admin") {
          return user.attributes.admin;
        }
        //affiche les comptes utilisateurs
        if (this.filterTypeValue == "user") {
          return !user.attributes.admin;
        }
        //affiche les comptes admin et utilisateurs
        return true;
      });
    }
  },
  methods: {
    /**
     * Déconnecte le compte admin
     */
    logout: function() {
      this.$auth.logout();
    },
    /**
     * Filtre les données des utilisateurs
     *
     * @param {string} filterValue - value enter in the searchbar
     * @param {Object} row - user data in the table
     * @returns {boolean} return true if filterValue match with row and return false if filterValue didn't match with row
     */
    nameFilter: function(filterValue, row) {
      //Vérifie si la barre de recherche est rempli, pour transformer les lettres majuscule
      //en miniscule pour pas que ça soit sensible à la casse
      if (row.attributes.firstName && row.attributes.lastName) {
        var fullName =
          row.attributes.firstName.toLowerCase() +
          " " +
          row.attributes.lastName.toLowerCase();
        var fullNameReverse =
          row.attributes.lastName.toLowerCase() +
          " " +
          row.attributes.firstName.toLowerCase();
        return (
          fullName.includes(filterValue.toLowerCase()) ||
          fullNameReverse.includes(filterValue.toLowerCase())
        );
      }
      if (row.attributes.firstName) {
        return row.attributes.firstName.toLowerCase().includes(filterValue);
      }
      if (row.attributes.lastName) {
        return row.attributes.lastName.toLowerCase().includes(filterValue);
      }
    },
    /**
     * Ferme la pop up de suppression d'un utilisateur
     */
    closeDelete: function() {
      this.showDelete = false;
    },
    /**
     * Ferme la pop up de modification d'un utilisateur
     */
    closeEdit: function() {
      this.showEdit = false;
    },
    /**
     * Ferme la pop up les informations d'un utilisateur
     */
    closeInfo: function() {
      this.showInfo = false;
    }
  }
};
</script>

<style lang="scss">
.body {
  min-height: 100vh;
  font-family: $poppins-regular;
  @include flexbox();
  @include justify-content(space-between);
  @include align-items(center);
  @include flex-direction(row);
  text-align: center;
  background-color: $white;
}

aside {
  width: 15%;
  max-width: 250px;
  height: 100vh;
  background: $dark-blue;
  position: relative;
  top: 0;
  bottom: 0;

  .logo-backoffice {
    width: 115px;
    height: auto;
    margin: 50px auto 70px;
  }

  .tab {
    @include flexbox();
    @include align-items(center);
    padding: 10px 20px;
    margin: 30px 0;
    cursor: pointer;
    text-decoration: none;
    color: $white;
    height: 65px;
    cursor: pointer;

    &.active {
      background-color: $gun-metal;
    }

    .picto {
      &__tab-user {
        width: 18px;
        height: auto;
        padding-right: 20px;
        box-sizing: content-box;
      }
      &__tab-category {
        width: 30px;
        height: auto;
        padding-right: 10px;
      }
    }
  }

  .logout {
    @include flexbox();
    @include align-items(center);
    position: absolute;
    bottom: 0;
    right: 0;
    left: 0;
    padding: 20px 15px;
    cursor: pointer;
    color: $white;
    background-color: $gun-metal;

    .picto__logout {
      width: 25px;
      height: auto;
      padding-right: 10px;
      box-sizing: content-box;
    }
  }
}

.main {
  width: 85%;
  height: 90vh;
  border-radius: 4px;
  box-shadow: 2px 2px 14px 3px rgba(31, 41, 51, 0.11);
  margin: 0 25px;
}

.table {
  position: relative;

  .filter-name {
    padding-left: 15px;

    .underline-animation {
      position: relative;
    }

    label {
      padding-right: 10px;
    }

    .form-control {
      font-family: $poppins-regular;
      font-weight: normal;
      font-size: 16px;
      color: $black;
      border: none;
      border-bottom: 1px solid $light-grey;
      background-color: transparent;
      outline: none;
      padding-left: 5px;
      margin: 0 5px;
    }

    span {
      position: absolute;
      bottom: 0;
      left: 50%;
      width: 100%;
      height: 1px;
      opacity: 0;
      background-color: $dark-grey;
      transform-origin: center;
      transform: translate(-50%, 0) scaleX(0);
      transition: all 0.3s ease;
    }

    input:focus ~ span {
      transform: translate(-50%, 0) scaleX(1);
      opacity: 1;
    }
  }

  tr {
    &:nth-child(1n + 1) {
      .avatar {
        &__circle {
          background-color: $yellow;
        }
      }
    }

    &:nth-child(2n + 1) {
      .avatar {
        &__circle {
          background-color: $light-salmon;
        }
      }
    }

    &:nth-child(3n + 1) {
      .avatar {
        &__circle {
          background-color: $pinky;
        }
      }
    }

    &:nth-child(4n + 1) {
      .avatar {
        &__circle {
          background-color: $sky;
        }
      }
    }

    &:nth-child(5n + 1) {
      .avatar {
        &__circle {
          background-color: $pale-aqua;
        }
      }
    }
  }
  td {
    font-family: $poppins-medium;
    font-weight: 500;
    font-size: 16px;
    letter-spacing: 0.2px;
    padding: 5px 10px;
    white-space: nowrap;
  }

  .id {
    &__text {
      text-align: center;
    }
  }

  .avatar {
    &__circle {
      display: block;
      margin: 0 auto;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      position: relative;
      overflow: hidden;
    }
    &__image {
      width: 20px;
      height: 40px;
      position: absolute;
      bottom: -5px;
      left: 50%;
      transform: translateX(-50%);
    }
  }

  .admin {
    &__text {
      text-align: center;
    }
  }
}

.pagination {
  @include flexbox();
  @include justify-content(center);
  @include align-items(center);
  list-style: none;
  position: absolute;
  bottom: 10px;
  left: 0;
  right: 0;

  .page-item {
    padding: 0 5px;

    &.active {
      .page-link {
        color: $blue;
      }
    }

    .page-link {
      text-decoration: none;
      color: $dark-blue;
    }
  }

  .disabled svg {
    color: $dark-blue;
  }
}
</style>

