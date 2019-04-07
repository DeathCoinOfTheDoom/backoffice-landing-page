<template>
  <div class="background_read-user">
    <div class="container-_read-user">
      <!-- <form>
        <div class="label">
          <label for="prenom">Prénom</label>
          <input type="text" id="prenom" name="prenom" v-model="editUser.firstName">
        </div>
        <div class="label">
          <label for="nom">Nom</label>
          <input type="text" id="nom" name="nom" v-model="editUser.lastName">
        </div>
        <div class="label">
          <label for="telephone">Numéro de téléphone</label>
          <input
            type="text"
            id="telephone"
            name="Telephone"
            placeholder="+33..."
            v-model="editUser.phone_number"
          >
        </div>
        <div class="label">
          <label for="email">Email</label>
          <input type="email" id="email" name="email" v-model="editUser.email">
        </div>
        <div class="label">
          <label for="birthdate">Date de naissance</label>
          <input type="date" id="birthdate" name="birthdate" v-model="editUser.birthdate">
        </div>
        <div class="label">
          <label for="adminAccount">Administrateur</label>
          <input type="checkbox" id="adminAccount" name="adminAccount" v-model="editUser.admin">
        </div>
        <div v-if="editUser.admin">
          <div class="label">
            <label for="password">Modifier le mot de passe</label>
            <input type="password" v-model="editUser.password">
          </div>
          <div class="label">
            <label for="password_confirmation">Confirmer le mot de passe</label>
            <input type="password" v-model="editUser.password_confirmation">
          </div>
        </div>
      </form>-->
      <p>Nom : {{this.user.attributes.firstName}}</p>
      <p>Prénom : {{this.user.attributes.lastName}}</p>
      <p>N° de téléphone : {{this.user.attributes.phone_number}}</p>
      <p>Email : {{this.user.attributes.email}}</p>
      <p>Date de naissance : {{this.user.attributes.birthdate}}</p>
      <p>Administrateur : {{this.user.attributes.admin ? this.user.attributes.admin : "/"}}</p>
      <p>Membre depuis : {{this.user.attributes.created_at}}</p>
      <div class="line"></div>
      <p>Nombre de fichier(s) :{{this.user.relationships.files.data.length}}</p>
      <ul>
        <li v-for="file in files" :key="file.id">{{file}}</li>
      </ul>
      <div class="line"></div>
      <p>Nombre de dossier(s) :{{this.user.relationships.folders.data.length}}</p>
      <ul>
        <li v-for="folder in folders" :key="folder.id">{{folder}}</li>
      </ul>
      <button @click="hideInfo">Fermer</button>
    </div>
  </div>
</template>

<script>
export default {
  props: ["user"],
  data() {
    return {
      files: [],
      folders: []
    };
  },
  mounted() {
    this.user.relationships.files.data
      .map(file => file.id)
      .map((id, index) => {
        this.$axios
          .$get("http://104.248.229.222/api/type/" + id)
          .then(response => this.files.push(response.data.attributes.title))
          .catch(error => {
            console.log(error);
          });
      });

    this.user.relationships.folders.data
      .map(folder => folder.id)
      .map((id, index) => {
        this.$axios
          .$get("http://104.248.229.222/api/folder/" + id)
          .then(response => this.folders.push(response.data.attributes.title))
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
<style>
.background_read-user {
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

.container-_read-user {
  background: white;
  padding: 40px;
}

.line {
  background: #bebebe;
  height: 2px;
  margin: 5px;
}
</style>