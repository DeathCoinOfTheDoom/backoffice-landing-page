<template>
  <section class="container">
    <div class="filter-name">
      <label>Filtrer par nom d'utilisateur :</label>
      <input class="form-control" v-model="filters.name.value">
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
          <th colspan="2">Edition</th>
        </thead>
        <tbody slot="body" slot-scope="{displayData}">
          <tr v-for="user in displayData" :key="user.id">
            <td>{{ user.id }}</td>
            <td class="avatar">
              <img src="~assets/images/pikachu-avatar.png">
            </td>
            <td>{{ user.name}}</td>
            <td>{{ user.date}}</td>
            <td>{{ user.number}}</td>
            <td>{{ user.mail}}</td>
            <td class="modifier">
              <nuxt-link to="/editUser" class="button__modifier">Modifier</nuxt-link>
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
        {
          id: 1,
          name: "Juliette Dupont",
          date: "01/01/19",
          number: "0678586978",
          mail: "hello@juliette.fr"
        },
        {
          id: 2,
          name: "Jules Dupont",
          date: "02/02/19",
          number: "0677667766",
          mail: "hello@jules.fr"
        },
        {
          id: 3,
          name: "John Dark",
          date: "02/03/19",
          number: "0677667777",
          mail: "hello@john.fr"
        }
      ],
      filters: {
        name: { value: "", keys: ["name"] }
      },
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
    }
  }
};
</script>

<style>
*  {
  padding: 0;
  margin: 0;
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
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
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

