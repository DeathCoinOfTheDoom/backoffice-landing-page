<template>
  <div class="modal__background">
    <div class="modal read">
      <div class="user__card">
        <div class="user__informations">
          <p class="modal__text">
            <span class="text-bold">Nom :</span>
            {{this.user.attributes.firstName}}
          </p>
          <p class="modal__text">
            <span class="text-bold">Prénom :</span>
            {{this.user.attributes.lastName}}
          </p>
          <p class="modal__text">
            <span class="text-bold">N° de téléphone :</span>
            {{this.user.attributes.phone_number}}
          </p>
          <p class="modal__text">
            <span class="text-bold">Email :</span>
            {{this.user.attributes.email}}
          </p>
          <p class="modal__text">
            <span class="text-bold">Date de naissance :</span>
            {{this.user.attributes.birthdate}}
          </p>
          <p class="modal__text">
            <span class="text-bold">Administrateur :</span>
            {{this.user.attributes.admin ? this.user.attributes.admin : "/"}}
          </p>
          <p class="modal__text">
            <span class="text-bold">Membre depuis :</span>
            {{this.user.attributes.created_at}}
          </p>
        </div>
        <div class="user__image">
          <img src="~assets/images/dogo-profil.png" alt>
        </div>
      </div>
      <div class="line"></div>
      <p class="modal__text">
        <span class="text-bold">Nombre de fichier(s) :</span>
        {{this.user.relationships.files.data.length}}
      </p>
      <ul>
        <li v-for="file in files" :key="file.id">{{file}}</li>
      </ul>
      <div class="line"></div>
      <p class="modal__text">
        <span class="text-bold">Nombre de dossier(s) :</span>
        {{this.user.relationships.folders.data.length}}
      </p>
      <div v-if="folders != ''">
        <table>
          <thead>
            <tr>
              <th>Nom du dossier</th>
              <th>Nombre de fichiers dans le dossier</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="folder in folders" :key="folder.id">
              <td>{{folder.title}}</td>
              <td>{{folder.numberFile}}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <button class="button--cancel" @click="hideInfo">Fermer</button>
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
      .map(id => {
        this.$axios
          .$get("/api/type/" + id)
          .then(response => this.files.push(response.data.attributes.title))
          .catch(error => {
            console.log(error);
          });
      });

    this.user.relationships.folders.data
      .map(folder => folder.id)
      .map(id => {
        this.$axios
          .$get("/api/folder/" + id)
          .then(response => {
            this.folders.push({
              title: response.data.attributes.title,
              numberFile: response.data.relationships.files.data.length
            });
          })
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
<style lang="scss">
.read {
  .button--cancel {
    margin: 20px auto 0;
  }
}
.modal {
  .user {
    &__card {
      @include flexbox();
      @include flex-wrap(wrap);
      @include align-items(center);
    }

    &__informations {
      width: 50%;
    }

    &__image {
      width: 50%;

      img {
        display: block;
        width: 130px;
        height: 130px;
        margin: 0 auto;
      }
    }
  }

  .button--action {
    box-shadow: 0 0 16px 0 rgba(0, 0, 0, 0.16);
  }
}

.line {
  background: $light-grey;
  height: 2px;
  margin: 13px 5px;
}
</style>