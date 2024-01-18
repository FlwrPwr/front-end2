<template>
    <Form :validation-schema="schema" @submit="Submit" ref="passwordRecoveryModalRef">
        <div class="modal fade" id="passwordRecoveryModal" tabindex="-1" aria-labelledby="passwordRecoveryModalLabel"
            aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="text-end p-2">
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="text-center">
                        <h3 class="modal-title" id="passwordRecoveryModalLabel">Recuperare parolă</h3>
                    </div>
                    <div class="modal-body p-4 m-2">
                        <p>Introdu mai jos adresa de email aferentă contului tău. Vei primi un mail de resetare a parolei.</p>
                        <div class="mt-3">
                            <label for="email_recovery" class="pb-2">Adresa de email</label>
                            <Field v-model="user.Email" type="email" name="email_recovery" id="email_recovery" placeholder="Email"
                                class="form-control" />
                            <ErrorMessage name="email_recovery" />
                        </div>
                        <div class="mt-3">
                            <div class="row p-2 mt-4 pb-0">
                                <button class="btn btn-danger p-2">Resetare</button>
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
  name: 'PasswordRecoveryModal',
  data() {
    return {
      user: {
      },
    };
  },
  methods: {
    Submit() {
      this.$axios.post('/api/Auth/forgotPassword', this.user).then(() => {
        this.$swal.fire('Email sent succesfuly', '', 'success');
         no-undef
        $('#passwordRecoveryModal').modal('hide');
      }).catch(() => {
        this.$swal.fire('Something went wrong', '', 'error');
      });
    },
    ClearModal() {
      this.$refs.passwordRecoveryModalRef.resetForm();
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
        email_recovery: yup.string().email('Email-ul nu este valid').required('Email este necesar'),
      });
    },
  },
};
</script>
