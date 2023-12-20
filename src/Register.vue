<script setup lang="ts">
import { ref } from "vue";
import { Authenticator } from "./cognito";
import Modal from "./Modal.vue";
const username = ref("");
const password = ref("");
const confirmPassword = ref("");
const confirmCode = ref("");
const { authenticator } = defineProps<{
  authenticator: Authenticator;
}>();
const error = ref("");
const showConfirmModal = ref(false);
async function submit() {
  try {
    await authenticator.register(username.value, password.value);
    showConfirmModal.value = true;
  } catch (e) {
    if (e instanceof Error) {
      error.value = e.message;
    } else {
      throw e;
    }
  }
}

async function confirmCodeSubmit() {
  try {
    const res = await authenticator.confirmCode(confirmCode.value);
    console.log(res);
    showConfirmModal.value = false;
  } catch (e) {
    // ... display error
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
        <input
          type="email"
          id="email"
          name="email"
          v-model.trim="username"
          required
        />
      </div>
      <div class="form-group">
        <label for="password">Password:</label>
        <input
          type="passord"
          id="password"
          name="password"
          v-model.trim="password"
          required
        />
      </div>
      <div class="form-group">
        <label for="password">Conferma Password:</label>
        <input
          type="passord"
          id="password"
          name="password"
          v-model.trim="confirmPassword"
          required
        />
      </div>
      <div class="form group">
        <button type="button" @click="submit">Registrati</button>
      </div>
    </form>
  </div>
  <Teleport to="body">
    <Modal :show="showConfirmModal">
      <template #body>
        <input
          type="text"
          id="confirmCode"
          name="confirmCode"
          v-model.trim="confirmCode"
        />
        <button type="button" @click="confirmCodeSubmit"></button>
      </template>
    </Modal>
  </Teleport>
</template>

<style>
.login-container {
  background-color: beige;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 1);
  width: 300px;
}

.login-container h2 {
  text-align: center;
  color: #333;
}

.login-form {
  display: flex;
  flex-direction: column;
  margin-top: 20px;
}

.form-group label {
  margin-bottom: 8px;
  color: #555;
}

.form-group input {
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ccc;
}

.form-group button {
  background-color: gray;
  color: #fff;
  padding: 10px;
  border: none;
  font-size: 16px;
  cursor: pointer;
}

.form-group button {
  background-color: lightblue;
}
</style>
