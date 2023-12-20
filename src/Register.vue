<script setup lang="ts">
 import { ref, watch } from 'vue';
import { CognitoAuthenticator, Authenticator } from './cognito';
 const username = ref('')
 const password = ref('');
 const confirmPassword = ref('');
const {authenticator} = defineProps<{
     authenticator: Authenticator,
 }>();
 const error = ref('');
 async function submit() {
     try {
	 const user = await authenticator.register(username.value, password.value);
	 console.log(user)
     } catch (e) {
	 debugger;
	 if (e instanceof Error) {
	     error.value = e.message;
	 } else {
	     throw e;
	 }
     }
 }
</script>
<template>
      <div class="login-container">
          <h2>Registrati</h2>
	  {{ error }}
          <form class="login form">
            <div class="form-group">
                <label for="email">Email:</label>
                <input type="email" id="email" name="email" v-model.trim="username" required>
            </div>
            <div class="form-group">
                <label for="password">Password:</label>
                <input type="passord" id="password" name="password" v-model.trim="password" required>
            </div>
	    <div class="form-group">
                <label for="password">Conferma Password:</label>
                <input type="passord" id="password" name="password" v-model.trim="confirmPassword" required>
            </div>
            <div class="form group">
                <button type="button" @click="submit">Registrati</button>
            </div>
        </form>
    </div>
</template>


<style>

.login-container{
    background-color: beige;
    padding: 20px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 1); 
    width: 300px;
}

.login-container h2{
    text-align: center;
    color:#333;
}

.login-form{
    display: flex;
    flex-direction: column;
    margin-top: 20px;
}

.form-group label{
    margin-bottom: 8px;
    color: #555;
}

.form-group input{
    padding: 8px;
    font-size: 16px;
    border: 1px solid #ccc;
}

.form-group button{
    background-color: gray;
    color: #fff;
    padding: 10px;
    border: none;
    font-size: 16px;
    cursor: pointer;
}

.form-group button{
    background-color: lightblue;
}
</style>
