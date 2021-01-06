<template>
  <div id="index-page">
    <top-Header :current="current"></top-Header>
    <div class="g-signin2" data-onsuccess="onSignIn" data-theme="dark"></div>
  </div>
</template>

<script>
import Header from '../../components/Header';

export default {
  name: 'IndexPage',
  components: {
    TopHeader: Header,
  },
  data: function(){
    return {
      current: 'index'
    }
  }
};
</script>

<style>
body {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
