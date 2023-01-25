<template>
  <header>
    <nav class="navbar navbar-expand-lg navbar-light bg-light mb-3">
      <ul class="navbar-nav">
        <div
          class="nav-item"
          :class="{active: route.name === `home`}"
        >
          <RouterLink
            to="/"
            class="nav-link"
            :class="{active: route.name === `home`}"
          >
            Home
          </RouterLink>
        </div>

        <li
          class="nav-item"
          :class="{active: route.name === `books`}"
        >
          <RouterLink
            to="/books"
            class="nav-link"
            :class="{active: route.name === `books`}"
          >
            Books
          </RouterLink>
        </li>

        <li
          class="nav-item"
          :class="{active: route.name === `authors`}"
        >
          <RouterLink
            to="/authors"
            class="nav-link"
            :class="{active: route.name === `authors`}"
          >
            Authors
          </RouterLink>
        </li>
      </ul>
    </nav>
  </header>

  <RouterView/>
</template>

<script setup lang="ts">
import {RouterLink, RouterView, useRoute} from 'vue-router'

const route = useRoute()
</script>
