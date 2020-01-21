<template lang="pug">
article
  b-form.recipeSearch
  b-row.recipeList
    b-col.recipeList-item(cols="12", md="6", lg="3" v-for="(recipe, i) in recipes", :key="i")
      b-card(
        img-top,
        :title="recipe.title",
        :sub-title="recipe.sub_title",
        :img-src="recipe.image",
        :img-alt="recipe.title")
        ul(v-if="recipe.information")
          li
            span.fal.fa-fw.fa-clock
            span {{recipe.information.duration}}
          li
            span.fal.fa-fw.fa-utensils
            span {{recipe.information.servings}}
        b-card-text(
          v-if="recipe.description",
          v-html="$truncate(recipe.description, 22, { byWords: true })")
        template(v-slot:footer)
          b-button(size="sm", :to="{ name: 'recipe', params: { uri: recipe.uri } }")
            span View Recipe
            span.fal.fa-arrow-right.ml-2
</template>

<script>
export default {
  name: 'Homepage',
  data: () => ({
    recipes: []
  }),
  methods: {
    async fetchRecipes() {
      const db = this.$firestore.collection('recipes')
      const data = await db.get()
      if (data.docs) {
        this.recipes = data.docs.map(doc => doc.data())
      }
    }
  },
  mounted() {
    this.fetchRecipes()
  }
}
</script>
