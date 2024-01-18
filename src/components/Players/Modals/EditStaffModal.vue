<template>
    <!-- Bootstrap Modal -->
    <div class="modal fade" id="editStaffModal" tabindex="-1" aria-labelledby="editStaffModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg modal-width">
            <Form @submit="Submit" :validation-schema="Schema" ref="editStaffFormRef">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="editStaffModalLabel">Edit {{ member.Role }}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="row align-items-center mt-3">
                            <div class="col">
                                <label for="firstName">First name</label>
                                <Field v-model="member.FirstName" type="text" class="form-control" id="fistName"
                                    name="firstName" />
                                <ErrorMessage name="firstName" class="error-message" />
                            </div>
                            <div class="col">
                                <label for="lastName">Last name</label>
                                <Field v-model="member.LastName" type="text" class="form-control" id="lastName"
                                    name="lastName" />
                                <ErrorMessage name="lastName" class="error-message" />
                            </div>
                        </div>
                        <div class="row align-items-center mt-3">
                            <div class="col-4">
                                <label for="nationality">Nationality</label>
                                <Field v-model="member.Nationality" type="number" min="0" class="form-control d-none"
                                    id="nationality" name="nationality" />
                                <select v-model="member.Nationality" id="nationality" class="form-control"
                                    placeholder="Select nationality">
                                    <option v-for="nationality in nationalities" :key="nationality" :value="nationality"
                                        class="form-control">
                                        {{ nationality }}
                                    </option>
                                </select>

                                <ErrorMessage name="nationality" class="error-message" />
                            </div>
                            <div class="col">
                                <label for="birthDate">Birth date</label>
                                <Field v-model="member.BirthDate" type="date" min="0" class="form-control" id="birthDate"
                                    name="birthDate" />
                                <ErrorMessage name="birthDate" class="error-message" />
                            </div>
                        </div>
                        <div class="row mb-2 mt-4 align-items-center">
                            <div class="col text-center">
                                <img :src="$utils.GetImageFormat(member.ImgBase64)">
                                <label class="custom-file-upload btn btn-success p-2 mt-2">Input image
                                    <input type="file" @change="$utils.InputImage(member)" />
                                </label>
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
import * as yup from 'yup';
import { Field, Form, ErrorMessage } from 'vee-validate';
export default {
    name: 'EditStaffModal',
    emits: ['get'],
    components: {
        Field,
        Form,
        ErrorMessage,
    },
    props: {
        member: {},
    },
    data() {
        return {
            nationalities: '',
        };
    },
    methods: {
        ClearModal() {
            const countries = require('countries-list');
            const countryCodes = Object.keys(countries.countries);
            this.nationalities = countryCodes.map(code => countries.countries[code].name);
        },
        Submit() {
            this.$axios.put(`/api/Staff/edit/${this.member.Id}`, this.member).then(() => {
                this.$emit('get');
                $('#editStaffModal').modal('hide');
            }).catch(() => {
                this.$swal.fire('Something went wrong', '', 'error');
            });
        }
    },
    computed: {
        Schema() {
            return yup.object({
                firstName: yup.string().required('First name is required').min(3, 'First name must have at least 3 characters').max(30, 'First name must have at max 30 characters'),
                lastName: yup.string().required('Last name is required').min(3, 'Last name must have at least 3 characters').max(30, 'Last name must have at max 30 characters'),
                birthDate: yup.date().required('Birth date is required').max(new Date(), 'Birth date cannot be in the future')
            });
        },
    },
}
</script>

<style scoped>
.custom-file-upload input {
    display: none;
}

img {
    width: 60%;
    height: 14rem;
}

.custom-modal-footer {
    border-top: 1px solid #2b2a2a3e;
}</style>