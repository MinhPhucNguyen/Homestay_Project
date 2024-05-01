<template>
   <main-navbar v-if="!$route.meta.hideNavbar" />
   <main class="main">
      <div class="content-container">
         <router-view></router-view>
      </div>
   </main>
</template>

<script setup>
import MainNavbar from "@/components/Navbar/MainNavbar.vue";
</script>

<style scoped>
.main {
   padding-top: 90px;
}
</style>
