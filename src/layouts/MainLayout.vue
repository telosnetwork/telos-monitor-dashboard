<template>
  <q-layout view="hHh lpR fFf">

    <q-header elevated class="text-white" :class="showNavbar == false && 'text-white closed' || lastScrollPosition > 0 && 'text-white focus'" height-hint="98">
      <div class="container">
        <q-toolbar>
          <q-toolbar-title>
            <a href="/"><div class="logo"></div></a>
          </q-toolbar-title>
          <q-tabs align="left">
            <q-btn type="a" :href="apiUrl" target="_blank" >API</q-btn>
            <q-btn type="a" href="https://www.telos.net" target="_blank" >Telos.net</q-btn>
            <q-btn type="a" href="https://github.com/telosnetwork" target="_blank" >Github</q-btn>
          </q-tabs>
        </q-toolbar>
      </div>
    </q-header>

    <q-page-container>
      <router-view />
      <q-page-scroller position="bottom-right" :scroll-offset="150" :offset="[18, 18]">
        <q-btn fab icon="keyboard_arrow_up" color="dark" />
      </q-page-scroller>
    </q-page-container>
    <q-footer elevated class="bg-dark text-white">
      <div class="container">
      <q-toolbar>
        <q-toolbar-title>
          <a href="https://www.telos.net" target="_blank" title="Visit telos.net" ><div class="logo small"></div></a>
        </q-toolbar-title>

        <q-tabs align="left">
          <q-btn type="a" href="" target="_blank" >API</q-btn>
          <q-btn type="a" href="https://www.telos.net" target="_blank" >Telos.net</q-btn>
          <q-btn type="a" href="https://github.com/telosnetwork" target="_blank" >Github</q-btn>
        </q-tabs>
      </q-toolbar>
      </div>
    </q-footer>

  </q-layout>
</template>

<script>
  export default {
    data () {
      return {
        apiURL: process.env.API_ENDPOINT,
        showNavbar: true,
        lastScrollPosition: 0
      }
    },
    mounted () {
      window.addEventListener('scroll', this.onScroll)
    },
    beforeUnmount () {
      window.removeEventListener('scroll', this.onScroll)
    },
    methods: {
      onScroll () {
        // Get the current scroll position
        const currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop
        // Because of momentum scrolling on mobiles, we shouldn't continue if it is less than zero
        if (currentScrollPosition < 0) {
          return
        }
        // Here we determine whether we need to show or hide the navbar
        this.showNavbar = currentScrollPosition < this.lastScrollPosition
        // Set the current scroll position as the last scroll position
        this.lastScrollPosition = currentScrollPosition
      }
    }
  }
</script>