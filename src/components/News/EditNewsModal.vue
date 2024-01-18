<template>
    <!-- Bootstrap Modal -->
    <div class="modal fade" id="editNewsModal" tabindex="-1" aria-labelledby="editNewsModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg modal-width">
            <div class="modal-content">
                <Form @submit="Submit" :validation-schema="schema" ref="editNewsModalFormRef">
                    <div class="modal-header">
                        <h5 class="modal-title" id="editNewsModalLabel">Add news</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="pb-2">
                            <label for="title">Title</label>
                            <Field v-model="article.Title" type="text" id="title" name="title" class="from-control" />
                            <ErrorMessage name="title" />
                        </div>

                        <div class="row align-items-center">
                            <div class="col">
                                <label for="description">Description</label>
                                <input v-model="article.ShortDescription" type="text" id="description" name="description"
                                    class="from-control">
                            </div>
                            <div class="col">
                                <div class="row align-items-center">
                                    <div class="col">
                                        <label for="tags">Input tag</label>
                                        <input v-model="tag" type="text" id="tags" name="tags" class="from-control">
                                    </div>
                                    <div class="col-auto">
                                        <button class="btn btn-success mt-4 p-2" @click="AddTag" type="button">Add
                                            tag</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="ms-2 mt-2">
                            <h3>Added tags:</h3>
                            <div class="row align-items-center">
                            <div class="col-auto custome-tag ms-2 me-2" v-for="(tag, index) in addedTags" :key="index">
                                <div class="p-2" @click="DeleteTag(index)">{{ tag }}</div>
                            </div></div>
                        </div>
                        <div class="text-center mb-2 mt-4">
                            <label class="custom-file-upload btn btn-success p-2">Input image
                                <input type="file" @change="$utils.InputImage(article)" />
                            </label>
                        </div>
                        <div class="text-center">
                            <img :src="$utils.GetImageFormat(article.ImgBase64)" >
                        </div>
                        <div class="pt-2 border rounded p-2 mt-4">
                            <Editor v-model="article.Content" />
                            <!-- <Field v-model="article.Content" name="content" class="d-none"/> -->
                            <!-- <ErrorMessage name="content" /> -->
                        </div>
                    </div>
                    <div class="modal-footer row">
                        <div class="col">
                            <button type="submit" class="btn btn-secondary">Draft</button>
                        </div>
                        <div class="col">
                            <button type="submit" class="btn btn-success">Publish</button>
                        </div>
                    </div>
                </Form>
            </div>
        </div>

    </div>
</template>
  
<script>
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import * as yup from 'yup';
import { Field, Form, ErrorMessage } from 'vee-validate';
import Editor from './Editor.vue';
export default {
    emits: ['get'],
    name: 'EditNews',
    props: {
        article: Object,
        addedTags: Array,
    },
    data() {
        return {
            tag: '',
        };
    },
    components: {
        Form,
        Field,
        ErrorMessage,
        Editor,
    },
    methods: {
        Submit() {
            this.article.Tags = this.addedTags.toString();
            this.$axios.put(`/api/Article/edit/${this.article.Id}`, this.article).then(() => {
                this.$emit('get');
                $('#editNewsModal').modal('hide');
            }).catch(() => {
                this.$swal.fire('Something went wrong', '', 'error');
            });
        },
        AddTag() {
            if (this.tag)
                this.addedTags.push('#' + this.tag);
            this.tag = '';
        },
        DeleteTag(index) {
            this.addedTags.splice(index, 1);
        }
    },
    computed: {
        schema() {
            return yup.object({
                title: yup.string().required(),
                description: yup.string().notRequired(),
                // content: yup.string().required(),
            });
        }
    }
}
</script>
  
  
<style scoped>
img {
    height: 80%;
    width: 60%;
}
.custom-file-upload input {
    display: none;
}

.custome-tag {
    border: 2px solid #000000;
    border-radius: 10px;
    padding: 3px;
}
.custome-tag:hover{
    cursor: pointer;
    background-color: rgba(233, 110, 110, 0.507);
}
</style>
    
    