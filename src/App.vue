<template>
  <div class="v-application">
    <div id="nav">
      <router-link to="/">Home</router-link> | <router-link to="/about">About</router-link> |
      <router-link to="/battle">Battle</router-link>
    </div>
    <router-view />
  </div>
</template>

<script lang="ts">
import save from '@saves/sav001.json';
import { Game } from 'sora-game-core';
import { defineComponent, onMounted } from 'vue';

export default defineComponent({
  setup() {
    const game = Game.getInstence();
    onMounted(() => {
      game.loadSave(save);
    });
  },
});
</script>

<style lang="less">
.v-application {
  flex-direction: column;
}

html {
  overflow-y: auto !important;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
