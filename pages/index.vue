<template>
  <div class="container">
    <a href="mailto:bob@contact.com" class="contact-sticky">
      <img src="~assets/images/paper-plane.svg" alt="icone avion en papier">
    </a>
    <section class="intro">
      <div class="max-width">
        <div class="intro__container-text">
          <img
            class="intro__logo"
            src="~assets/images/logo-bob.svg"
            alt="Logo où il est écrit Bob avec la tête du compagnon Bobby dans la lettre O"
          >
          <h1 class="intro__title">Bob, le guide locatif simple et intuitif</h1>
          <p
            class="intro__text"
          >L'application Bob est un compagnon personnel vous permettant de stocker et organiser vos documents locatifs en toutes sécurité. Créer vos dossier locatifs et démarquez vous !</p>
          <a href="#" class="link__download-app">
            <img
              class="img__download-app"
              src="~assets/images/dl-app-store.svg"
              alt="logo de téléchargement pour Apple store"
            >
          </a>
        </div>
        <div class="intro__container-image">
          <img
            class="img__proto-mobile"
            src="~assets/images/prototype-app.png"
            alt="Aperçu du rendu de l'application mobile sur un iphone"
          >
          <img
            class="img__proto-desktop"
            src="~assets/images/proto-and-bobby.png"
            alt="Bobby, un chien blanc en dessin, il se cache derrière l'iPhone et il montre l'application Bob"
          >
        </div>
      </div>
    </section>
    <section class="who">
      <div class="max-width">
        <h2 class="section__title">Bob, Who ?</h2>
        <div class="who__container-item">
          <div class="who__item">
            <div class="who__item-image">
              <img
                src="~assets/images/bobby-folders.svg"
                alt="Bobby tiens un dossier vert dans la main"
              >
            </div>
            <h3 class="section__subtitle">Sécurisé</h3>
            <p
              class="section__text"
            >La sécurité de vos documents et leur confidentialité est notre priorité</p>
          </div>
          <div class="who__item">
            <div class="who__item-image">
              <img
                src="~assets/images/bobby-messy.svg"
                alt="notre mascotte Bobby a ses documents éparpillé partout"
              >
            </div>
            <h3 class="section__subtitle">Intuitif</h3>
            <p
              class="section__text"
            >Une interface simple et intuitive pour ne se concentrer que sur l'essentiel</p>
          </div>
          <div class="who__item">
            <div class="who__item-image">
              <img src="~assets/images/bobby-winking.svg" alt="Bobby fait un clin d'oeil">
            </div>
            <h3 class="section__subtitle">Guide</h3>
            <p
              class="section__text"
            >Un guide complet pour vous accompagner et ne plus oublier un seul document</p>
          </div>
        </div>
      </div>
    </section>
    <section class="explain">
      <div class="max-width">
        <div class="explain__container-image">
          <div class="explain__image">
            <img
              class="image-mobile"
              src="~assets/images/montmartre.jpg"
              alt="Montmartre, 18 arrondissement de Paris"
            >
            <img
              class="image-desktop"
              src="~assets/images/montmartre-desktop.jpg"
              alt="Basilique du Sacré-coeur dans le quartier de Montmartre, à Paris"
            >
          </div>
          <div class="explain__image second">
            <img class="image-mobile" src="~assets/images/toit-paris.jpg" alt="toits parisiens">
            <img
              class="image-desktop"
              src="~assets/images/toit-paris-desktop.jpg"
              alt="Vu des toits de Paris, des immeubles Haussmannien"
            >
          </div>
        </div>
        <div class="explain__container-text">
          <h2 class="section__title">Pour une location, un bon dossier peut faire la différence</h2>
          <p
            class="section__text"
          >L’application Bob est disponible sur IOS (Iphone et Ipad ) Il sera votre compagnon personnel vous permettant de stocker et organiser vos documents locatifs en toutes sécurité, de créer des dossier personnalisé et de les envoyer à des propriétaire et le tout avec simplicité. Bob est aussi un guide qui accompagne dans votre constitution de dossier locatif afin de ne plus jamais oublié un seul document.</p>
          <p
            class="section__text"
          >Plusieurs catégories sont à votre disposition pour disposer vos documents par thème et ainsi ne pas vous perdre dans ce flots administratif. Avec une interface intuitive, Bob vous permettra de mettre en avant votre dossier locatif pour vous démarquer des autre candidat et d'ainsi obtenir la location de vos rêves.</p>
        </div>
      </div>
    </section>
    <section class="bobbers">
      <div class="max-width">
        <h2 class="section__title">Les Bobbers ?</h2>
        <p
          class="section__text"
        >Bob est avant tout une application humaine, créée pour aider autrui dans des problèmes du quotidien que tous peuvent rencontrer. L'équipe de création est à l'écoute et réactive, votre avis nous importe beaucoup car si Bob est votre guide, vous êtes le nôtre.</p>
        <ul class="bobbers__listing">
          <li>
            <div class="bobbers__circle bobbers__circle__charpentier">
              <img src="~assets/images/mona.png">
            </div>
            <p class="section__subtitle">Bobette Electricienne</p>
          </li>
          <li>
            <div class="bobbers__circle bobbers__circle__plombier">
              <img src="~assets/images/jessica.png">
            </div>
            <p class="section__subtitle">Bobette Pomblière</p>
          </li>
          <li>
            <div class="bobbers__circle bobbers__circle__peintre">
              <img src="~assets/images/gerome.png">
            </div>
            <p class="section__subtitle">Bob Charpentier</p>
          </li>
          <li>
            <div class="bobbers__circle bobbers__circle__electricien">
              <img src="~assets/images/kaouthar.png">
            </div>
            <p class="section__subtitle">Bobette Peintre</p>
          </li>
          <li>
            <div class="bobbers__circle bobbers__circle__architecte">
              <img src="~assets/images/axel.png">
            </div>
            <p class="section__subtitle">Bob Architecte</p>
          </li>
        </ul>
        <div class="bobbers__slider">
          <SliderMobile/>
        </div>
      </div>
    </section>
    <Footer/>
  </div>
