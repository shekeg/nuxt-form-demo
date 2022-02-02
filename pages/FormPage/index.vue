<template>
  <div class="min-h-full flex flex-col justify-center items-center">
    <div v-if="currentStep !== 0" class="relative mb-10 w-full flex justify-between" style="max-width: 556px">
      <div v-for="step in $options.$STEPS" :key="step.number" class="flex flex-col items-center">
        <span
          class="py-3 rounded-full text-2xl border leading-none"
          style="font-weight: 900; padding-left: 18px; padding-right: 18px"
          :class="{
            'text-white bg-gray-300 border-gray-300': currentStep !== step.number && currentStep < step.number,
            'text-blue-400 bg-gray-200 border-blue-400': currentStep === step.number,
            'text-white bg-blue-400 border-blue-400': currentStep > step.number
          }"
        >
          {{ step.number }}
        </span>
        <span class="mt-1 text-xl">
          {{ step.title }}
        </span>
      </div>
      <div class="progress-bar --first" :class="{'--success': currentStep >= 2}" />
      <div class="progress-bar --second" :class="{'--success': currentStep === 3}" />
    </div>
    <NuxtChild />
  </div>
</template>

<script>
export default {
  name: 'FormPage',
  $STEPS: {
    'contact-info': { number: 1, title: 'Personal Info' },
    membership: { number: 2, title: 'Membership' },
    overview: { number: 3, title: 'Overview' }
  },
  computed: {
    currentStep () {
      return this.$options.$STEPS[this.$route.name].number || 0
    }
  }
}
</script>

<style scoped>
.progress-bar {
  @apply absolute bg-gray-300 transform -translate-y-1/2;
  width: 44%;
  height: 2px;
  top: 32%;
  z-index: -1;
}

.progress-bar.--first {
  @apply left-0;
  transform: translateX(22%);

}

.progress-bar.--second {
  @apply right-0;
  transform: translateX(-10%);
}

.progress-bar.--success {
  @apply bg-blue-400;
}
</style>
