<template lang="pug">
#app
  router-view
  new-recipe
</template>

<script>
import NewRecipe from '@/components/NewRecipe.vue'

export default {
  name: 'App',
  components: {
    NewRecipe
  }
}
</script>

<style lang="scss">
@import '@/assets/scss/main';
</style>
