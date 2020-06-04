# Vue Textarea Autogrow Directive

A vue directive for automatically growing and shrinking the height of textareas.

## Project setup
```
npm install vue-textarea-autogrow-directive
```

## Features

- Adjusts height as you type
- Setting initial height when loaded
- Adjust height on copy and paste
- Adjust height when textarea's visibility is hidden (useful when a page is rendered whilst the textarea is hidden and later shown)

## Usage

#### Globally

Recommended option if using in more than a couple of components.

```javascript
// main.js
import Vue from 'vue'
import VueTextareaAutogrowDirective from 'vue-textarea-autogrow-directive'

Vue.use(VueTextareaAutogrowDirective)

// MyComponent.vue
<template>
  <textarea v-autogrow></textarea>
</template>
```

#### In a component

Recommended if using once or twice in your project.

```javascript
<template>
  <textarea v-autogrow></textarea>
</template>

<script>
  import { TextareaAutogrowDirective } from 'vue-textarea-autogrow-directive'
  export default {
    name: 'MyComponent',
    directives: {
      'autogrow': TextareaAutogrowDirective
    } 
  }
</script>
```

