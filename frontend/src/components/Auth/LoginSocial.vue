<template>
   <div class="w-100 d-flex justify-content-center mt-4 loading">
      <div
         class="spinner-grow text-success"
         role="status"
         style="width: 65px; height: 65px"
         v-if="isLoading"
      >
         <span class="visually-hidden">Loading...</span>
      </div>
   </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

const store = useStore();
const router = useRouter();
const isLoading = ref(true);

const provider = router.currentRoute.value.params.provider;

const loginSocial = () => {
   store
      .dispatch(
         `auth/${
            provider === "facebook" ? "loginWithFacebookCallback" : "loginWithGoogleCallback"
         }`,
         { code: router.currentRoute.value.query.code }
      )
      .then(() => {
         router.push({ name: "home" });
      })
      .then(() => {
         isLoading.value = false;
      });
};

loginSocial();
</script>

<style scoped>
.loading {
   position: absolute;
   top: 30%;
   left: 50%;
   transform: translate(-50%, -50%);
}
</style>
