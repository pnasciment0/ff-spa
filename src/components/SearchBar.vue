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
        <div class="server-response">
            <p>{{serverResponse}}</p>
        </div>
        <div v-if="hasPlayerData" class="player-card">
            <PlayerCard :player-name="searchedValue" :server-response="serverResponse"/>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import PlayerCard from './PlayerCard.vue'
    export default {
        name: "SearchBar",
        data() {
            return {
                playerName: '',
                searchedValue: '',
                serverResponse: '',
                hasPlayerData: false
            }
        },
        methods: {
            getPlayerName() {
                this.hasPlayerData = true;
                if (this.playerName === '') {
                    this.searchedValue = "No input given. Please enter a player name.";
                    console.log("empty");
                    return;
                }
                this.searchedValue = this.playerName;
                let serverUrl = "https://us-central1-fantasynewsaggregator.cloudfunctions.net/api";
                let url = `${serverUrl}/player?q=${this.playerName.replace(' ', '+')}`;
                console.log("URL ", url);
                axios.get(url)
                    .then((response) => {
                        this.serverResponse = response.data;
                        console.log(response);
                    })
                    .catch(function(err) {
                        console.log(err);
                    });
            }
        },
        components: {
            PlayerCard
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