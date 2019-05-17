<template>
  <section class="container">
    <form action method id class="container-form_edit">
      <div class="label">
        <!-- page à supprimer!!!!! -->
        <label for="utilisateur">Nom de l'utilisateur</label>
        <input type="text" id="utilisateur" name="Nom">
      </div>
      <!-- <div class="label">
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
      </div>-->
    </form>
    <button type="submit" form value>Valider</button>
  </section>
</template>

<style scoped>
.container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
}

.container-form_edit {
  width: 700px;
}

.label {
  display: flex;
  align-items: flex-start;
  margin: 5px 0px;
}

.label label {
  width: 50%;
  text-align: left;
}

.label input {
  width: 40%;
}

button {
  margin-top: 20px;
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

