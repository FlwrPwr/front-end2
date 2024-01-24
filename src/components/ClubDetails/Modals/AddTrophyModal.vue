<template>
  <!-- Modal -->
  <div
    class="modal fade"
    id="addTrophyModal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="addTrophyModal"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-lg modal-width">
      <Form @submit="Submit" :validation-schema="Schema" ref="addTrophyFormRef">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="addTrophyModalLabel">Adauga Trofeu</h5>
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
                <label for="competitionName">Nume competitie</label>
                <Field
                  v-model="trophy.Name"
                  type="text"
                  class="form-control"
                  id="competitionName"
                  name="competitionName"
                />
                <ErrorMessage name="competitionName" class="error-message" />
              </div>
              <div class="col">
                <label for="competitionDate">Data competitie</label>
                <Field
                  v-model="trophy.Date"
                  type="date"
                  class="form-control"
                  id="competitionDate"
                  name="competitionDate"
                />
                <ErrorMessage name="competitionDate" class="error-message" />
              </div>
            </div>
            <div class="mt-2 row align-items-center">
              <div class="col ms-5">
                <label class="custom-file-upload btn btn-success p-2 mt-2"
                  >Add trophy image
                  <input type="file" @change="$utils.InputImage(trophy)" />
                </label>
              </div>
              <div class="col">
                <img class="img-gallery" :src="$utils.GetImageFormat(trophy.ImgBase64)" />
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
  name: "AddTrophyModal",
  emits: ["create"],
  data() {
    return {
      trophy: {
        ImgBase64: {},
      },
    };
  },
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  methods: {
    Submit() {
      this.$emit("create", this.trophy);
    },
    ClearModal() {
      this.$refs.addTrophyFormRef.resetForm();
      this.trophy.ImgBase64 = "";
    },
  },
  computed: {
    Schema() {
      return yup.object({
        competitionName: yup.string().required("Sponsor name is required"),
        competitionDate: yup.date().required("Link to sponsor webpage is required"),
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
