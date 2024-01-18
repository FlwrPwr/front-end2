<template>
    <div v-if="editor">
      <div class="page-header editor-height">
        <div class="row align-items-center justify-content-between">
          <div class="col mb-3 mb-xxl-0">
            <div v-if="showTitle" class="heading-01 text-neutral-08 fw-semibold">Edit content</div>
          </div>
          <div class="col-auto">
            <div class="row pointer">
              <div class="col">
                <font-awesome-icon :icon="['fas', 'bold']" @click="editor.chain().focus().toggleBold().run()" :disabled="!editor.can().chain().focus().toggleBold().run()" :class="{ 'is-active': editor.isActive('bold') }" />
              </div>
              <div class="col">
                <font-awesome-icon :icon="['fas', 'italic']" @click="editor.chain().focus().toggleItalic().run()" :disabled="!editor.can().chain().focus().toggleItalic().run()" :class="{ 'is-active': editor.isActive('italic') }" />
              </div>
              <div class="col">
                <font-awesome-icon :icon="['fas', 'underline']" @click="editor.chain().focus().toggleUnderline().run()" :class="{ 'is-active': editor.isActive('underline') }" />
              </div>
              <div class="col">
                <font-awesome-icon :icon="['fas', 'strikethrough']" @click="editor.chain().focus().toggleStrike().run()" :disabled="!editor.can().chain().focus().toggleStrike().run()" :class="{ 'is-active': editor.isActive('strike') }" />
              </div>
              <div class="col">
                <input type="color" @input="editor.chain().focus().setColor($event.target.value).run()" id="color" v-model="color" class="d-none" />
                <label for="color">
                  <font-awesome-icon :icon="['fas', 'droplet']" :class="{ 'is-active': editor.isActive('textStyle', { color: '#958DF1' }) }" :style="{ color: color }" /></label>
              </div>
              <div class="col">
                <font-awesome-icon :icon="['fas', 'rotate-left']" @click="editor.chain().focus().undo().run()" :disabled="!editor.can().chain().focus().undo().run()" />
              </div>
              <div class="col">
                <font-awesome-icon :icon="['fas', 'rotate-right']" @click="editor.chain().focus().redo().run()" :disabled="!editor.can().chain().focus().redo().run()" />
              </div>
              <div class="col">
                <font-awesome-icon :icon="['fas', 'list']" @click="editor.chain().focus().toggleOrderedList().run()" :class="{ 'is-active': editor.isActive('orderedList') }" />
              </div>
              <div class="col">
                <font-awesome-icon :icon="['fas', 'align-left']" @click="editor.chain().focus().setTextAlign('left').run()" :class="{ 'is-active': editor.isActive({ textAlign: 'left' }) }" />
              </div>
              <div class="col">
                <font-awesome-icon :icon="['fas', 'align-center']" @click="editor.chain().focus().setTextAlign('center').run()" :class="{ 'is-active': editor.isActive({ textAlign: 'center' }) }" />
              </div>
              <div class="col">
                <font-awesome-icon :icon="['fas', 'align-right']" @click="editor.chain().focus().setTextAlign('right').run()" :class="{ 'is-active': editor.isActive({ textAlign: 'right' }) }" />
              </div>
              <div class="col">
                <font-awesome-icon :icon="['fas', 'align-justify']" @click="editor.chain().focus().setTextAlign('justify').run()" :class="{ 'is-active': editor.isActive({ textAlign: 'justify' }) }" />
              </div>
              <div class="col">
                <font-awesome-icon :icon="['fas', 'paperclip']" @click="setLink" :class="{ 'is-active': editor.isActive('link') }" />
              </div>
            </div>
          </div>
          <div class="col"></div>
          <!-- <div class="col-auto" style="width: 70px"></div> -->
        </div>
      </div>
  
      <editor-content :editor="editor" class="editor-container" />
  
    </div>
  </template>
  
  <script>
  import StarterKit from '@tiptap/starter-kit';
  import { Editor, EditorContent } from '@tiptap/vue-3';
  import { Color } from '@tiptap/extension-color';
  import Document from '@tiptap/extension-document';
  import Link from '@tiptap/extension-link';
  import Paragraph from '@tiptap/extension-paragraph';
  import Text from '@tiptap/extension-text';
  import TextStyle from '@tiptap/extension-text-style';
  import Underline from '@tiptap/extension-underline';
  import TextAlign from '@tiptap/extension-text-align';
  import Code from '@tiptap/extension-code';
  
  export default {
    /* eslint-disable */
    components: {
      EditorContent,
    },
  
    props: {
      modelValue: {
        type: String,
        default: '',
      },
      showTitle: Boolean,
    },
  
    emits: ['update:modelValue'],
  
    data() {
      return {
        editor: null,
        color: '#000000',
      };
    },
    watch: {
      modelValue(value) {
        // HTML
        const isSame = this.editor.getHTML() === value;
        // JSON
        // const isSame = JSON.stringify(this.editor.getJSON()) === JSON.stringify(value)
        // this.editor.commands.focus('end');
        if (isSame) {
          return;
        }
        this.editor.commands.setContent(value, false);
      },
    },
  
    mounted() {
      this.editor = new Editor({
        extensions: [
          StarterKit,
          Document,
          Text,
          Color.configure({
            types: ['textStyle'],
          }),
          TextStyle,
          Underline,
          Paragraph,
          TextAlign.configure({
            types: ['heading', 'paragraph'],
          }),
          Code,
          Link.configure({
            openOnClick: false,
          }),
        ],
        content: this.modelValue,
        autofocus: true,
        onUpdate: () => {
          // HTML
          this.$emit('update:modelValue', this.editor.getHTML());
  
          // JSON
          // this.$emit('update:modelValue', this.editor.getJSON())
        },
      });
    },
    methods: {
      setLink() {
        const previousUrl = this.editor.getAttributes('link').href;
        // eslint-disable-next-line no-alert
        const url = window.prompt('URL', previousUrl);
        // cancelled
        if (url === null) {
          return;
        }
        // empty
        if (url === '') {
          this.editor.chain().focus().extendMarkRange('link').unsetLink().run();
          return;
        }
        // update link
        this.editor
          .chain()
          .focus()
          .extendMarkRange('link')
          .setLink({ href: url })
          .run();
      },
    },
    beforeUnmount() {
      this.editor.destroy();
    },
  };
  </script>
  
  <style style>
  .editor-height {
    height: 100%;
  }
  @media only screen and (min-width: 1400px) {
    .editor-height {
      height: 72px;
    }
  }
  
  .pointer {
    cursor: pointer;
  }
  .editor-container {
    height: 15em; /* Adjust this value as needed */
    overflow-y: auto; /* Add scrollbars if the content exceeds the container height */
    justify-content: center;
    display: flex;
  }
  
  .product-content .editor-container {
    height: 200px; /* Adjust this value as needed */
  }
  
  .editor-container div {
    max-width: 50em;
    width: 100%;
  }
  
  .editor-container .ProseMirror-focused:focus-visible {
    outline-color: transparent;
  }
  </style>
  