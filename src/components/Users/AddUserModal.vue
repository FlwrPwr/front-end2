<template>
  <div
    class="modal fade"
    id="addUserModal"
    tabindex="-1"
    aria-labelledby="addUserModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <Form ref="addUserFormRef" @submit="Submit" :validation-schema="schema" v-slot="{ errors }">
          <div class="modal-header">
            <!-- <img src="../../../assets/images/icons/add-linear-20x20.svg" class="action-icon" /> -->
            <h5 class="modal-title" id="addUserModalLabel">Add user</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              @click="ClearModal"
            ></button>
          </div>
          <div class="modal-body">
            <div class="mb-3">
              <label for="firstName">First name</label>
              <Field
                v-model="user.FirstName"
                class="form-control"
                type="text"
                name="firstName"
                id="firstName"
                placeholder="First name"
                :class="{ 'border-danger': errors.firstName }"
              />
              <ErrorMessage name="firstName" class="error-message" />
            </div>
            <div class="mb-3">
              <label for="lastName">Last name</label>
              <Field
                v-model="user.LastName"
                class="form-control"
                type="text"
                name="lastName"
                id="lastName"
                placeholder="Last name"
                :class="{ 'border-danger': errors.lastName }"
              />
              <ErrorMessage name="lastName" class="error-message" />
            </div>
            <div class="mb-3">
              <label for="email">Email</label>
              <Field
                v-model="user.Email"
                class="form-control"
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                :class="{ 'border-danger': errors.email }"
              />
              <ErrorMessage name="email" class="error-message" />
            </div>
            <div class="mb-3">
              <label for="email">Phone number</label>
              <Field
                v-model="user.PhoneNumber"
                class="form-control"
                type="text"
                name="phoneNumber"
                id="phoneNumber"
                placeholder="Phone number"
                :class="{ 'border-danger': errors.phoneNumber }"
              />
              <ErrorMessage name="phoneNumber" class="error-message" />
            </div>
            <label for="role">Role</label>
            <Field v-slot="{ field }" name="role">
              <VueMultiselect
                v-model="user.Role"
                v-bind="field"
                placeholder="Select role"
                class="custom-multiselect"
                :class="{ 'border-danger-multiselect': errors.role }"
                id="role"
                :options="['Admin', 'User']"
                :close-on-select="true"
                select-label=""
              />
            </Field>

            <ErrorMessage name="role" class="error-message" />
          </div>
          <div class="modal-footer justify-content-center">
            <button class="button btn-success-solid btn-medium w-100">Save</button>
          </div>
        </Form>
      </div>
    </div>
  </div>
</template>

<script>
import VueMultiselect from "vue-multiselect";
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";

export default {
  name: "AddUserModal",
  emits: ["save"],
  data() {
    return {
      user: {},
    };
  },
  components: {
    VueMultiselect,
    Form,
    Field,
    ErrorMessage,
  },
  methods: {
    Submit() {
      if (!this.user.Role) {
        this.user.Role = "User";
      }
      this.$emit("save", this.user);
    },
    ClearModal() {
      this.$refs.addUserFormRef.resetForm();
    },
  },
  computed: {
    schema() {
      return yup.object({
        firstName: yup.string().required("First name is required.").trim(),
        lastName: yup.string().required("Last name is required.").trim(),
        email: yup.string().required("Email is required.").email().trim(),
        role: yup.string().required("Role is required."),
        phoneNumber: yup
          .string()
          .notRequired()
          .min(10, "Phone number is not valid.")
          .trim()
          .test("validate-phone", "Phone number is not valid.", (phoneNumber) => {
            if (!phoneNumber) return true;
            return /^([\\+]?40[-]?|[0])?[1-9][0-9]{8}$/.test(phoneNumber);
          }),
      });
    },
  },
};
</script>
