<template>
  <div
    v-if="isImageUserVisible"
    class="center-object-user test"
    @click="openLoginSquare"
    :disabled="isLoginSquareVisible === true && isZoomingIn === true"
  >
    <div class="image-user">
      <img src="../../assets/images/Sample_User_Icon.png" class="image-settings" />
      <h6 style="font-weight: bold; color: #0054a6">Connect to Account</h6>
    </div>
  </div>
  <img
    v-bind:style="{ left: imagePosition + 'px' }"
    src="../../assets/images/man.png"
    class="slide-image"
  />
  <div
    class="center-object"
    v-if="isLoginSquareVisible"
    :class="{ 'zoom-out': isZoomingOut, 'zoom-in': isZoomingIn }"
  >
    <div class="close-login" @click="closeLoginSquare">X</div>
    <h1>Log in</h1>
    <Form @submit="handleLogin" :validation-schema="schema" v-slot="{ errors }">
      <div class="input-group">
        <label for="username">Username</label>
        <Field
          type="text"
          id="username"
          name="username"
          v-model="credentials.username"
          :class="{ 'border-danger': errors.username }"
        />
        <ErrorMessage name="username" class="error-message" />
      </div>
      <div class="input-group">
        <label for="password">Password</label>
        <Field
          type="password"
          id="password"
          name="password"
          v-model="credentials.password"
          :class="{ 'border-danger': errors.password }"
        />
        <ErrorMessage name="password" class="error-message" />
      </div>
      <div class="error-message" v-if="message">{{ message }}</div>
      <button type="submit">Connect</button>
    </Form>
  </div>
</template>

<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
export default {
  name: "LoginComponent",

  data() {
    return {
      credentials: {
        username: "",
        password: "",
      },
      message: "",
      isLoginSquareVisible: false,
      isImageUserVisible: true,
      isZoomingOut: false,
      isZoomingIn: false,
      imagePosition: -window.innerWidth,
    };
  },
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  methods: {
    handleLogin(user) {
      this.$store.state.loader = true;
      const login = {
        Email: user.username,
        Password: user.password,
      };
      this.$store.dispatch("auth/login", login).then(
        () => {
          this.$router.push("/admin/Homepage");
          this.$store.state.loader = false;
        },
        () => {
          this.message = "Something went wrong, please try again";
          this.$store.state.loader = false;
        }
      );
    },
    startAnimation() {
      setTimeout(() => {
        this.imagePosition = 0;
      }, 0);
    },
    closeLoginSquare() {
      this.isZoomingOut = true;
      setTimeout(() => {
        this.isLoginSquareVisible = false;
        this.isZoomingOut = false;
      }, 500);
      this.isImageUserVisible = true;
    },
    openLoginSquare() {
      this.isZoomingIn = true;
      this.isLoginSquareVisible = true;
      setTimeout(() => {
        this.isZoomingIn = false;
        this.isImageUserVisible = false;
      }, 500);
    },
  },
  computed: {
    schema() {
      return yup.object({
        username: yup
          .string()
          .required("Username is required!")
          .email("Please provide a valid email"),
        password: yup.string().required("Password is required!"),
      });
    },
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },
  created() {
    if (this.loggedIn) {
      this.$router.push("/admin/news");
    }
  },
  mounted() {
    this.startAnimation();
    this.openLoginSquare();
  },
};
</script>
<style>
.center-object {
  width: 400px;
  padding: 20px;
  background-color: #feffff;
  border-radius: 15px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  color: black;
}

.input-group {
  margin-bottom: 20px;
}

input[type="text"],
input[type="password"] {
  width: 100%;
  padding: 10px;
  margin-top: 5px;
  border-radius: 5px;
  border: 1px solid #ccc;
}

button {
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: none;
  background-color: #0054a6;
  color: white;
  cursor: pointer;
}

button:hover {
  background-color: #003366;
}

.slide-image {
  position: absolute;
  left: -50%;
  top: 50%;
  transform: translate(0, -50%);
  transition: left 1.5s ease-out;
}

.close-login {
  position: absolute;
  right: 1vh;
  top: 1vh;
  background-color: #0054a6;
  width: 3vh;
  height: auto;
  text-align: center;
  color: white;
  border-radius: 5vh;
  cursor: pointer;
  text-align: center;
  vertical-align: center;
}

.close-login:hover {
  background-color: #003366;
}

.image-user {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.image-settings {
  height: 20vh;
}

.center-object-user {
  width: auto;
  padding: 20px;
  background-color: white;
  border-radius: 15px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  color: black;
}

@keyframes zoomOut {
  from {
    transform: translate(-50%, -50%) scale(1);
    opacity: 1;
  }

  to {
    transform: translate(-50%, -50%) scale(0);
    opacity: 0;
  }
}

.zoom-out {
  animation: zoomOut 0.5s forwards;
}

@keyframes zoomIn {
  from {
    transform: translate(-50%, -50%) scale(0);
    opacity: 0;
  }

  to {
    transform: translate(-50%, -50%) scale(1);
    opacity: 1;
  }
}

.zoom-in {
  animation: zoomIn 1s forwards;
}
</style>
