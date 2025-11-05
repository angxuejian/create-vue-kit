<template>
  <h1>hello world</h1>
  <p>Playground ~~</p>

  <button @click="packagesFn">click</button>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';
import { packagesFn } from 'packages';

onMounted(() => {
  console.log('play ~~~ ');
});
</script>
