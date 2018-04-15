<template>
    <div class="card">
        <div class="card-body">
            <h5 class="card-title">{{playerName}}</h5>
            <p class="card-text"> {{serverResponse}} </p>
        </div>
    </div>
</template>

<script>
    export default {
        name: "player-card",
        props: ['player-name', 'server-response'],
        data () {
            return {

            }
        }
    }
</script>

<style scoped>

</style>