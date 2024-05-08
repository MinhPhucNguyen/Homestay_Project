<template>
  <div class="dialog" v-if="open">
    <div class="col-md-3 mx-auto modal-contain">
      <div class="card" style="margin-top: 100px">
        <div class="card-header text-center bg-white border-0 mt-4">
          <button class="close-modal" @click="$emit('close')">
            <font-awesome-icon :icon="['fas', 'xmark']" />
          </button>
          <h4 class="text-black fw-bold">Đăng nhập</h4>
        </div>
        <div class="card-body mx-auto">
          <div
            class="mt-1 text-danger text-center"
            v-if="errors && errors.global"
          >
            <i
              class="fa-regular fa-circle-xmark mb-3"
              style="font-size: 30px"
            ></i>
            <p class="fw-bold fs-6">{{ errors.global }}</p>
          </div>
          <form @submit.prevent="loginSubmit()" id="login-form">
            <div class="form-group row mb-2">
              <div class="col-md-12">
                <input
                  v-model="formData.email"
                  @input="clearError('email')"
                  id="email"
                  type="text"
                  placeholder="Địa chỉ email"
                  class="form-control login-input p-2"
                />
                <small v-if="errors && errors.email" class="text-danger">
                  {{ errors.email[0] }}
                </small>
              </div>
            </div>
            <div class="form-group row mb-1 mt-4">
              <div class="col-md-12">
                <input
                  v-model="formData.password"
                  @input="clearError('password')"
                  id="password"
                  type="password"
                  placeholder="Mật khẩu"
                  class="form-control login-input p-2"
                />
                <small v-if="errors && errors.password" class="text-danger">
                  {{ errors.password[0] }}
                </small>
              </div>
            </div>
            <p class="mt-2" style="text-align: right">
              <router-link
                style="color: #5fcf86; text-decoration: none"
                class="fw-bold"
                >Quên Mật khẩu?</router-link
              >
            </p>
            <div class="form-group row mb-3">
              <div class="col-md-12">
                <button
                  type="submit"
                  class="btn btn-lg p-3 w-100 fw-bold text-white d-flex justify-content-center align-items-center login-btn"
                >
                  <div
                    class="spinner-grow text-light"
                    v-if="isLoading"
                    style="width: 2rem; height: 2rem"
                    role="status"
                  >
                    <span class="visually-hidden">Loading...</span>
                  </div>
                  <span v-else> Đăng nhập </span>
                </button>
              </div>
            </div>
          </form>
          <div class="form-group mb-0 d-flex justify-content-center">
            <p class="text-secondary">
              Bạn chưa là thành viên ?
              <span class="fw-bold text-decoration-none" style="color: #5fcf86"
                >Đăng ký ngay</span
              >
            </p>
          </div>
          <div class="socialite-container mt-4 mb-4">
            <div
              class="title d-flex align-items-center justify-content-between"
            >
              <div class="border-text"></div>
              <div class="d-inline-block fw-bold">
                Hoặc đăng nhập với tài khoản
              </div>
              <div class="border-text"></div>
            </div>
            <div class="socialite-btn mt-4">
              <a class="border border-1" @click.prevent="loginWithFacebook">
                <img src="@/assets/images/social-logo/facebook.png" alt="" />
                Facebook
              </a>
              <a class="border border-1" @click.prevent="loginWithGoogle">
                <img src="@/assets/images/social-logo/google.png" alt="" />
                Google
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

defineProps({
  open: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(["close"]);

const store = useStore();
const isLoading = ref(false);
const errors = ref(null);
const router = useRouter();
const formData = ref({
  email: "",
  password: "",
});

const loginSubmit = () => {
  isLoading.value = true;
  store
    .dispatch("auth/login", formData.value)
    .then(() => {
      isLoading.value = false;
      emit("close");
      store.getters["auth/getUser"] && store.getters["auth/isAdmin"]
        ? router.push({ name: "admin.dashboard" })
        : router.push({ name: "home" });
    })
    .catch((e) => {
      errors.value = e.response.data.errors;
      if (!errors.value.email && !errors.value.password) {
        errors.value = { global: e.response.data.errors };
      }
      isLoading.value = false;
    });
};

const clearError = (field) => {
   if (errors.value) {
      delete errors.value[field];
      errors.value = null;
   }
};

const loginWithGoogle = () => {
   store.dispatch("auth/loginWithGoogle").then((response) => {
      if (response.data.url) {
         window.location.href = response.data.url;
      }
   });
};

</script>

<style lang="scss" scoped>
@import "./LoginPopup.scss";
</style>
