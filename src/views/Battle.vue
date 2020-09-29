<template>
  <div class="battle">
    {{ battle.name }}
    <BattleFaction class="faction1" :faction="battle.factions[0]" reverse />
    <BattleFaction class="faction2" :faction="battle.factions[1]" />
    <BattleFaction v-if="battle.factions[2]" class="faction3" :faction="battle.factions[2]" />
  </div>
</template>

<script lang="ts">
import { Battle, Game } from 'sora-game-core';
import { defineComponent, onMounted, onUnmounted, Ref, ref } from 'vue';

import BattleFaction from '@/components/BattleFaction.vue';

export default defineComponent({
  name: 'Battle',
  components: { BattleFaction },
  setup() {
    const game = Game.getInstence();
    const team = game.teamCenter.teams[0];
    const battle: Ref<Battle> = ref(game.battleCenter.generateBattle('Battle00001', team));
    battle.value.autoMode = true;
    battle.value.start();

    onUnmounted(() => {
      battle.value.end();
    });

    return { battle };
  },
});
</script>
<style lang="less" scoped>
.faction1 {
  position: absolute;
  right: 20px;
  bottom: 20px;

  border: dashed #32a1ce;
}

.faction2 {
  position: absolute;
  left: 20px;
  top: 20px;

  border: dashed #32a1ce;
}

.faction3 {
  position: absolute;
  right: 20px;
  top: 20px;

  border: dashed #32a1ce;
}
</style>
