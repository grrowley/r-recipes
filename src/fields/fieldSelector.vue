<template lang="pug">
v-select(
  label="label",
  v-model="value",
  :multiple="schema.multiple",
  :taggable="schema.taggable",
  :push-tags="schema.pushTags",
  :options="schema.selectOptions")
</template>

<script>
import vSelect from 'vue-select'
import { abstractField } from 'vue-form-generator'

export default {
  name: 'fieldSelector',
  mixins: [abstractField],
  components: { vSelect }
}
</script>
