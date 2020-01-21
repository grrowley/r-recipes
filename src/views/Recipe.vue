<template lang="pug">
article
  h1 {{recipe.title}}
  h2(v-if="recipe.sub_title") {{recipe.sub_title}}
  p(v-if="recipe.description") {{recipe.description}}
  p(v-if="recipe.dedication")
    em {{recipe.dedication}}
  ul
    li(v-for="(ingredient, i) in recipe.ingredients", :key="i")
      | {{$fraction(ingredient.amount)}}
      |  {{ingredient.unit}}
      | {{ingredient.item}}
  ul
    li(v-for="(instruction, i) in recipe.instructions", :key="i")
      | {{instruction.title}}
      |  {{instruction.step}}
</template>

<script>
export default {
  name: 'Recipe',
  data: () => ({
    recipe: {}
  }),
  methods: {
    async fetchRecipe() {
      const db = this.$firestore.collection('recipes')
      const data = await db.where('uri', '==', this.$route.params.uri).get()
      if (data.docs) {
        this.recipe = data.docs[0].data()
      }
    },
  },
  mounted() {
    this.fetchRecipe()
  }
}
</script>
