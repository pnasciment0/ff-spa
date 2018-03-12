<template>
    <div class="wrapper">
        <form id="search-for-player" @submit.prevent="getPlayerName">
            <div class="search-bar-wrapper">
                <input placeholder="Ex: DeAndre Hopkins" type="text" class="search-bar" v-model="playerName">
                <button type="submit" class="search-button">
                    <i class="fas fa-search"></i>
                </button>
            </div>
        </form>
        <div class="player-message">
            <p>{{searchedValue}}</p>
        </div>
    </div>
</template>

<script>
    export default {
        name: "SearchBar",
        data() {
            return {
                playerName: '',
                searchedValue: ''
            }
        },
        methods: {
            getPlayerName() {
                if (this.playerName === '') {
                    console.log("empty");
                    return;
                }
                console.log("Search value", this.playerName);
                this.searchedValue = this.playerName;
                let url = `https://www.google.com/search?q=${this.playerName.replace(' ', '+')}+fantasy`;
                console.log("URL", url);
            }
        }
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
        cursor: pointer;
    }
    .search-button:focus {
        outline: 0;
    }
</style>