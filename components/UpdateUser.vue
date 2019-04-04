<template>
  <section class="container">
    <form action method id class="container-form_edit">
      <div class="label">
        <label for="prenom">Prénom de l'utilisateur</label>
        <input type="text" id="prenom" name="prenom" :value="this.userEditFirstName">
      </div>
      <div class="label">
        <label for="nom">Nom de l'utilisateur</label>
        <input type="text" id="nom" name="nom" :value="this.userEditLastName">
      </div>
      <div class="label">
        <label for="telephone">Numéro de téléphone</label>
        <input type="text" id="telephone" name="Telephone" placeholder="+33...">
      </div>
      <div class="label">
        <label for="email">Email</label>
        <input type="email" id="email" name="email">
      </div>
      <div class="label">
        <label for="birthdate">Date de naissance</label>
        <input type="birthdate" id="birthdate" name="birthdate">
      </div>
    </form>
    <button type="submit" form value>Valider</button>
  </section>
</template>

<script>
export default {
  props: ["userEditFirstName", "userEditLastName"],
  data() {
    return {};
  },
  computed: {},
  methods: {}
};
</script>