<template>
  <div class="container">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <router-link class="navbar-brand" :to="{ name: 'Home' }">Music Beat Practice</router-link>
      <ul class="navbar-nav mr-auto">
        <li class="nav-item">
          <router-link class="nav-link" :to="{ name: 'Home' }">Home</router-link>
        </li>
      </ul>
    </nav>

    <div class="container pt-3">
      <router-view />
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Home'
})
</script>
