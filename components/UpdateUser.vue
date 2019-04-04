<template>
  <section class="container">
    <form action method id class="container-form_edit">
      <div class="label">
        <label for="utilisateur">Nom de l'utilisateur {{this.userFirstNamee}}</label>
        <input type="text" id="utilisateur" name="Nom" :value="this.userEditFirstName">
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
  props: ["userEditFirstName"],
  data() {
    return {};
  },
  computed: {},
  methods: {}
};
</script>