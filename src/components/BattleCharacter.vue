<template>
  <div ref="characterElement" class="character">
    <img class="img" :src="imgUrl" @click="skillSelectResolve && skillSelectResolve()" />
    <div>{{ character.name }}</div>
    <progress class="hp-bar" :max="character.properties.hp.battleValue" :value="character.currHp"></progress>
  </div>
</template>

<script lang="ts">
import { CharacterBattle, EventDataDamaged, EventDataSkillSelect } from 'sora-game-core';
import { defineComponent, onMounted, PropType, Ref, ref, toRefs, watch } from 'vue';

import { useLabel } from '@/use';

export default defineComponent({
  name: 'BattleCharacter',
  props: {
    character: {
      required: true,
      type: Object as PropType<CharacterBattle>,
    },
  },
  setup(props) {
    const { character } = toRefs(props);
    const currHp = ref(character.value.currHp);
    const characterElement: Ref<HTMLElement | undefined> = ref(undefined);
    let addLabel: (damage: number, color?: string) => void;
    const skillSelectEventData: Ref<EventDataSkillSelect | undefined> = ref(undefined);
    const skillSelectResolve: Ref<(() => void) | undefined> = ref();

    onMounted(() => {
      addLabel = useLabel(characterElement.value!);
    });

    character.value.battle.eventCenter.listen({
      eventType: 'Damaged',
      priority: 1,
      filter: character.value,
      callback: async (eventData: EventDataDamaged) => {
        const { isCrit, finalDamage } = eventData;
        addLabel(finalDamage!, isCrit ? 'red' : undefined);

        return new Promise((resolve) => {
          setTimeout(resolve, 500);
        });
      },
    });

    if (character.value.isPlayerControl) {
      character.value.battle.eventCenter.listen({
        eventType: 'SkillSelect',
        filter: character.value,
        callback: async (eventData: EventDataSkillSelect) => {
          skillSelectEventData.value = eventData;
          return new Promise((resolve) => {
            skillSelectResolve.value = resolve;
          });
        },
      });
    }

    return { currHp, characterElement, imgUrl: `/images/${character.value.id}.png`, skillSelectResolve };
  },
});
</script>
<style lang="less" scoped>
.character {
  width: 12rem;
  height: 12rem;

  border: double aquamarine;
  position: relative;

  .hp-bar {
    position: absolute;
    left: 0;
    bottom: -0.5rem;
    width: 100%;
    height: 2rem;
  }

  .img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.character /deep/ .damage-span {
  position: absolute;
  font-size: x-large;
  font-weight: bolder;
  bottom: 20px;
  text-align: center;
  left: 0;
  right: 0;
}
</style>
