<template>
  <div id="app">
    <header class="bg-near-black">
      <nav class="flex justify-between bb b--white-10">
        <a class="link white-70 hover-white no-underline flex items-center pa3" href="">
          Events Manager
        </a>
        <!-- <div class="flex-grow pa3 flex items-center">
          <a class="f6 link dib white dim mr3 mr4-ns" href="#0">About</a>
          <a class="f6 link dib white dim mr3 mr4-ns" href="#0">Sign In</a>
        </div> -->
      </nav>
    </header>
    <main class="pa3 pa5-ns bt b--black-10 black-70 bg-white">
     <router-view />
    </main>
  </div>
</template>