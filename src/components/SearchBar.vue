<template>
    <div class="search-bar-wrapper">
        <input type="text" class="search-bar">
    </div>
</template>

<script>
    export default {
        name: "SearchBar"
    }
</script>

<style scoped>
    .search-bar {
        width: 80%;
        height: 60px;
        background: transparent;
    }
    input[type=text] {
        font-size: 45px;
    }
    input:focus {
        /*border: none;*/
        border-bottom: 2px;
        outline: none;
    }
    input {
        /*border: none;*/
        border-bottom: 2px;
        outline: none;
    }
</style>