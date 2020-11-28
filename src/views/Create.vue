<template>
  <div class="card mb-4">
    <div class="card-header">
      <ul class="nav nav-tabs card-header-tabs">
        <li class="nav-item">
          <a
            :class="['nav-link', { active: mode === 'random' }]"
            @click="mode = 'random'"
          >Random Generator</a>
        </li>
        <li class="nav-item">
          <a
            :class="['nav-link', { active: mode === 'custom' }]"
            @click="mode = 'custom'"
          >Custom Combos</a>
        </li>
      </ul>
    </div>

    <div v-if="mode === 'random'" class="card-body">
      <div class="text-center">
        <button
          class="btn btn-primary"
          type="button"
          :disabled="generating"
          @click="requestRandom"
        >
          <template v-if="generating">
            <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true" />
            Generating...
          </template>
          <span v-else>Generate Now!</span>
        </button>
      </div>
      <div class="text-center mt-2">
        <a
          class="btn btn-link btn-sm"
          @click="generatorOptionsCollapsed = !generatorOptionsCollapsed"
        >
          <BIconCaretRightFill v-if="generatorOptionsCollapsed" style="margin-top: -4px" />
          <BIconCaretDownFill v-else style="margin-top: -4px" />
          Generator Options
        </a>
      </div>

      <div :class="['collapse', 'pt-3', { show: !generatorOptionsCollapsed }]">
        <div class="form-row">
          <div class="form-group col-sm-12 col-lg-6">
            <label for="bpm">Beat per minute (BPM)</label>
            <input
              v-model="bpm"
              type="number"
              min="20"
              max="300"
              class="form-control"
              id="bpm"
            />
          </div>
          <div class="form-group col-sm-6 col-lg-3">
            <label for="bar-count-min">Min number of bars</label>
            <select
              v-model="barCountMin"
              class="form-control"
              id="bar-count-min"
            >
              <option v-for="num in 8" :key="num" :value="num">{{ num }}</option>
            </select>
          </div>
          <div class="form-group col-sm-6 col-lg-3">
            <label for="bar-count-max">Max number of bars</label>
            <select
              v-model="barCountMax"
              class="form-control"
              id="bar-count-max"
            >
              <option v-for="num in 8" :key="num" :value="num">{{ num }}</option>
            </select>
          </div>
        </div>
        <div class="form-group mb-0">
          <label for="rhythm_list">Available rhythms</label>
          <div>
            <div v-for="rhythm in allRhythms" :key="rhythm.key" class="form-check form-check-inline mr-3">
              <input
                class="form-check-input"
                type="checkbox"
                :id="`rhythm${rhythm.key}`"
                :checked="rhythmUsed[rhythm.key]"
                :disabled="rhythm.disabled"
                @change="rhythmUsed[rhythm.key] = !rhythmUsed[rhythm.key]"
              />
              <label class="form-check-label" :for="`rhythm${rhythm.key}`">{{ rhythm.label }}</label>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="mode === 'custom'" class="card-body">
      <div class="card mb-4">
        <div class="card-header p-0">
          <h2 class="mb-0">
            <a
              class="btn btn-link btn-block text-left"
              @click="availableCombosCollapsed = !availableCombosCollapsed"
            >
              <BIconCaretRightFill v-if="availableCombosCollapsed" style="margin-top: -4px" />
              <BIconCaretDownFill v-else style="margin-top: -4px" />
              Available Beat Combos
            </a>
          </h2>
        </div>
        <div :class="['collapse', { show: !availableCombosCollapsed }]">
          <div class="card-body pt-0" style="padding-bottom: 1rem">
            <div class="row row-cols-2 row-cols-md-4 row-cols-xl-6">
              <div
                v-for="(status, index) in availableCombos"
                :key="index"
                class="col mt-3"
              >
                <div class="border rounded text-center p-2">
                  <img :src="require(`@/assets/combos/${index+1}.png`)" height="50" />
                  <h5 class="card-title mb-0">{{index+1}}</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="form-group">
        <label for="customCombos">Beat combo sequence</label>
        <input
          v-model="custom"
          type="text"
          class="form-control"
          id="customCombos"
          aria-describedby="customHint"
        />
        <small id="customHint" class="form-text text-muted">
          Numbers of beat combo, separated with space. <br />
          Example: "5 6 10 8"
        </small>
      </div>

      <div class="form-group">
        <label for="bpm">Beat per minute (BPM)</label>
        <input
          v-model="bpm"
          type="number"
          min="20"
          max="300"
          class="form-control"
          id="bpm"
        />
      </div>

      <div class="form-group">
        <label for="rhythm-selected">Rhythm</label>
        <select
          v-model="rhythmSelected"
          class="form-control"
          id="rhythm-selected"
        >
          <option
            v-for="rhythm in allRhythms"
            :key="rhythm.key"
            :value="rhythm.key"
            :disabled="rhythm.disabled"
          >{{ rhythm.label }}</option>
        </select>
      </div>

      <button
        class="btn btn-primary btn-block mt-4"
        :disabled="generating"
        @click="customGenerate"
      >
        <span v-if="generating" class="spinner-border spinner-border-sm" role="status" aria-hidden="true" />
        Generate!
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeUnmount, reactive, ref, toRaw, toRefs } from 'vue'
import { BIconCaretRightFill, BIconCaretDownFill } from 'bootstrap-icons-vue'
import { useRouter } from 'vue-router'
import { defaultHomepageConfig, HomepageConfig } from './constants'
import { randomGenerate } from '@/api/all'


