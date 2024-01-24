<template>
  <div class="row m-0" style="height: 100vh">
    <div class="col-md-6 bg-img left">
      <!--  margin-top: 264px;-->
      <div class="login-content-position login-form-mt">
        <div
          class="heading-08 text-neutral-07 text-center text-xl-start"
          style="margin-bottom: 64px"
        >
          Email confirmation
        </div>
        <div
          class="heading-03 fw-normal text-neutral-07 text-center text-xl-start"
          style="margin-bottom: 26px"
        >
          {{ message }}
        </div>
        <router-link
          :to="{ path: '/login' }"
          class="button btn-large btn-success-solid"
          v-if="!message.includes('went wrong')"
        >
          Login with your account
        </router-link>
      </div>
    </div>
    <div class="col-6 bg-img right position-relative d-none d-md-block">
      <!-- style="margin-top: 289px" -->
      <div class="login-content-position text-center" style="margin-top: 31vh">
        <div class="display-01 text-white mb-4 pb-2" style="margin-bottom: 64px">
          Easy store management
        </div>
        <div class="efortless-text">
          Effortlessly streamline inventory, sales, and customer relations with <br />
          our intuitive and user-friendly store management solution
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",

  data() {
    return {
      loading: false,
      message: "",
      user: {},
    };
  },
  watch: {
    user: {
      handler() {
        this.message = "";
      },
      deep: true,
    },
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },
  created() {
    // if (this.loggedIn) {
    //   this.$router.push("/Dashboard");
    // }
    const verify = {
      Email: this.$route.query.email,
      Code: this.$route.query.token.toString().replace(/\s/g, "+"),
    };
    this.VerifyEmail(verify);
  },
  methods: {
    VerifyEmail(verify) {
      this.$axios
        .post("/api/Auth/confirmEmail", verify)
        .then(() => {
          this.message = "Email confimed succesfully";
        })
        .catch(() => {
          this.message = "Something went wrong, please try again later";
        });
    },
  },
};
</script>

<style scoped>
@media only screen and (max-width: 1850px) {
  .img-right-screenshots {
    width: 100%;
  }
}
.login-form-mt {
  margin-top: 20vh;
}
@media only screen and (min-width: 768px) {
  .login-form-mt {
    margin-top: 28.5vh;
  }
}

.img-right-screenshots {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
}

.efortless-text {
  font-size: 18px;
  font-weight: 500;
  line-height: 27px;
  letter-spacing: 0.5px;
  text-align: center;
  color: white;
}
.forgot-pass-text {
  font-size: 14px;
  font-weight: 400;
  line-height: 21px;
  color: var(--neutral-5);
  transition: 0.2;
}

.forgot-pass-text:hover {
  color: var(--neutral-8);
}

.form-control {
  border-radius: 8px;
  padding: 13.5px;
  border-color: var(--neutral-3);
}
.form-control::placeholder {
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  color: var(--neutral-5);
}
.login-content-position {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.bg-img {
  background-repeat: no-repeat;
  background-position: top;
  background-size: cover;
}
</style>
