<template>
    <span>Text</span>
    <input type="text" v-model="changedText" />
</template>


<script>

export default {
    name: "gl-InputBox",
    displayName: 'Input box',
    props:
    {
        text: {
            type: String,
            required: true
        }
    },

    components: {},

    watch: {

    },
    beforeMount() {



    },

    mounted() {
        console.log("mounted input box")
        this.changedText = this.text
    },

    unmounted() {

    },

    data() {
        return {
            changedText: "",
        };
    },

    computed:
    {


    },

    methods: {
    }

};
</script>
