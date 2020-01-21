<template lang="pug">
wysiwyg(
  v-model="value",
  :id="getFieldID(schema)",
  :class="schema.fieldClasses",
  :options="schema.options")
</template>

<script>
import { abstractField } from 'vue-form-generator'

export default {
  name: 'fieldWysiwyg',
  mixins: [abstractField],
}
</script>
