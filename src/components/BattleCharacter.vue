<template>
  <div class="character">
    <div>{{ character.name }}</div>
    <progress class="hp-bar" :max="character.properties.hp.battleValue" :value="character.currHp"></progress>
  </div>
</template>

<script lang="ts">
import { CharacterBattle } from 'sora-game-core';
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  name: 'BattleCharacter',
  props: {
    character: {
      required: true,
      type: Object as PropType<CharacterBattle>,
    },
  },
});
</script>
<style lang="less" scoped>
.character {
  width: 8rem;
  height: 8rem;

  border: double aquamarine;
  position: relative;

  .hp-bar {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
  }
}
</style>
