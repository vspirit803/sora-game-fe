<template>
  <div class="v-application">
    <div id="nav">
      <router-link to="/">Home</router-link> | <router-link to="/about">About</router-link> |
      <router-link to="/battle">Battle</router-link>
    </div>
    <ContentContainer />
  </div>
</template>

<script lang="ts">
import battles from '@assets/battles.json';
import characters from '@assets/characters.json';
import items from '@assets/items.json';
import skills from '@assets/skills.json';
import save from '@saves/sav001.json';
import { ItemConfigurations, SkillConfiguration } from 'sora-game-core';
import { defineComponent, onMounted } from 'vue';

import { useGame } from '@/use';
import ContentContainer from '@/views/ContentContainer.vue';

export default defineComponent({
  name: 'App',
  components: { ContentContainer },
  setup() {
    const game = useGame();

    (window as any).game = game;

    //加载配置
    game.skillCenter.loadConfiguration(skills as Array<SkillConfiguration>);
    game.backpack.loadConfigurations(items as ItemConfigurations);
    game.characterCenter.loadConfiguration(characters);
    game.battleCenter.loadConfiguration(battles);
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
