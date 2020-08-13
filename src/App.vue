<template>
  <div>
    <nav class="white" role="navigation">
        <div class="nav-wrapper container">
        <a id="logo-container" href="#" class="gray-text"></a>
        <ul class="right hide-on-med-and-down">
            <!--Si no existe user no muestra el boton -->
            <li><a class="grey-text" @click.prevent="salir" v-if="usuario">SALIR</a></li>
        </ul>
        </div>
    </nav>
    <div class="container">
      <router-view />
    </div>
  </div>
</template>

<script>

export default {
  name: 'App',
  computed: {
    usuario() {
        return this.$store.state.usuario;
    }
  },
  methods: {
    salir(){
        this.$store.dispatch('salir')
    }
  }
}
</script>

<style>
h1, h2, h3, h4, h5, p, i {
  color: gray;
}
html {
  background-color: #eeeeee;
}
body {
  font-family: 'Montserrat', Helvetica, sans-serif;
}
.active {
  color:#990000;
}
</style>
