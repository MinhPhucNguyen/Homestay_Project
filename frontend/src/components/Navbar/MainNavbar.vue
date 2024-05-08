<template>
   <nav class="navbar navbar-expand-lg">
      <div class="navbar-container text-black p-0 d-flex">
         <router-link to="/" class="navbar-brand fw-bold text-uppercase fs-4" href="/">
            MY<span style="color: #5fcf86">HOMESTAY</span>
         </router-link>
         <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="{{ __('Toggle navigation') }}"
         >
            <span class="navbar-toggler-icon"></span>
         </button>

         <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <!-- Right Side Of Navbar -->
            <ul class="navbar-nav ms-auto">
               <li class="nav-item">
                  <router-link to="/about" class="nav-link text-black" href=""
                     >Về Chúng tôi</router-link
                  >
               </li>
               <li class="nav-item">
                  <router-link to="/blog" class="nav-link text-black">Blog</router-link>
               </li>
               <li class="nav-item">
                  <span class="nav-item-border"></span>
               </li>

               <!-- Authentication Links -->
               <div class="authentication-container d-flex">
                  <router-link
                     v-if="isAuthenticated"
                     to="/account"
                     id="user-info"
                     class="text-black fw-bold text-decoration-none"
                  >
                     <div class="d-flex align-items-center" v-if="user">
                        <img class="avatar-image" :src="user.avatar" alt="avatar" />
                        <span class="mr-3">{{ user.fullname ?? user.username }}</span>
                        <i class="fa-solid fa-angle-down"></i>
                     </div>
                     <div
                        v-else
                        class="spinner-grow text-success"
                        role="status"
                        style="width: 20px; height: 20px"
                     >
                        <span class="visually-hidden">Loading...</span>
                     </div>
                  </router-link>
                  <ul v-else>
                     <li id="register-btn" class="nav-item m-0" @click="isRegisterOpen = true">
                        <span class="nav-link text-black btn"
                           >Đăng ký</span
                        >
                     </li>
                     <li id="login-btn" class="nav-item border border-dark rounded-3" @click="isLoginOpen = true">
                        <span class="nav-link text-black btn"
                           >Đăng nhập</span
                        >
                     </li>
                  </ul>
               </div>
            </ul>
         </div>
      </div>
   </nav>
   <login-popup :open="isLoginOpen" @close="isLoginOpen = !isLoginOpen"></login-popup>
   <register-popup :open="isRegisterOpen" @close="isRegisterOpen = !isRegisterOpen"></register-popup>
</template>

<script setup>
import {computed, ref} from "vue";
import { useStore } from "vuex";
import LoginPopup from "@/components/Auth/LoginPopup/LoginPopup.vue";
import RegisterPopup from "@/components/Auth/RegisterPopup/RegisterPopup.vue";

const store = useStore();
const isAuthenticated = computed(() => store.getters["auth/isAuthenticated"]);
const user = computed(() => store.getters["users/getUserById"]);

const isLoginOpen = ref(false);
const isRegisterOpen = ref(false);

</script>

<style lang="scss" scoped>
@import "./MainNavbar.scss";
</style>
 