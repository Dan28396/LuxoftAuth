<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<script>
    import router from './router'

    export default {
        router,
        name: 'App',
        components: {}
    }
</script>

<style>
    body {
        padding: 0;
        margin: 0;
    }

    #app {
        font-family: 'Open Sans', sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        width: 100%;
        height: 100%;
        margin: 0;
        padding: 0;
        min-height: 100vh;
    }
</style>
