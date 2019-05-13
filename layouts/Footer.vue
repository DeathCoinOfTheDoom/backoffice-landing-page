<template>
  <footer>
    <div class="max-width">
      <div class="contact">
        <h3 class="section__title">Contact</h3>
        <form action>
          <input class="contact__email" type="email" placeholder="E-mail">
          <textarea class="contact__textarea" rows="5" cols="33" placeholder="Message"></textarea>
          <input class="contact__send-btn" type="submit" value="Envoyer">
        </form>
        <div class="contact__line-bottom"></div>
      </div>
      <span class="line-vertical"></span>
      <div class="legal">
        <h3 class="legal__item section__title">Legal</h3>
        <div class="legal__container-text">
          <a class="legal__item legal__link" href="#">Mentions légales</a>
          <a class="legal__item legal__link" href="#">Politiques de confidentialités</a>
          <div class="legal__item legal__social-network">
            <a href="#">
              <img src="~assets/images/facebook.svg">
            </a>
            <a href="#">
              <img src="~assets/images/instagram.svg">
            </a>
            <a href="#">
              <img src="~assets/images/twitter.svg">
            </a>
          </div>
        </div>
        <div class="legal__container-image">
          <img class="legal__image" src="~assets/images/bobby-winking-footer.svg" alt>
        </div>
      </div>
      <p class="copyright">© Bob 2019</p>
    </div>
  </footer>
</template>

<script>
export default {};
</script>
<style lang="scss">
footer {
  background-color: $light_blue;
  padding: 30px 20px 10px;

  .max-width {
    @media #{$tablet} {
      @include flexbox();
      @include flex-wrap(wrap);
    }
  }
}

.contact {
  @media #{$tablet} {
    width: 50%;
  }

  .section__title {
    @media #{$tablet} {
      text-align: left;
    }
  }

  form {
    @include flexbox();
    @include flex-wrap(wrap);
    @include justify-content(center);

    @media #{$tablet} {
      @include justify-content(flex-start);
    }
  }

  &__email {
    margin-top: 20px;
    height: 50px;
  }

  &__email,
  &__textarea {
    width: 100%;
    max-width: 330px;
    border-radius: 10px;
    font-size: 16px;
    border: 1px solid $light-grey;
    padding-left: 15px;
    outline: none;
    flex-basis: 100%;

    @media #{$mini-mobile} {
      max-width: 400px;
    }

    @media #{$tablet}  {
      max-width: 330px;
    }

    &::placeholder {
      color: $light-grey;
      font-size: 16px;
    }
  }

  &__textarea {
    margin-top: 10px;
    padding-top: 10px;
    resize: none;
  }

  &__send-btn {
    height: 50px;
    width: 100%;
    max-width: 330px;
    background-color: $blue;
    border-radius: 10px;
    border: none;
    color: $white;
    font-size: 18px;
    font-weight: bold;
    margin-top: 10px;
    flex-basis: 100%;
  }

  &__line-bottom {
    display: block;
    margin: 0 auto;
    max-width: 375px;
    width: 49%;
    height: 1px;
    background-color: $white;
    margin-top: 30px;

    @media #{$tablet} {
      display: none;
    }
  }
}

.line-vertical {
  display: none;

  @media #{$tablet} {
    display: inherit;
    width: 1px;
    height: 200px;
    background-color: $white;
    margin: auto;
  }
}

.legal {
  padding-top: 30px;
  display: flex;
  flex-wrap: wrap;

  @media #{$tablet} {
    width: 49%;
    padding-top: 0px;
  }

  .section__title {
    padding-bottom: 20px;

    @media #{$tablet} {
      text-align: left;
      padding-left: 4%;
    }

    @media #{$desktop}  {
      padding-left: 45px;
    }
  }

  &__container-text {
    @include flexbox();
    @include flex-wrap(wrap);
    flex: 0 0 100%;

    @media #{$tablet} {
      flex: 0 0 auto;
      @include align-content(flex-start);
      width: 60%;
      padding-left: 4%;
      box-sizing: border-box;
    }

    @media #{$desktop}  {
      padding-left: 45px;
    }
  }

  &__item {
    flex: 0 0 100%;
  }

  &__link {
    display: inline-block;
    font-size: 16px;
    color: $white;
    font-weight: bold;
    text-decoration: none;
    text-align: center;
    padding-bottom: 15px;

    @media #{$tablet} {
      text-align: left;
    }
  }

  &__social-network {
    @include flexbox();
    @include justify-content(space-evenly);
    padding-top: 20px;
  }

  &__container-image {
    margin: 0 auto;

    @media #{$tablet} {
      width: 40%;
    }
  }

  &__image {
    padding: 50px 0;

    @media #{$tablet} {
      padding: 0px;
      display: block;
      margin: 0 auto;
    }
  }
}

.copyright {
  font-size: 16px;
  color: $white;
  font-weight: normal;
  text-align: center;

  @media #{$tablet} {
    width: 100%;
    padding-top: 30px;
  }

  @media #{$desktop} {
    padding-top: 50px;
  }
}
</style>