<template>
    <div class="search-bar-wrapper">
        <input placeholder="Ex: DeAndre Hopkins" type="text" class="search-bar">
        <button type="submit" class="search-button">
            <i class="fas fa-search"></i>
        </button>
    </div>
</template>

<script>
    export default {
        name: "SearchBar"
    }
</script>

<style scoped>
    .search-bar-wrapper {
        position: relative;
    }
    .search-bar {
        width: 80%;
        height: 60px;
        background: transparent;
    }
    input[type=text] {
        font-size: 35px;
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        /*font-weight: bold;*/
    }
    input {
        border-top: none;
        border-left: none;
        border-right: none;
        border-bottom: 2px solid #000;
        outline: none;
    }
    .search-button {
        position: absolute;
        bottom: 0px;
        height: 64px;
        width: 64px;
        margin-left: -64px;
        background:transparent;
        font-size: 24px;
        border: none;
    }
</style>