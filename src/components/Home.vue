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
                        <div class="file-field input-field">
                            <div class="btn-floating waves-effect waves-light grey">
                                <span><i class="material-icons">add_a_photo</i></span>
                                <input type="file">
                            </div>
                        </div>
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
                    <div class="card-content" >
                            <span>{{ posteo.date }}</span>
                            <a href="#"  class="secondary-content" @click.prevent="like(posteo.id)" >
                                <i class="material-icons red-text">favorite</i>
                                <span class="likes grey-text"><sup>{{posteo.likes}}</sup></span>
                            </a>
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
  return `${trailing(now.getDate())}.${trailing(now.getMonth()+1)}.${now.getFullYear()-2000}`;
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
            likes: 0, 
        }),
        this.posteoTexto=''
    },
    like(postId){    
      // Primer paso, recupero el post anterior por su id // para limitar el numero de likes
      const posteo = this.posteos.find(posteo => posteo.id == postId);
      // actualizo en la base de datos
      this.$firestore.posteos.doc(postId).update({
        likes: posteo.likes++
      });
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