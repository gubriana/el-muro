import Vue from 'vue'
import Vuex from 'vuex'
// son para la autentificación, desde la librería general a la más particular
import firebase from 'firebase/app';
import 'firebase/auth';
import './firebase.js'

import VueFirestore from 'vue-firestore';
import App from './App.vue'
import router from './router';

Vue.config.productionTip = false

Vue.use(Vuex)
Vue.use(VueFirestore, {key: 'id'});   // adding this use statement

const store = new Vuex.Store({
  state:{
    usuario: null,
    // mensaje del v-if del componente
    error: null,
  },
  mutations: {
    // mutación para cambiar el usuario
    setUsuario(state, nuevoUsuario) {
      state.usuario = nuevoUsuario;
    },
    // mutación para cambiar el error
    setError(state, nuevoError) {
      state.error = nuevoError;
    }
  },
  // acciones reciben un contexto de almacen y los datos
  actions: {
    registrar(context, datos){
      // datos tiene 3: email password y nomre. Para autentificar usa email y password
      firebase.auth().createUserWithEmailAndPassword(datos.email, datos.password) // acá guarda
      // si el registro funciona
      .then(function(response){
        console.log(response);
        //registro exisitoso, agregar nombre
        firebase.auth().currentUser.updateProfile({
          displayName: datos.nombre // lo saca de el objeto datos
        })
      })
      // si todo OK pasa a sgte then:
      .then(function(){
        // no hay error
        context.commit('setError', null);
        // se crea objeto usario en el state 
        let usuario = {
          nombre: datos.nombre,
          email: datos.email
        }
        context.commit('setUsuario', usuario);
        // es para ir al inicio
        router.push('/');
      })
      
      // si hay error en el registro
      .catch(function(error){
        console.log(error);
        context.commit('setError', error.message);
        context.commit('setUsuario', error.null);
      })

    },
    salir(context){
      firebase.auth().signOut()
      .then(()=> {
        // al salir el usuario y los errores quedan limpios
        context.commit('setError', null);
        context.commit('setUsuario', null);
        // al salir redirige a la pantalla de login
        router.push('/login');
      })
    },
    ingresar(context,datos){
      firebase.auth().signInWithEmailAndPassword(datos.email, datos.password)
      .then(function(response){
        // todo funciona bien
        context.commit('setError', null);
        // guardar email y nombre 
        let usuario = {
          email: datos.email,
          nombre: response.user.displayName
        }
        context.commit('setUsuario', usuario);
        router.push('/');
      })
      .catch(function(error){
        context.commit('setError', error.message);
        context.commit('setUsuario', null);
      })
    }
  }
});

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')