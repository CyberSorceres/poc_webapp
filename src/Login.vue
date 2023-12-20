<script setup lang="ts">
 import { ref } from 'vue';
import { Authenticator } from './cognito';
const {authenticator} = defineProps<{
     authenticator: Authenticator,
 }>();
 const email = ref('');
 const password = ref('');
 const error = ref('');

 async function submit() {
	 try {
	     await authenticator.login(email.value, password.value)
	 } catch (e) {
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
        <h2>Login</h2>
        <form class="login form">
            <div class="form-group">
                <label for="email">Email:</label>
                <input type="email" id="email" name="email" required>
            </div>
            <div class="form-group">
                <label for="password">Password:</label>
                <input type="passord" id="password" name="password" required>
            </div>
            <div class="form group">
                <button type="submit" @click="submit()">Accedi</button>
            </div>
        </form> 
    </div>
</template>


<style>
body{
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background-color: antiquewhite;
    margin: 0;
    padding: 0;
    align-items: center;
    height: 100vh;
}

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
