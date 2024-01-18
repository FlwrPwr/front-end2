<template>
  <Form :validation-schema="schema" @submit="handleLogin" ref="logInModalRef">
    <div class="modal fade" id="logInModal" tabindex="-1" aria-labelledby="logInModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="text-end p-2">
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="text-center">
            <h3 class="modal-title" id="logInModalLabel">Autentificare</h3>
          </div>
          <div class="modal-body p-4 m-2">
            <div class="mt-2">
            <label for="email" class="pb-2">Adresa de email</label>
            <Field v-model="user.Email" type="email" name="email" id="email" placeholder="Email" class="form-control" />
            <ErrorMessage name="email" />
          </div>
          <div class="mt-4">
            <label for="password" class="pb-2 ">Parola</label>
            <div class="text-container">
              <Field v-model="user.Password" :type="[showPassword ? 'text' : 'password']" name="password" id="password" placeholder="Parola"
                class="form-control " />
              <span class="show-passoword" @pointerdown="showPassword = true" @pointerup="showPassword = false">
                <div v-if="showPassword">
                  <font-awesome-icon :icon="['fas', 'eye']" />
                </div>
                <div v-else>
                  <font-awesome-icon :icon="['fas', 'eye-slash']" />
                </div>
              </span>
            </div>
          </div>
            <ErrorMessage name="password" />
            <div class="form-check mt-4">
              <input v-model="user.RememberMe" class="form-check-input" type="checkbox" value="true" id="rememberMe">
              <label class="form-check-label" for="rememberMe">
                Păstrează-mă autentificat!
              </label>
            </div>
            <div class="row p-2 mt-4 pb-0">
              <button class="btn btn-danger p-2">Autentificare</button>
              <div class="col mt-3" @click="$emit('passwordRecovery', 'logInModal')">Am uitat parola</div>
              <div class="col-auto mt-3" @click="$emit('signUp', 'logInModal')">Cont nou</div>
            </div>
          </div>
          <hr>
          <div class="m-4 p-2 mt-0">
            <p>Alte optiuni de conectare:</p>
            <div class="row">
              <div class="col border rounded p-2 text-center me-2">
                <font-awesome-icon :icon="['fab', 'facebook']" style="color: #ff0040;" /> Faceook
              </div>
              <div class="col  border rounded p-2 text-center me-2">
                <font-awesome-icon :icon="['fab', 'google']" style="color: #ff0040;" /> Google
              </div>
              <div class="col  border rounded p-2 text-center">
                <font-awesome-icon :icon="['fab', 'microsoft']" style="color: #ff0040;" /> Microsoft
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
  name: 'LogInModal',
  emits: ['passwordRecovery', 'signUp'],
  data() {
    return {
      user: {
        RememberMe: false,
      },
      showPassword: false,
    };
  },
  methods: {
    handleLogin() {
      this.$store.state.loader = true;

      this.$store.dispatch('auth/login', this.user).then(
        () => {
          this.$store.state.loader = false;
          this.$swal.fire({
            title: 'Autentificare cu succes!',
            titleColor: '#3C7318',
            text: '',
            icon: 'success',
            iconColor: '#3C7318',
            buttonsStyling: true,
          });
           no-undef
          $('#logInModal').modal('hide');
        },
        (error) => {
          this.$store.state.loader = false;
          this.message = error.response.data;
          this.$swal.fire('Error', 'Something went wrong.', 'error');
        },
      );
    },
    ClearModal() {
      this.showPassword = false;
      this.$refs.logInModalRef.resetForm();
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
        email: yup.string().email('Adresa introdusa nu este valida').required('Email este necesar'),
        password: yup.string().required('Va rugam introduceti parola pentru a va putea conecta'),
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
