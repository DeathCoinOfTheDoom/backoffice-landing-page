<template>
  <div class="container">
    <section class="intro">
      <img src="#" alt>
      <h1 class="intro__title">Bob, le guide locatif simple et intuitif</h1>
      <h1 class="intro__title">Bob, le guide locatif simple et intuitif</h1>
      <p
        class="intro__text"
      >L'application Bob est un compagnon personnel vous permettant de stocker et organiser vos documents locatifs en toutes sécurité. Créer vos dossier locatifs et démarquez vous !</p>
      <img class="img-proto" src="~assets/images/prototype-app.png" alt>
    </section>
    <section class="who">
      <h2 class="section__title">Bob, Who ?</h2>
      <div>
        <div class="who__item">
          <img src="~assets/images/bobby-folders.svg" alt>
          <h3 class="who__item-title">Sécurisé</h3>
          <p
            class="section__text"
          >La sécurité de vos documents et leur confidentialité est notre priorité</p>
        </div>
        <div class="who__item">
          <img src="~assets/images/bobby-messy.svg" alt>
          <h3 class="who__item-title">Intuitif</h3>
          <p
            class="section__text"
          >Une interface simple et intuitive pour ne se concentrer que sur l'essentiel</p>
        </div>
        <div class="who__item">
          <img src="~assets/images/bobby-winking.svg" alt>
          <h3 class="who__item-title">Guide</h3>
          <p
            class="section__text"
          >Un guide complet pour vous accompagner et ne plus oublier un seul document</p>
        </div>
      </div>
    </section>
    <section class="explain">
      <div class="explain__container-image">
        <div>
          <img class="explain__image" src="~assets/images/montmartre.jpg" alt>
        </div>
        <div>
          <img class="explain__image second" src="~assets/images/toit-paris.jpg" alt>
        </div>
      </div>
      <h2 class="section__title">Pour une location, un bon dossier peut faire la différence</h2>
      <p
        class="section__text"
      >L’application Bob est disponible sur IOS (Iphone et Ipad ) Il sera votre compagnon personnel vous permettant de stocker et organiser vos documents locatifs en toutes sécurité, de créer des dossier personnalisé et de les envoyer à des propriétaire et le tout avec simplicité. Bob est aussi un guide qui accompagne dans votre constitution de dossier locatif afin de ne plus jamais oublié un seul document.</p>
      <p
        class="section__text"
      >Plusieurs catégories sont à votre disposition pour disposer vos documents par thème et ainsi ne pas vous perdre dans ce flots administratif. Avec une interface intuitive, Bob vous permettra de mettre en avant votre dossier locatif pour vous démarquer des autre candidat et d'ainsi obtenir la location de vos rêves.</p>
    </section>
    <section>slider</section>
    <section></section>
    <Footer/>
  </div>
</template>

<script>
import Footer from "~/components/layout/Footer.vue";

export default {
  components: {
    Footer
  },
  auth: false
};
</script>

<style>
*  {
  padding: 0;
  margin: 0;
}

.img-proto {
  position: absolute;
  right: 0;
  bottom: -115px;
  width: 130px;
}

.intro {
  background-color: #1f2933;
  height: 100vh;
  padding: 25px;
  display: flex;
  flex-wrap: wrap;
  align-content: center;
  justify-content: center;
  position: relative;
}

.intro__title {
  font-size: 22px;
  color: #fff;
  text-align: center;
  padding-bottom: 30px;
  font-weight: bold;
}

.intro__text {
  font-size: 18px;
  color: #fff;
  text-align: center;
  font-weight: normal;
}

.section__title {
  font-size: 20px;
  color: #1f2933;
  text-align: center;
  font-weight: bold;
}

.section__text {
  font-size: 16px;
  color: #7b8794;
  text-align: center;
  font-weight: 500;
}

.who {
  padding-top: 70px;
  padding-bottom: 40px;
  border-bottom: solid 1px #cbd2d9;
}

.who__item {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  flex-direction: column;
  padding: 35px 60px 0px 60px;
}

.who__item-title {
  font-size: 18px;
  color: #1f2933;
  text-align: center;
  font-weight: 600;
  padding-top: 10px;
}

.explain {
  padding: 40px 0;
  border-bottom: solid 1px #cbd2d9;
}

.explain__container-image {
  display: flex;
  justify-content: flex-end;
  position: relative;
  padding-right: 20px;
  margin-bottom: 95px;
}

.explain__image {
  width: 280px;
  height: auto;
}

.explain__image.second {
  position: absolute;
  left: 1%;
  bottom: -100px;
}

.explain .section__title {
  padding: 25px 25px 0px 25px;
}

.explain .section__text {
  padding: 10px 25px 0px 25px;
  text-align: left;
}
</style>

