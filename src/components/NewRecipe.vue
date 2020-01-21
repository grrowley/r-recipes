<template lang="pug">
b-card(no-body)
  b-tabs(card)
    b-tab(title="Recipe", active)
      vue-form-generator(:model="recipe", :schema="recipeInfo", :options="options")
    b-tab(title="Ingredients")
      b-row(v-for="(ingredient, i) in recipe.ingredients", :key="i")
        b-col
          vue-form-generator(
            :model="recipe.ingredients[i]",
            :schema="recipeItems",
            :options="options")
        b-col
          b-button(@click="remRecipeItem(i)")
            span.fal.fa-trash.mr-2
            span Delete
      b-button(@click="newRecipeItem") New Ingredient
    b-tab(title="Instructions")
      b-row(v-for="(instruction, i) in recipe.instructions", :key="i")
        b-col
          vue-form-generator(
            :model="recipe.instructions[i]",
            :schema="recipeSteps",
            :options="options")
        b-col
          b-button(@click="remRecipeStep(i)")
            span.fal.fa-trash.mr-2
            span Delete
      b-button(@click="newRecipeStep") New Instruction
    template(v-slot:tabs-end)
      b-button.ml-auto.align-self-center(size="sm", @click="onSubmit")
        span.fal.fa-save.mr-2
        span Save Recipe
</template>

<script>
export default {
  name: 'NewRecipe',
  data: () => ({
    recipe: {
      uri: '',
      title: '',
      sub_title: '',
      image: '',
      dedication: '',
      description: '',
      duration: {
        hours: 0,
        minutes: 0
      },
      servings: 1,
      ingredients: [],
      instructions: []
    },
    options: {

    }
  }),
  computed: {
    recipeInfo() {
      return {
        fields: [
          {
            type: 'input',
            inputType: 'text',
            label: 'Title',
            model: 'title',
            placeholder: 'My tasty recipe...',
          },
          {
            type: 'input',
            inputType: 'text',
            label: 'Sub Title',
            model: 'sub_title',
            placeholder: 'Short additional title...',
          },
          {
            type: 'wysiwyg',
            label: 'Dedication',
            model: 'dedication',
            options: {
              maxHeight: '100px',
              hideModules: {
                justifyLeft: true,
                justifyCenter: true,
                justifyRight: true,
                headings: true,
                link: true,
                code: true,
                orderedList: true,
                unorderedList: true,
                image: true,
                table: true,
                separator: true,
              }
            }
          },
          {
            type: 'wysiwyg',
            label: 'Description',
            model: 'description',
            options: {
              hideModules: {
                justifyLeft: true,
                justifyCenter: true,
                justifyRight: true,
                headings: true,
                link: true,
                code: true,
                orderedList: true,
                unorderedList: true,
                image: true,
                table: true,
                separator: true,
              }
            }
          },
          {
            type: 'input',
            inputType: 'number',
            label: 'Duration Hours',
            model: 'duration.hours'
          },
          {
            type: 'input',
            inputType: 'number',
            label: 'Duration Minutes',
            model: 'duration.minutes'
          },
          {
            type: 'input',
            inputType: 'number',
            label: 'Servings',
            model: 'servings'
          }
        ]
      }
    },
    recipeItems() {
      return {
        fields: [
          {
            type: 'input',
            inputType: 'number',
            label: 'Amount',
            model: 'amount',
            placeholder: '0.5',
          },
          {
            type: 'selector',
            label: 'Unit',
            model: 'unit',
            selectOptions: ['tsp', 'tbsp', 'pkg'],
            taggable: true,
            pushTags: true,
          },
          {
            type: 'input',
            inputType: 'text',
            label: 'Item',
            model: 'item'
          }
        ]
      }
    },
    recipeSteps() {
      return {
        fields: [
          {
            type: 'input',
            inputType: 'text',
            label: 'Title',
            model: 'title'
          },
          {
            type: 'wysiwyg',
            label: 'Instructions',
            model: 'step'
          }
        ]
      }
    }
  },
  methods: {
    async onSubmit() {
      this.recipe.uri = this.$slugify(this.recipe.title)
      const db = this.$firestore.collection('recipes')
      const success = await db.add(this.recipe)
      if (success.id) {
        console.log(success.id)
      }
    },
    newRecipeItem() {
      this.recipe.ingredients.push({
        amount: null,
        unit: null,
        item: null
      })
    },
    remRecipeItem(i) {
      this.recipe.ingredients.splice(i, 1)
    },
    newRecipeStep() {
      this.recipe.instructions.push({
        title: null,
        step: null
      })
    },
    remRecipeStep(i) {
      this.recipe.instructions.splice(i, 1)
    }
  }
}
</script>
