import { ref, watchEffect } from "vue";
import type { Ref } from "vue";
import {
  CognitoUserPool,
  CognitoUserAttribute,
  ISignUpResult,
} from "amazon-cognito-identity-js";

export function useCognito(email: Ref<string>, password: Ref<string>) {
  const user: Ref<ISignUpResult> = ref(null);
  const error: Ref<string> = ref("");
  watchEffect(() => {
    if (email.value && password.value) {
      userPool.signUp(email.value, password.value, [], null, (err, result) => {
        if (err) {
          error.value = err.message;
        }
        user.value = result;
      });
    }
  });

  return {
    user,
    error,
  };
}