// constant
const allRhythms = [
  {
    key: 1,
    label: '2/4',
    imgSuffix: 'two_four',
    disabled: false
  },
  {
    key: 2,
    label: '3/4',
    imgSuffix: 'three_four',
    disabled: false
  },
  {
    key: 3,
    label: '4/4',
    imgSuffix: 'four_four',
    disabled: false
  },
  {
    key: 4,
    label: '3/8',
    imgSuffix: 'three_eight',
    disabled: true
  },
  {
    key: 5,
    label: '6/8',
    imgSuffix: 'six_eight',
    disabled: true
  }
]

const availableCombos = new Array(12).fill(true)

export default defineComponent({
  name: 'Create',
  components: {
    BIconCaretRightFill,
    BIconCaretDownFill
  },
  setup () {
    const typedKeys = Object.keys as <T extends object>(obj: T) => Array<keyof T>
    const router = useRouter()
    const config: HomepageConfig = defaultHomepageConfig

    // 从 localStorage 中加载用户设定的参数
    const savedConfigRaw = localStorage.getItem('homepageConfig')
    if (savedConfigRaw) {
      const savedConfig: HomepageConfig = JSON.parse(savedConfigRaw)
      if (savedConfig.version === process.env.VUE_APP_VERSION) {
        typedKeys(config).forEach(key => {
          config[key] = savedConfig[key] as never
        })
      }
    }

    const refConfig = reactive(config)

    // 页面跳转时保存当前参数
    const saveConfig = () => {
      localStorage.setItem('homepageConfig', JSON.stringify({
        version: process.env.VUE_APP_VERSION,
        ...toRaw(refConfig)
      }))
    }
    onBeforeUnmount(saveConfig)

    const generating = ref(false)

    const requestRandom = () => {
      generating.value = true

      const { rhythmUsed, barCountMin, barCountMax, bpm } = toRaw(refConfig)
      randomGenerate({
        'rhythm_list': typedKeys(rhythmUsed).filter(rhythm => rhythmUsed[rhythm]).map(Number),
        'bar_count_min': barCountMin,
        'bar_count_max': barCountMax,
        bpm: parseInt(bpm)
      }).then(({ data: id }: any) => {
        console.log(id)
        router.push({ name: 'Show', params: { id }})
      }).catch((error: any) => {
        router.push({
          name: 'ErrorPage',
          params: { errorType: error.response.status >= 500 ? 'server' : 'client' }
        })
      }).finally(() => {
        generating.value = false
      })
    }

    const customGenerate = () => {
      console.log(toRaw(refConfig))
    }

    return {
      allRhythms,
      availableCombos,
      generating,
      requestRandom,
      customGenerate,
      ...toRefs(refConfig)
    }
  }
})
</script>
