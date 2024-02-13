<template>
  <span>Username : {{ username }}</span>
</template>


<script>

export default {
  name: "gl-Chatbox",
  displayName: "Chatbox",
  props:
  {
    username: {
      type: String,
      required: true
    }
  },

  components: {},

  watch: {

  },
  async beforeMount() {



  },

  async mounted() {

  },

  unmounted() {

  },

  data() {
    return {

    };
  },

  computed:
  {


  },

  methods: {
  }

};
</script>
