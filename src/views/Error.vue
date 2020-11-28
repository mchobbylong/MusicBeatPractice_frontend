<template>
  <div class="card card-body">
    <h2 class="card-title">Oops!</h2>

    <div v-if="errorText" class="alert alert-danger">
      {{ errorText }}
    </div>

    <p v-if="errorType === 'server'" class="card-text">
      There is an error <b>on the server side</b>. Please report it to the website developer.
    </p>
    <p v-else-if="errorType === '404'" class="card-text">
      Your requested content is not found on the website. Maybe you have typed in a wrong URL...
    </p>
    <template v-else-if="errorType === 'client'">
      <p class="card-text">
        There is an error <b>caused by your input</b> (which means your input is invalid). Please check carefully :-)
      </p>
      <p class="card-text">
        If you still cannot figure out what is wrong, report it to the website developer.
      </p>
    </template>
    <button class="btn btn-primary" @click="$router.go(-1)">Go Back</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ErrorPage',
  props: {
    errorType: {
      type: String,
      default: 'client'
    },
    errorText: {
      type: String,
      default: null
    }
  },
  setup () {
    return {}
  }
})
</script>
