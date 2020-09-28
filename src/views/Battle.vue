<template>
  <div class="battle">
    {{ name }}
  </div>
</template>

<script lang="ts">
import { Game } from 'sora-game-core';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Battle',
  setup() {
    const game = Game.getInstence();
    const team = game.teamCenter.teams[0];
    const battle = game.battleCenter.generateBattle('Battle00001', team);
    battle.autoMode = true;
    const promise = battle.start();

    const name = battle.name;

    return { name };
  },
});
</script>
