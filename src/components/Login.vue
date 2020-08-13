<template>
  <div>
    <div class="col 12s">
      <div class="card-panel center red" id='msjerror' v-if="error" >{{error}}</div>
    </div>
    <div class="row">
      <form class="col s5 card-panel" @submit.prevent="registrar">
        <h4 class="center">Registrar cuenta</h4>
        <div class="divider"></div>
        <div class="row">
          <div class="input-field col s12">
            <i class="material-icons prefix tiny">account_circle</i>
            <input type="text" class="validate" required v-model="registrarNombre">
            <label for="icon_email">Nombre</label>
          </div>
          <div class="input-field col s12">
            <i class="material-icons prefix tiny">email</i>
            <input type="email" class="validate" required v-model="registrarEmail">
            <label for="icon_email">Email</label>
          </div>
          <div class="input-field col s12">
            <i class="material-icons prefix">vpn_key</i>
            <input type="password" class="validate" required v-model="registrarPassword">
            <label for="icon_password">Contraseña</label>
          </div>
          <div class="input-field col s12">
            <i class="material-icons prefix">vpn_key</i>
            <input type="password" class="validate" required v-model="registrarPasswordConfirmar" id="confirmar" >
            <label for="icon_password">Repetir contraseña</label>
          </div>
          <div class="col s12 center">
            <button class="btn waves-effect waves-light grey right btn-large" type="submit" name="action">Registrar
              <i class="material-icons right white-text ">send</i>
            </button>
          </div>
        </div>
      </form>
      <form class="col s5  offset-s2 card-panel" @submit.prevent="ingresar">
        <h4 class="center">Ingresar</h4>
        <div class="divider"></div>
        <div class="row">
          <div class="input-field col s12">
            <i class="material-icons prefix">email</i>
            <input type="email" class="validate" required v-model="ingresarEmail">
            <label for="icon_email">Email</label>
          </div>
          <div class="input-field col s12">
            <i class="material-icons prefix">vpn_key</i>
            <input type="password" class="validate" required v-model="ingresarPassword">
            <label for="icon_vpn_key">Contraseña</label>
          </div>
          <div class="col s12 center">
            <button class="btn waves-effect waves-light grey right btn-large" type="submit" name="action">Ingresar
              <i class="material-icons right white-text">send</i>
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
/* import { db } from '@/firebase.js';   */

export default {
  name: 'Login',
  data() {
    return {
      ingresarEmail: '',
      ingresarPassword: '',
      registrarNombre: '',
      registrarEmail: '',
      registrarPassword:'',
      registrarPasswordConfirmar:''
    }
  },
  computed: {
    // esto viene del v-if
    error() {
      return this.$store.state.error;
    }
  },
  methods: {
    ingresar() {
      console.log('Ingresar');
      // ceración de objeto porque solo puedo pasar
      let datos = {
        email: this.ingresarEmail,
        password: this. ingresarPassword
      }
      // pasar la acción despachar!
      this.$store.dispatch('ingresar',datos)
    },    
    registrar() {
      // verificar que ambas contraseñas sean iguales
      const confirmar = document.getElementById('confirmar');
      // Limpiar el mensaje
      confirmar.setCustomValidity('');
      console.log(this.registrarPassword, this.registrarPasswordConfirmar)
      if (this.registrarPassword != this.registrarPasswordConfirmar) {
        confirmar.setCustomValidity('Ambas contraseñas deben coincidir');
        return;
      }
      // ahora podemos registrar al usuario, llamando a la acción correspondiente
      const datos = {
        email: this.registrarEmail, 
        password: this.registrarPassword,
        nombre: this.registrarNombre
        };
      this.$store.dispatch('registrar', datos)
    }
  }/* ,
  firestore() {           // adding this key/function
      return {
          usuarios: db.collection('usuarios')
      }
  } */
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.card-panel {
  padding: 0 2rem 0 2rem;
  margin-top: 4rem;
} 
#msjerror {
  font-size: 1.3rem;
  font-weight: bold;
  padding: 1rem;
}
</style>
