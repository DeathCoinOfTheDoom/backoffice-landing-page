<template>
  <section class="container">
    <!-- <div>page de connexion à venir</div> -->
    <form action method id class="container-form_connexion">
      <div class="label">
        <label for="email">Adresse mail</label>
        <input type="email" id="email" name="email">
      </div>
      <div class="label">
        <label for="password">Mot de passe</label>
        <input type="password" id="password" name="password">
      </div>
    </form>
    <button type="submit" form value>Connexion</button>
  </section>
</template>

<script>
export default {};
</script>

<style>
.container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  flex-direction: column;
}

.container-form_connexion {
  width: 400px;
}

.container-form_connexion .label label {
  width: 50%;
  text-align: left;
}

button {
  margin-top: 40px;
}
</style>

