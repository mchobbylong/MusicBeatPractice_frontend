<template>
  <div v-if="loading" class="text-center">
    <div class="spinner-grow" style="width: 4rem; height: 4rem" role="status">
      <span class="sr-only">Loading...</span>
    </div>
  </div>

  <div v-else>
    <h2>Let's have a beat dictation!</h2>

    <div class="alert alert-primary mb-4" role="alert">
      The first 4 beats are telling you the <b>tempo</b>. Don't wanna miss that!
    </div>

    <audio :src="`/api/media/${id}.mp3`" type="audio/mpeg" class="d-block mx-auto mb-4" controls/>

    <div class="text-center mb-4">
      <button
        :class="['btn', { 'btn-success': !showAnswer, 'btn-outline-success': showAnswer }]"
        @click="showAnswer = !showAnswer"
      >
        {{ showAnswer ? 'Hide Answer' : 'Show me the answer!' }}
      </button>

      <button class="btn btn-info ml-2" @click="$router.push({ name: 'Create' })">Generate Another One</button>
    </div>

    <div class="text-center">
      <img
        v-if="showAnswer"
        class="img-fluid"
        alt="Answer stave"
        :src="`/api/media/${id}.png`"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { axios } from '@/api/request'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'Show',
  props: {
    id: {
      type: String,
      required: true
    }
  },
  setup (props) {
    const router = useRouter()
    const loading = ref(true)
    axios.get(`/${props.id}`).then(() => {
      loading.value = false
    }).catch(() => {
      router.push({ name: '404' })
    })

    return reactive({
      loading,
      showAnswer: ref(false)
    })
  }
})
</script>
