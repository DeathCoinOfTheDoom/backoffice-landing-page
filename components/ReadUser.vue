<template>
  <div class="background_read-user">
    <div class="container-_read-user">
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