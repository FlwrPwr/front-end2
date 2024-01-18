<!-- eslint-disable vue/no-mutating-props -->
<template>
  <Form :validation-schema="schema" @submit="ChangePassword" ref="changePasswordModalRef">
    <div class="modal fade" id="changePasswordModal" tabindex="-1" aria-labelledby="changePasswordModalLabel"
      aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="text-end p-2">
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="text-center">
            <h3 class="modal-title" id="changePasswordModalLabel">Înregistrare</h3>
          </div>
          <div class="modal-body p-4 m-2">
            <div class="mt-3">
              <label for="password_change" class="pb-2">Parola</label>
              <div class="text-container">
                <Field v-model="user.Password" :type="[showPassword ? 'text' : 'password']" name="password_change"
                  id="password_change" placeholder="Parola" class="form-control " />
                <span class="show-passoword" @pointerdown="showPassword = true" @pointerup="showPassword = false">
                  <div v-if="showPassword">
                    <font-awesome-icon :icon="['fas', 'eye']" />
                  </div>
                  <div v-else>
                    <font-awesome-icon :icon="['fas', 'eye-slash']" />
                  </div>
                </span>
              </div>
              <ErrorMessage name="password_change" />
            </div>

            <div class="mt-3">
              <label for="confirm_password_change" class="pb-2 ">Confirmare parola</label>
              <div class="text-container">
                <Field v-model="user.ConfirmPassword" :type="[showConfirmedPassword ? 'text' : 'password']"
                  name="confirm_password_change" id="confirm_password_change" placeholder="Parola"
                  class="form-control " />
                <span class="show-passoword" @pointerdown="showConfirmedPassword = true"
                  @pointerup="showConfirmedPassword = false">
                  <div v-if="showConfirmedPassword">
                    <font-awesome-icon :icon="['fas', 'eye']" />
                  </div>
                  <div v-else>
                    <font-awesome-icon :icon="['fas', 'eye-slash']" />
                  </div>
                </span>
              </div>
            </div>
            <div class="mt-3">
              <div class="row p-2 mt-4 pb-0">
                <button class="btn btn-danger p-2">Schimba Parola</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Form>
</template>

<script>
import { Field, ErrorMessage, Form } from 'vee-validate';
import * as yup from 'yup';

export default {
  name: 'ChangePasswordModal',
  props: {
    user: {},
  },
  data() {
    return {
      showPassword: false,
      showConfirmedPassword: false,
    };
  },
  methods: {
    ChangePassword() {
      this.$axios
        .post('/api/Auth/resetPassword', this.user)
        .then(() => {
          this.$swal
            .fire('Success!', 'Password has been changed succesfuly', 'success')
            .then(() => {
              this.$swal.fire('Error', 'Something went wrong.', 'error');
               no-undef
              $('#changePasswordModal').modal('show');
            });
        })
        .catch(() => {
          this.$swal.fire('Error', 'Something went wrong.', 'error');
        });
    },
    ClearModal() {
      this.showPassword = false;
      this.showConfirmedPassword = false;
      this.$refs.changePasswordModalRef.resetForm();
    },
  },
  components: {
    Field,
    ErrorMessage,
    Form,
  },
  computed: {
    schema() {
      return yup.object({
        password_change: yup.string().min(3).required('Parola este obligatorie')
          .test('password-complecity', 'Parola trebuie sa contina macar o majuscula, un caracter special si o cifra',
            (password) => {
              const specialCharRegex = /[!@#$%^&*()_+{}[\]:;<>,.?~]/;
              const numberRegex = /[0-9]/;
              const uppercaseRegex = /[A-Z]/;
              return (
                specialCharRegex.test(password) &&
              numberRegex.test(password) &&
              uppercaseRegex.test(password)
              );
            }),
        confirm_password_change: yup.string().required('Va rugam confirmati parola')
          .test('check-password', 'Parolele nu se potrivesc',
            (confirmPassword) => confirmPassword === this.user.Password),
      });
    },
  },
};
</script>

<style scoped>
.b-color-check {
  background-color: #ff0040 !important;
  border-color: #ff0040;
}

.form-check-input:checked {
  background-color: #ff0040;
  border-color: #ff0040;
}

.text-container {
  position: relative;
  
}

.show-passoword {
  position: absolute;
  top: 7px;
  right: 5px;
  transition: right 0.2s;
}

.show {
  right: 5px;
}
</style>
