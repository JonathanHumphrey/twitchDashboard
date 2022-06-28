<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <header>
    <div class="wrapper">
      <nav class="nav-bar">
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
        <RouterLink to="/stats">Stats</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style>
#app {
  display: flex;
  flex-direction: column;
}
.nav-bar {
  border: solid black;
}
</style>
