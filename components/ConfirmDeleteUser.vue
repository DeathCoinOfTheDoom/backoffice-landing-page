<template>
  <div class="container-confirm_delete">
    <p>Êtes-vous sûr de vouloir supprimer Bertrand ? Une fois supprimer vous ne pourrez plus récupérer les données de Bertrand</p>
    <button>Valider</button>
    <button class="cancel">Annuler</button>
  </div>
</template>

<style>
body {
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.container-confirm_delete {
  background: white;
  padding: 40px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
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
</style>

