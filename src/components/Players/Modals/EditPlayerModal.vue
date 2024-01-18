<template>
  <!-- Bootstrap Modal -->
  <div
    class="modal fade"
    id="editPlayerModal"
    tabindex="-1"
    aria-labelledby="editPlayerModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-lg modal-width">
      <Form @submit="Submit" :validation-schema="Schema" ref="editPlayerFormRef">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="editPlayerModalLabel">Add {{ player.Position }}</h5>
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
                <label for="firstName">First name</label>
                <Field
                  v-model="player.FirstName"
                  type="text"
                  class="form-control"
                  id="fistName"
                  name="firstName"
                />
                <ErrorMessage name="firstName" class="error-message" />
              </div>
              <div class="col">
                <label for="lastName">Last name</label>
                <Field
                  v-model="player.LastName"
                  type="text"
                  class="form-control"
                  id="lastName"
                  name="lastName"
                />
                <ErrorMessage name="lastName" class="error-message" />
              </div>
            </div>
            <div class="row align-items-center mt-3">
              <div class="col">
                <label for="weight">Weight</label>
                <Field
                  v-model="player.Weight"
                  type="number"
                  min="0"
                  class="form-control"
                  id="weight"
                  name="weight"
                />
                <ErrorMessage name="firstName" class="error-message" />
              </div>
              <div class="col">
                <label for="height">Height</label>
                <Field
                  v-model="player.Height"
                  type="number"
                  min="0"
                  class="form-control"
                  id="height"
                  name="height"
                />
                <ErrorMessage name="height" class="error-message" />
              </div>
            </div>
            <div class="row align-items-center mt-3">
              <div class="col-2">
                <label for="playerNumber">Number</label>
                <Field
                  v-model="player.Number"
                  type="number"
                  min="0"
                  class="form-control"
                  id="playerNumber"
                  name="playerNumber"
                />
                <ErrorMessage name="playerNumber" class="error-message" />
              </div>
              <div class="col-4">
                <label for="nationality">Nationality</label>
                <Field
                  v-model="player.Nationality"
                  type="number"
                  min="0"
                  class="form-control d-none"
                  id="nationality"
                  name="nationality"
                />
                <select
                  v-model="player.Nationality"
                  id="nationality"
                  class="form-control"
                  placeholder="Select nationality"
                >
                  <option
                    v-for="nationality in nationalities"
                    :key="nationality"
                    :value="nationality"
                    class="form-control"
                  >
                    {{ nationality }}
                  </option>
                </select>

                <ErrorMessage name="nationality" class="error-message" />
              </div>
              <div class="col">
                <label for="birthDate">Birth date</label>
                <Field
                  v-model="player.BirthDate"
                  type="date"
                  min="0"
                  class="form-control"
                  id="birthDate"
                  name="birthDate"
                />
                <ErrorMessage name="birthDate" class="error-message" />
              </div>
            </div>
            <div class="row mb-2 mt-4 align-items-center">
              <div class="col text-center">
                <div class="mt-2">
                  <label for="description">Description</label>
                  <Field
                    v-model="player.Description"
                    type="text"
                    min="0"
                    class="form-control"
                    id="description"
                    name="description"
                  />
                  <ErrorMessage name="description" class="error-message" />
                </div>
                <div class="mt-2">
                  <label for="biography">Biography</label>
                  <textarea
                    v-model="player.Biography"
                    rows="8"
                    class="form-control"
                    id="biography"
                    name="biography"
                  ></textarea>
                </div>
              </div>
              <div class="col text-center">
                <img class="img-thumbnail" :src="$utils.GetImageFormat(player.ImgBase64)" />
                <label class="custom-file-upload btn btn-success p-2 mt-2"
                  >Input image
                  <input type="file" @change="$utils.InputImage(player)" />
                </label>
              </div>
            </div>
            <div class="mt-2">
              <label class="custom-file-upload btn btn-success p-2 mt-2"
                >Add player images
                <input type="file" @change="InputImage()" />
              </label>
              <div class="row align-items-center mt-2">
                <div class="col-3 img-wrap" v-for="(img, index) in player.ImgGallery" :key="index">
                  <span class="close"
                    ><font-awesome-icon
                      :icon="['far', 'circle-xmark']"
                      style="color: #e11414"
                      @click="RemoveImage(index)"
                  /></span>
                  <img class="img-gallery" :src="$utils.GetImageFormat(img)" />
                </div>
              </div>
            </div>
          </div>

          <div class="custom-modal-footer text-center p-3">
            <button type="submit" class="btn btn-success w-50">Publish</button>
          </div>
        </div>
      </Form>
    </div>
  </div>
</template>

<script>
import * as yup from "yup";
import { Field, Form, ErrorMessage } from "vee-validate";
import moment from "moment";
export default {
  name: "EditPlayerModal",
  emits: ["get"],
  components: {
    Field,
    Form,
    ErrorMessage,
  },
  props: {
    player: Object,
  },
  data() {
    return {
      nationalities: "",
    };
  },
  methods: {
    RemoveImage(id) {
      this.player.ImgGallery.splice(id, 1);
    },
    InputImage() {
      const fileInput = event.target;
      const file = fileInput.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.player.ImgGallery.push(reader.result);
        fileInput.value = "";
      };
      if (file) {
        reader.readAsDataURL(file);
      }
    },
    ClearModal() {
      const countries = require("countries-list");
      const countryCodes = Object.keys(countries.countries);
      this.nationalities = countryCodes.map((code) => countries.countries[code].name);
    },
    Submit() {
      this.$axios
        .put(`/api/Player/edit/${this.player.Id}`, this.player)
        .then(() => {
          this.$emit("get");
          $("#editPlayerModal").modal("hide");
        })
        .catch(() => {
          this.$swal.fire("Something went wrong", "", "error");
        });
    },
  },
  computed: {
    Schema() {
      return yup.object({
        firstName: yup
          .string()
          .required("First name is required")
          .min(3, "First name must have at least 3 characters")
          .max(30, "First name must have at max 30 characters"),
        lastName: yup
          .string()
          .required("Last name is required")
          .min(3, "Last name must have at least 3 characters")
          .max(30, "Last name must have at max 30 characters"),
        weight: yup.number().required("Weight is required").positive("Weight cannot be negative"),
        height: yup.number().required("Height is required").positive("Height cannot be negative"),
        playerNumber: yup
          .number()
          .required("Player number is required")
          .positive("Player number cannot be negative"),
        birthDate: yup
          .date()
          .required("Birth date is required")
          .max(new Date(), "Birth date cannot be in the future"),
      });
    },
  },
};
</script>

<style scoped>
.custom-file-upload input {
  display: none;
}

.img-thumbnail {
  width: 100%;
  height: 14rem;
}

.img-gallery {
  width: 100%;
  height: 8rem;
}

.img-wrap {
  position: relative;
}
.img-wrap .close {
  position: absolute;
  top: 5px;
  right: 15px;
  z-index: 100;
  cursor: pointer;
}

.custom-modal-footer {
  border-top: 1px solid #2b2a2a3e;
}
</style>
