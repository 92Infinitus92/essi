<template>
  <nav class="bg-blue-500 p-6 text-white text-center">
    <router-link to="/" class="text-blue-200 hover:text-white mr-4"
      >Home</router-link
    >
    |
    <router-link to="/about" class="text-blue-200 hover:text-white ml-4"
      >About</router-link
    >
  </nav>
  <router-view />
</template>

<style></style>
