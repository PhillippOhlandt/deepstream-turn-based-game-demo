<template>
    <div>
        <h1>Create Game</h1>
        <div class="form-group">
            <select class="form-control" v-model="selectedGame">
                <option v-for="gameType in gameTypes">{{ gameType }}</option>
            </select>
        </div>
        <div class="form-group">
            <button type="button" class="btn btn-primary" @click="createGame()">Create</button>
        </div>
    </div>
</template>

<script>
    module.exports = {
        data: function() {
            return {
                gameTypes: [],
                selectedGame: ''
            }
        },
        created: function() {
            this.$root.ds.rpc.make('get-game-types', {me: this.$root.me}, (error, result) => {
                if (!error) {
                    this.gameTypes = result
                    this.selectedGame = result[0]
                }
            })
        },
        methods: {
            createGame: function() {
                this.$root.ds.rpc.make('create-game', {me: this.$root.me, gameType: this.selectedGame}, (error, result) => {
                    if (!error) {
                        this.$root.joinedGame = result.gameID
                        this.$root.playingGame = true
                    }
                })
            }
        }
    }
</script>

<style>

</style>
