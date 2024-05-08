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

.content-container {
   margin: 0 10%;
   padding: 0 15px;
}
</style>
