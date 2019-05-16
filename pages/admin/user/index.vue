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
            <!-- <div>
              <label>Tous</label>
              <input type="radio" value="all" v-model="filterTypeValue" checked>
            </div>
            <div>
              <label>Utilisateurs</label>
              <input type="radio" value="user" v-model="filterTypeValue">
            </div>
            <div>
              <label for="admin">Administrateurs</label>
              <input type="radio" id="admin" value="admin" v-model="filterTypeValue">
            </div>-->
            <select v-model="filterTypeValue">
              <option value="all" selected>Tous</option>
              <option value="user">Utilisateurs</option>
              <option value="admin">Administrateurs</option>
            </select>
          </div>
          <nuxt-link to="/admin/user/newUser" class="button--action">Créer un nouvel utilisateur</nuxt-link>
          <div class="filter-name option--item">
            <label>Filtrer par nom d'utilisateur :</label>
            <div class="underline-animation">
              <input class="form-control" v-model="filters.name.value">
              <span></span>
            </div>
          </div>
        </div>
        <no-ssr>
          <v-table
            class="table__inner"
            :data="filterDisplayData"
            :filters="filters"
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
                <td class="voir">
                  <div class="button__voir" @click="showInfo = true, selectedUser = user">Voir</div>
                </td>
                <td class="modifier">
                  <div
                    class="button__modifier"
                    @click="showEdit = true, selectedUser = user"
                  >Modifier</div>
                </td>
                <td class="supprimer">
                  <div
                    class="button__supprimer"
                    @click="showPopup = true, userId = user.id, userFirstName = user.attributes.firstName, userLastName = user.attributes.lastName"
                  >Supprimer</div>
                </td>
              </tr>
            </tbody>
          </v-table>
        </no-ssr>
        <DeleteUser
          v-if="showPopup"
          v-on:closed="closePopup"
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
        name: { value: "", custom: this.nameFilter }
      },
      showPopup: false,
      showEdit: false,
      showInfo: false,
      filterTypeValue: "all"
    };
  },
  mounted() {
    this.$axios
      .$get("/api/user")
      .then(response => {
        // handle success
        this.users = response.data;
      })
      .catch(error => {
        if (error.response.status == 403 || error.response.status == 401) {
          this.$auth.logout();
        }
      });
  },
  computed: {
    filterDisplayData() {
      return this.users.filter(user => {
        if (this.filterTypeValue == "admin") {
          return user.attributes.admin;
        }
        if (this.filterTypeValue == "user") {
          return !user.attributes.admin;
        }
        return true;
      });
    }
  },
  methods: {
    logout: function() {
      this.$auth.logout();
    },
    nameFilter: function(filterValue, row) {
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
    closePopup: function() {
      this.showPopup = false;
    },
    closeEdit: function() {
      this.showEdit = false;
    },
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

.hide {
  background-color: red;
}

.btn {
  padding: 5px 10px;
  border: 1px solid grey;
  border-radius: 8px;
  text-decoration: none;
  color: black;
}

.button--action {
  width: 330px;
  font-size: 18px;
  font-weight: bold;
  border-radius: 10px;
  background-color: $blue;
  color: $white;
  text-decoration: none;
  padding: 15px 0;
  margin: 15px;
}

aside {
  width: 15%;
  max-width: 250px;
  height: 100vh;
  background: $dark-blue;
  position: relative;

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
  max-width: 1440px;
  width: 100%;

  &__option {
    @include flexbox();
    @include flex-wrap(wrap);
    @include justify-content(space-between);
  }

  .option--item {
    @include flexbox();
    @include align-items(center);

    &:last-child {
      width: 100%;
    }

    select {
      width: 150px;
      height: 40px;
      font-family: $poppins-regular;
      font-size: 16px;
      border-radius: 10px;
      border: 1px solid $light-grey;
      background-color: transparent;
      margin-left: 15px;
      outline: none;
    }
  }

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

  &__inner {
    width: 100%;
    padding-top: 20px;
  }

  th {
    font-size: 20px;
    font-weight: bold;
    color: $black;
    text-align: left;
    padding: 10px;
    white-space: nowrap;
  }

  tr {
    text-align: left;

    &:nth-child(odd) {
      background-color: $pale-grey;
    }

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

.table-user {
  // width: 85%;
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

// .filter-name {
//   max-width: 1300px;
//   width: 80%;
//   display: flex;
//   justify-content: flex-start;
//   padding-bottom: 10px;
// }

// .avatar {
//   width: 50px;
//   height: 50px;
//   border-radius: 50%;
//   overflow: hidden;
// }

// .avatar img {
//   width: 100%;
//   height: auto;
// }

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

/*---POP-UP---*/
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
/*__fin popup__*/

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

