<template>
  <div id="app">
    <header class="bg-dark p-3">
      <nav class="flex justify-between">
        <a class="text-white" href="">
          Events Manager
        </a>
        <!-- <div class="flex-grow pa3 flex items-center">
          <a class="f6 link dib white dim mr3 mr4-ns" href="#0">About</a>
          <a class="f6 link dib white dim mr3 mr4-ns" href="#0">Sign In</a>
        </div> -->
      </nav>
    </header>
    <main class="bg-white">
     <router-view></router-view>
    </main>
  </div>
</template>
