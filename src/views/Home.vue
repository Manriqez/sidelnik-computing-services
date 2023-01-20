<template>
  <div class="home">
    <main>
      <h3>Главная</h3>
      <section>
        <h4>Интернет-магазин всякой всячины</h4>
        <p>В данном интернет магазине вы можете приобрести всякую всячину по всякой цене всякой оплатой.</p>
      </section>
    </main>
  </div>
</template>

<script>

export default {
  name: "Home",
  components: {},
};
</script>

<style lang="scss">
main {
  padding-top: 40px;
  color: #e0f7fa;
  position: relative;
  background: url('../assets/bateman.jpg');
  box-shadow: 0px 0px 36px 0px rgba(34, 60, 80, 0.55) inset;
  height: 100vh;
  section {
    z-index: 3;
  }
}
/* <img src="../assets/bateman.jpg" alt=""> */
</style>
