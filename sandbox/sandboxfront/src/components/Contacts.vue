<template>
 <div id="contacts">
  <div v-for="(contact, index) in contacts" :key="contact.id">
   <p>{{contact.name}} is my {{contact.relationship}}</p>
  </div>
 </div>
</template>

<script>
import axios from 'axios'
export default {
data() {
return {
 contacts: [],
 name: [],
 relationship: [],
 errors: []
}
},
created() {
axios.get('localhost:3000/contacts') 
.then(response => {
  this.contacts = response.data
})
.catch(e => {
this.error.push(e)
})
},
}
</script>
