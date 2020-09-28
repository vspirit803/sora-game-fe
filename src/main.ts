import '@/styles/vuetify.css';

import { Game, ItemConfigurations, SkillConfiguration } from 'sora-game-core';
import { createApp } from 'vue';

import App from './App.vue';
import router from './router';
import store from './store';
(window as any).game = Game.getInstence();

import battles from '@assets/battles.json';
import characters from '@assets/characters.json';
import items from '@assets/items.json';
import skills from '@assets/skills.json';

const game = Game.getInstence();
//加载配置
game.skillCenter.loadConfiguration(skills as Array<SkillConfiguration>);
game.backpack.loadConfigurations(items as ItemConfigurations);
game.characterCenter.loadConfiguration(characters);
game.battleCenter.loadConfiguration(battles);

createApp(App).use(store).use(router).mount('#app');
