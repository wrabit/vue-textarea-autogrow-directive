<template>
  <div id="app">
    <h1>Vue Textarea Autogrow Directive</h1>
    <textarea v-autogrow></textarea>

    <p><a href="https://github.com/wrabit/vue-textarea-autogrow-directive">github</a></p>
  </div>
</template>
<script>
  import { TextareaAutogrowDirective } from './VueTextareaAutogrowDirective'

  export default {
    name: 'Demo',
    directives: {
      autogrow: TextareaAutogrowDirective
    }
  }
</script>

<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>