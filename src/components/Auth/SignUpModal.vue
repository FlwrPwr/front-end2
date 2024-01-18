<template>
    <Form :validation-schema="schema" @submit="handleSignup" ref="signUpModalRef">
        <div class="modal fade" id="signUpModal" tabindex="-1" aria-labelledby="signUpModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="text-end p-2">
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="text-center">
                        <h3 class="modal-title" id="signUpModalLabel">Înregistrare</h3>
                    </div>
                    <div class="modal-body p-4 m-2">
                        <div class="pb-2">
                            <label for="name_reg" class="pb-2">Nume Complet</label>
                            <Field v-model="user.Name" type="email" name="name_reg" id="name_reg" placeholder="Nume complet"
                                class="form-control" />
                            <ErrorMessage name="name_reg" />
                        </div>
                        <div class="mt-3">
                            <label for="email_reg" class="pb-2">Adresa de email</label>
                            <Field v-model="user.Email" type="email" name="email_reg" id="email_reg" placeholder="Email"
                                class="form-control" />
                            <ErrorMessage name="email_reg" />
                        </div>
                        <div class="mt-3">

                            <label for="password_reg" class="pb-2">Parola</label>
                            <div class="text-container">
                                <Field v-model="user.Password" :type="[showPassword ? 'text' : 'password']"
                                    name="password_reg" id="password_reg" placeholder="Parola" class="form-control " />
                                <span class="show-passoword" @pointerdown="showPassword = true"
                                    @pointerup="showPassword = false">
                                    <div v-if="showPassword">
                                        <font-awesome-icon :icon="['fas', 'eye']" />
                                    </div>
                                    <div v-else>
                                        <font-awesome-icon :icon="['fas', 'eye-slash']" />
                                    </div>
                                </span>
                            </div>
                            <ErrorMessage name="password_reg" />
                        </div>

                        <div class="mt-3">
                            <label for="confirm_password_reg" class="pb-2 ">Confirmare parola</label>
                            <div class="text-container">
                                <Field v-model="user.ConfirmPassword" :type="[showConfirmedPassword ? 'text' : 'password']"
                                    name="confirm_password_reg" id="confirm_password_reg" placeholder="Parola"
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
                            <ErrorMessage name="confirm_password_reg" />
                            <div class="form-check ">
                                <Field v-model="user.TermsAndConfitions" class="form-check-input" type="checkbox"
                                    value="true" id="acceptTerms" name="acceptTerms" />
                                <label class="form-check-label" for="acceptTerms">
                                    Sunt de acord cu Termenii și Condițiile site-ului!
                                </label>
                                <ErrorMessage name="acceptTerms" />
                            </div>
                            <div class="row p-2 mt-4 pb-0">
                                <button class="btn btn-danger p-2">Creeaza cont</button>
                                <div class="col mt-3" @click="$emit('passwordRecovery', 'signUpModal')">Am uitat parola</div>
                                <div class="col-auto mt-3" @click="$emit('logIn', 'signUpModal')">Autentificare</div>
                            </div>

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
  name: 'SignUpModal',

  data() {
    return {
      user: {
        TermsAndConfitions: false,
      },
      showPassword: false,
      showConfirmedPassword: false,
    };
  },
  methods: {
    handleSignup() {
      this.user.UserName = `${this.user.FirstName} ${this.user.LastName}`;
      this.loading = true;
      this.message = '';
      this.successful = false;

      this.$store.dispatch('auth/register', this.user).then(() => {
        this.$swal.fire('Cont creat cu succes!', 'Validează contul apăsând pe link-ul de confirmare trimis la adresa ta de email.', 'success');
        this.loading = false;
      }).catch(() => {
        this.$swal.fire('Ceva nu a functionat:(', 'Va rugam sa verificati daca ati introdus toate datele corect sau incercati din nou mai tarziu', 'error');
        this.loading = false;
      });
    },
    ClearModal() {
      this.showPassword = false;
      this.showConfirmedPassword = false;
      this.$refs.signUpModalRef.resetForm();
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
        name_reg: yup.string().required('Numele este necesar').test('verify-name', 'Va rugam introduceti numele complet',
          (name) => {
            const verifyName = name.split(' ');
            if (verifyName.length < 2) { return false; }
            console.log(verifyName.length);
            return true;
          }),
        email_reg: yup.string().email('Email-ul nu este valid').required('Email este necesar'),
        password_reg: yup.string().min(3).required('Parola este obligatorie')
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
        confirm_password_reg: yup.string().required('Va rugam confirmati parola')
          .test('check-password', 'Parolele nu se potrivesc',
            (confirmPassword) => confirmPassword === this.user.Password),
        acceptTerms: yup.boolean().required().test('accept-terms', 'Va rugam acceptati termeni si conditiile!',
          (terms) => terms),
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
