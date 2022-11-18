<template>
  <div id="app" >
    <div id="nav" class="bg-primary">
        <p class="text-left text-white font-semibold font-sans text-3xl font-bold tracking-tight sm:text-4xl sm:leading-none">
      SOCIAL MEDIA APP
        </p>
    </div>
    <router-view/>
  </div>
</template>



<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
