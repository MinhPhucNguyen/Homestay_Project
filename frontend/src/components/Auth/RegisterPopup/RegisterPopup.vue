<template>
  <div class="dialog" v-if="open">
    <div class="col-md-3 mx-auto">
      <div class="card">
        <div class="card-header text-center bg-white border-0 mt-4">
          <button class="close-modal" @click="$emit('close')">
            <font-awesome-icon :icon="['fas', 'xmark']" />
          </button>
          <h4 class="text-black fw-bold">Đăng ký</h4>
        </div>
        <div class="card-body mx-auto">
          <form @submit.prevent="registerSubmit()" id="register-form">
            <div class="form-group row">
              <div class="col-md-6">
                <input
                  v-model="registerData.lastname"
                  type="text"
                  class="form-control"
                  id="lastname"
                  placeholder="Họ"
                />
              </div>
              <div class="col-md-6">
                <input
                  v-model="registerData.firstname"
                  type="text"
                  class="form-control"
                  id="firstname"
                  placeholder="Tên"
                />
              </div>
            </div>
            <div class="form-group mt-4">
              <div class="col-md-12 p-0">
                <input
                  v-model="registerData.username"
                  type="text"
                  class="form-control"
                  placeholder="Tên đăng nhập"
                />
              </div>
            </div>
            <div class="form-group mt-4">
              <div class="col-md-12 p-0">
                <input
                  v-model="registerData.phone"
                  type="text"
                  class="form-control"
                  placeholder="Số điện thoại"
                />
              </div>
            </div>
            <div class="form-group mt-4">
              <div class="col-md-12 p-0">
                <input
                  v-model="registerData.email"
                  type="text"
                  class="form-control"
                  placeholder="Email"
                />
              </div>
            </div>
            <div class="form-group mt-4">
              <div class="col-md-12 p-0">
                <input
                  v-model="registerData.password"
                  type="password"
                  class="form-control"
                  placeholder="Mật khẩu"
                  autocomplete="new-password"
                />
              </div>
            </div>
            <div class="form-group mt-4 mb-4">
              <div class="col-md-12 p-0">
                <input
                  v-model="registerData.confirm_password"
                  type="password"
                  class="form-control"
                  placeholder="Nhập lại mật khẩu"
                  autocomplete="new-password"
                />
              </div>
            </div>
            <div class="form-group mb-2">
              <div class="col-md-12 p-0">
                <button
                  type="submit"
                  class="btn btn-lg p-3 fw-bold text-white mb-4 signup-btn d-flex aligns-items-center justify-content-center"
                  name="register-btn"
                >
                  <div
                    class="spinner-grow text-light"
                    v-if="isLoading"
                    style="width: 2rem; height: 2rem"
                    role="status"
                  >
                    <span class="visually-hidden">Loading...</span>
                  </div>
                  <span v-else> Đăng ký </span>
                </button>
              </div>
            </div>
          </form>
          <div class="socialite-container mt-4 mb-4">
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

const isLoading = ref(false);
const router = useRouter();
const store = useStore();
const registerData = ref({
  firstname: "",
  lastname: "",
  username: "",
  password: "",
  phone: "",
  email: "",
  confirm_password: "",
});

defineProps({
  open: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(["close"]);

const registerSubmit = () => {
  isLoading.value = true;
  store
    .dispatch("auth/register", registerData.value)
    .then(() => {
      router.push({ name: "home" });
      isLoading.value = false;
      emit("close");
    })
    .catch((e) => {
      console.log(e);
      isLoading.value = false;
    });
};
</script>

<style scoped>
@import url(./RegisterPopup.scss);
</style>
