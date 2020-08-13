<template>
    <div class="row">
        <div class="card-panel m12 grey" id="panel-superior">
            <h3 class="header center light white-text ">Este es tu muro <span v-if="usuario">{{ usuario.nombre }}</span></h3>
        </div>
        <div class="card-panel m12 grey lighten-2">
            <form @submit.prevent="agregarPosteo" type="submit">
                <div class="row">
                    <div class="input-field col m11">
                        <i class="material-icons prefix">mode_edit</i>
                        <textarea id="icon_prefix2" class="materialize-textarea" maxlength="150" v-model="posteoTexto" required></textarea>
                        <label for="icon_prefix2">Escribe tu post</label>
                    </div>
                    <div class="col s1 center">
                        <button class="btn-floating waves-effect waves-light grey"><i class="material-icons">add</i></button>
                        <button class="btn-floating waves-effect waves-light grey"><i class="material-icons">add_a_photo</i></button>
                    </div>
                </div>
            </form>
        </div>
        <form class="row">
            <div class="col s12 m4" v-for="posteo in posteos" :key="posteo.id">
                <div class="card">
                    <ul class="collection">
                        <li class="collection-item avatar">
                        <img src="@/assets/background1.jpg" alt="" class="circle">
                        <span class="title">{{ posteo.user.nombre }}</span>
                        <p>Escribió</p>
                        </li>
                    </ul>
                    <div class="card-content">
                        <p>{{ posteo.text }}</p>
                    </div>
                    <div class="card-action right-align" >
                        {{ posteo.date }}
                        <a href="#"  class="secondary-content"><i class="material-icons">favorite</i></a>
                        <span class="likes">1</span>
                    </div>
                </div>
            </div>
        </form>
    </div>
</template>
<script>
import firebase from 'firebase/app'; 
import { db } from '@/firebase.js';

// creacion string de fecha
const getDate = () => {
  const trailing = (d) => d.length < 10 ? '0'+d : d;
  const now = new Date();
  return `${now.getFullYear()}-${trailing(now.getMonth())}-${trailing(now.getDate())} ${trailing(now.getHours())}:${trailing(now.getMinutes())}:${trailing(now.getSeconds())}`;
}

export default {
    name: 'Home',
    computed: {
        usuario() {
            return this.$store.state.usuario;
        }
    },
    data: function() {
        return {
            posteoTexto: '',
            posteos: []
        }
    },
    methods: {
    agregarPosteo: function(){
        // recuperar usuario actual
        const user = firebase.auth().currentUser
        //Agragamos el nuevo post
        this.$firestore.posteos.add({
            date: getDate(),
            img: null,
            text: this.posteoTexto,
            user: {
                nombre: user.displayName,
                userid: user.uid
            },
            likes: 0   
        })
    }
  },
  firestore() {           // adding this key/function
      return {
          posteos: db.collection('posteos')
      }
  }
}
</script>
<style scoped>
#panel-superior {
  margin-top: 4rem;
}
button {
    margin-top: 18px;
}
#avatar-post {
    border-bottom: 1px solid #e0e0e0;
}
textarea.materialize-textarea:focus:not([readonly])+label {
    color: grey;
}
.input-field .prefix.active {
    color:grey;
}
</style>   