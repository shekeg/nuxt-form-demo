<template>
  <div class="flex flex-col">
    <label class="radio">
      <input
        type="radio"
        class="radio__input"
        name="membership"
        value="regular"
        :checked="isRegularChecked"
        required
        @input="$emit('on-update-field', 'membershipType', $event.target.value)"
      >
      <span class="radio__box" />
      <span class="text-lg leading-none">Regular</span>
    </label>
    <label class="mt-10 radio">
      <input
        type="radio"
        class="radio__input"
        name="membership"
        value="premium"
        :checked="isPremiumChecked"
        required
        @input="$emit('on-update-field', 'membershipType', $event.target.value)"
      >
      <span class="radio__box" />
      <span class="text-lg">Premium</span>
    </label>
    <p v-if="isRegularChecked" class="mt-7">
      <span class="font-bold">Regular</span>
      Lorem ipsum dolor sit amet consectetur adipisicing elit.
      Pariatur quaerat aut eius harum reiciendis quisquam voluptate illo fugit neque.
      Ducimus repellendus perspiciatis repellat eius velit tenetur incidunt vero sequi in.
    </p>
    <p v-if="isPremiumChecked" class="mt-7">
      <span class="font-bold">Premium</span>
      Lorem ipsum dolor sit amet consectetur adipisicing elit.
      Pariatur quaerat aut eius harum reiciendis quisquam voluptate illo fugit neque.
      Ducimus repellendus perspiciatis repellat eius velit tenetur incidunt vero sequi in.
    </p>
  </div>
</template>

<script>
export default {
  name: 'MembershipFields',
  props: {
    membershipType: {
      type: String,
      required: true
    }
  },
  computed: {
    isRegularChecked () {
      return this.membershipType === 'regular'
    },
    isPremiumChecked () {
      return this.membershipType === 'premium'
    }
  }
}
</script>
