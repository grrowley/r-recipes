import Vue from 'vue'
import firebase from 'firebase/app'
import 'firebase/firestore'

Vue.prototype.$firebase = firebase.initializeApp({})

Vue.prototype.$firestore = firebase.firestore()