</template>

<script>
import Footer from "~/layouts/Footer.vue";
import SliderMobile from "~/components/landing/SliderMobile.vue";

export default {
  components: {
    Footer,
    SliderMobile
  },
  auth: false
};
</script>

<style lang="scss">
.max-width {
  max-width: 1200px;
  margin: 0 auto;
}
.contact-sticky {
  position: fixed;
  padding: 12px;
  border-radius: 50%;
  right: 10px;
  top: 10px;
  background-color: $dark-blue;
  z-index: 10;
}

.intro {
  background-color: $dark-blue;
  height: 100vh;
  padding: 25px;
  position: relative;

  @media #{$tablet} {
    height: auto;
    padding: 100px 25px 60px 25px;
  }

  &:after {
    display: none;

    @media #{$desktop} {
      display: inherit;
      content: "";
      position: absolute;
      bottom: -255px;
      left: 0;
      right: 0;
      background-image: url("~assets/images/wave.svg");
      background-position: center;
      background-size: cover;
      height: 280px;
    }
  }

  .max-width {
    @include flexbox();
    @include flex-wrap(wrap);
    @include align-content(center);
    @include justify-content(center);

    @media #{$tablet} {
      @include align-items(center);
    }
  }

  &__container-text {
    @media #{$tablet} {
      width: 60%;
      padding-right: 8%;
      box-sizing: border-box;
    }
  }

  &__container-image {
    @media #{$tablet} {
      width: 40%;
    }
  }

  &__logo {
    padding-bottom: 50px;

    @media #{$tablet} {
      padding-bottom: 0px;
      position: absolute;
      top: 15px;
      left: 20px;
    }
  }

  &__title {
    font-family: $poppins-bold;
    font-weight: bold;
    font-size: 22px;
    color: $white;
    text-align: center;
    padding-bottom: 30px;

    @media #{$tablet} {
      text-align: left;
    }
  }

  &__text {
    font-family: $poppins-regular;
    font-weight: normal;
    font-size: 18px;
    color: $white;
    text-align: center;

    @media #{$tablet} {
      text-align: left;
    }
  }

  .link {
    &__download-app {
      display: none;

      @media #{$tablet} {
        display: inherit;
      }
    }
  }

  .img {
    &__proto-mobile {
      position: absolute;
      right: 0;
      bottom: -115px;
      width: 130px;

      @media #{$tablet} {
        display: none;
      }
    }

    &__proto-desktop {
      display: none;
      @media #{$tablet} {
        display: inherit;
        max-width: 475px;
        width: 100%;
        height: auto;
      }
    }

    &__download-app {
      display: none;

      @media #{$tablet} {
        display: inherit;
        max-width: 130px;
        width: 100%;
        height: auto;
        padding-top: 25px;
      }
    }
  }
}

.section {
  &__title {
    font-family: $poppins-bold;
    font-weight: bold;
    font-size: 20px;
    color: $dark-blue;
    text-align: center;
  }

  &__subtitle {
    font-family: $poppins-semibold;
    font-size: 18px;
    color: $dark-blue;
    text-align: center;
    font-weight: 600;
    padding: 10px 0 4px;
  }

  &__text {
    font-family: $poppins-medium;
    font-size: 16px;
    color: $dark-grey;
    text-align: center;
    font-weight: 500;
  }
}

