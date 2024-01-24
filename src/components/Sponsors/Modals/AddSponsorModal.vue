<template>
  <!-- Modal -->
  <div
    class="modal fade"
    id="addSponsorModal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="addSponsorModal"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-lg modal-width">
      <Form @submit="Submit" :validation-schema="schema" ref="addSponsorFormRef">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="addSponsorModalLabel">Adauga Trofeu</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div class="row align-items-center mt-3">
              <div class="col">
                <label for="name">Nume sponsor</label>
                <Field
                  v-model="sponsor.Name"
                  type="text"
                  class="form-control"
                  id="name"
                  name="name"
                  placeholder="Nume sponsor"
                />
                <ErrorMessage name="name" class="error-message" />
              </div>
              <div class="col">
                <label for="descriere">Link</label>
                <Field
                  v-model="sponsor.Link"
                  type="text"
                  class="form-control"
                  id="link"
                  name="link"
                  placeholder="Link pagina sponsor"
                />
                <ErrorMessage name="link" class="error-message" />
              </div>
            </div>
            <div class="mt-2 row align-items-center">
              <div class="col ms-5">
                <label class="custom-file-upload btn btn-success p-2 mt-2"
                  >Add sponsor image
                  <input type="file" @change="$utils.InputImage(sponsor)" />
                </label>
              </div>
              <div class="col">
                <img class="img-gallery" :src="$utils.GetImageFormat(sponsor.ImgBase64)" />
              </div>
            </div>
          </div>

          <div class="custom-modal-footer text-center p-3">
            <button type="submit" class="btn btn-success w-50">Submit</button>
          </div>
        </div>
      </Form>
    </div>
  </div>
</template>

<script>
import * as yup from "yup";
import { Field, Form, ErrorMessage } from "vee-validate";
export default {
  name: "AddSponsorModal",
  emits: ["create"],
  data() {
    return {
      sponsor: {},
    };
  },
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  methods: {
    ClearModal() {
      this.$refs.addSponsorFormRef.resetForm();
      this.sponsor.ImgBase64 = "";
    },
    Submit() {
      this.$emit("create", this.sponsor);
    },
  },
  computed: {
    schema() {
      return yup.object({
        name: yup.string().required("Sponsor name is required"),
        link: yup.string().required("Link to sponsor webpage is required"),
      });
    },
  },
};
</script>

<style>
.img-gallery {
  width: 175px;
  height: 175px;
}
.custom-file-upload input {
  display: none;
}
</style>
