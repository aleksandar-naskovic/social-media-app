<template>
    <button
        class="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
        type="submit"
    >
        <slot>Button</slot>
    </button>
</template>

<script>
export default {
    name: "Button"
}
</script>

<style scoped>

</style>
