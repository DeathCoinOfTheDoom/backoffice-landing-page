<template>
  <footer>
    <div class="contact">
      <h3 class="section__title">Contact</h3>
      <form action>
        <input class="contact__email" type="email" placeholder="E-mail">
        <textarea class="contact__textarea" rows="5" cols="33" placeholder="Message"></textarea>
        <input class="contact__send-btn" type="submit" value="Envoyer">
      </form>
      <div class="contact__line-bottom"></div>
    </div>
    <div class="legal">
      <h3 class="legal__item section__title">Legal</h3>
      <a class="legal__item legal__link" href="#">Mentions légales</a>
      <a class="legal__item legal__link" href="#">Politiques de confidentialités</a>
      <img class="legal__item legal__image" src="~assets/images/bobby-winking-footer.svg" alt>
    </div>
    <p class="copyright">© Bob 2019</p>
  </footer>
</template>

<script>
export default {};
</script>
<style>
footer {
  background-color: #b3ecff;
  padding: 30px 20px 10px;
}

.contact__email {
  margin-top: 20px;
  height: 50px;
}

.contact__email,
.contact__textarea {
  width: 100%;
  max-width: 330px;
  border-radius: 10px;
  font-size: 16px;
  border: 1px solid #cbd2d9;
  padding-left: 15px;
  outline: none;
}

.contact__email::placeholder,
.contact__textarea::placeholder {
  color: #cbd2d9;
  font-size: 16px;
}

.contact__textarea {
  margin-top: 10px;
  padding-top: 10px;
}

.contact__send-btn {
  height: 50px;
  width: 100%;
  max-width: 330px;
  background-color: #40c3f7;
  border-radius: 10px;
  border: none;
  color: #fff;
  font-size: 18px;
  font-weight: bold;
  margin-top: 10px;
}

.contact__line-bottom {
  display: block;
  margin: 0 auto;
  max-width: 375px;
  width: 50%;
  height: 1px;
  background-color: #fff;
  margin-top: 30px;
}

.legal {
  padding-top: 30px;
  display: flex;
  flex-wrap: wrap;
}

.legal__item {
  flex-shrink: 0;
  flex-grow: 1;
}

.legal .section__title {
  padding-bottom: 15px;
}

.legal__link {
  display: inline-block;
  font-size: 16px;
  color: #fff;
  font-weight: bold;
  text-decoration: none;
  text-align: center;
  padding-bottom: 15px;
}

.legal__image {
  padding: 50px 0;
}

.copyright {
  font-size: 16px;
  color: #fff;
  font-weight: normal;
  text-align: center;
}
</style>