.who {
  padding-top: 70px;
  padding-bottom: 40px;
  border-bottom: solid 1px $light-grey;

  @media #{$tablet} {
    padding-bottom: 60px;
  }

  @media #{$desktop} {
    padding-bottom: 70px;
    padding-top: 290px;
  }

  &__container-item {
    @media #{$tablet} {
      @include flexbox();
      @include align-items(flex-start);
    }
  }

  &__item {
    @include flexbox();
    @include justify-content(center);
    @include flex-wrap(wrap);
    @include flex-direction(column);
    padding: 35px 60px 0px 60px;

    @media #{$tablet} {
      padding: 50px 60px 0px 60px;
    }
  }

  &__item-image {
    height: 170px;
    @include flexbox();
    @include align-items(center);
    @include justify-content(center);
  }
}

.explain {
  padding: 40px 0;
  border-bottom: solid 1px $light-grey;

  @media #{$desktop} {
    padding: 80px 0 200px;
  }

  .max-width {
    @media #{$tablet} {
      @include flexbox();
      @include align-items(center);
    }
  }

  &__container-image {
    @include flexbox();
    @include justify-content(flex-end);
    position: relative;
    padding-right: 20px;
    margin-bottom: 95px;

    @media #{$tablet} {
      width: 50%;
      order: 2;
    }

    @media #{$desktop} {
      width: 60%;
    }
  }

  &__image {
    position: relative;
    height: 100%;

    .image-mobile {
      width: 280px;
      height: auto;

      @media #{$mini-mobile}  {
        width: 320px;
      }

      @media #{$desktop} {
        display: none;
      }
    }

    .image-desktop {
      display: none;

      @media #{$desktop} {
        display: inherit;
        max-width: 505px;
        width: 100%;
        height: auto;
      }
    }

    &.second {
      position: absolute;
      left: 1%;
      bottom: -100px;

      @media #{$mini-mobile} {
        left: 90px;
      }
      @media screen and (min-width: 600px) {
        left: 200px;
      }

      @media #{$tablet} {
        left: 0px;
      }

      @media #{$desktop} {
        left: 50px;
        bottom: -210px;
      }
    }
  }

  &__container-text {
    @media #{$tablet} {
      width: 50%;
      order: 1;
    }

    @media #{$desktop} {
      width: 40%;
    }
  }
}

.explain {
  .section {
    &__title {
      padding: 25px 25px 0px 25px;

      @media #{$tablet} {
        text-align: left;
        padding: 25px 25px 20px 25px;
      }

      @media #{$desktop} {
        padding: 25px 25px 35px 25px;
      }
    }

    &__text {
      padding: 10px 25px 0px 25px;
      text-align: left;
    }
  }
}

.bobbers {
  padding: 25px 20px;

  @media #{$tablet} {
    padding: 25px 20px 80px;
  }

  @media #{$desktop} {
    padding: 50px 20px 100px;
  }

  .section__text {
    padding: 10px 20px 35px;

    @media #{$tablet} {
      padding: 20px;
    }
  }

  &__slider {
    @media #{$tablet} {
      display: none;
    }
  }

  &__listing {
    display: none;

    @media #{$tablet} {
      list-style: none;
      @include flexbox();
      @include justify-content(space-between);
      padding-top: 20px;
    }
  }

  &__circle {
    width: 125px;
    height: 125px;
    border-radius: 50%;
    margin: 0 auto;
    @include flexbox();
    @include justify-content(center);
    @include align-items(flex-end);
    overflow: hidden;

    @media #{$desktop} {
      width: 155px;
      height: 155px;
    }

    img {
      height: auto;
    }

    &__charpentier {
      background-color: rgba(251, 228, 228, 0.8);

      img {
        width: 85px;

        @media #{$desktop} {
          width: 100px;
        }
      }
    }

    &__plombier {
      background-color: #fffbea;

      img {
        width: 110px;

        @media #{$desktop} {
          width: 135px;
        }
      }
    }

    &__peintre {
      background-color: rgba(227, 248, 255, 0.9);

      img {
        width: 120px;

        @media #{$desktop} {
          width: 145px;
        }
      }
    }

    &__electricien {
      background-color: rgba(251, 228, 236, 0.8);

      img {
        width: 90px;

        @media #{$desktop} {
          width: 105px;
        }
      }
    }

    &__architecte {
      background-color: #effcf6;

      img {
        width: 115px;

        @media #{$desktop} {
          width: 140px;
        }
      }
    }
  }
}
</style>