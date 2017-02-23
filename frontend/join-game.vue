<template>
    <div>
        <h1>Join Game</h1>
        <div class="form-group">
            <input type="text" class="form-control" id="gameid" placeholder="Game ID" v-model="gameID">
        </div>
        <div class="form-group">
            <button type="button" class="btn btn-primary" @click="joinGame()">Join</button>
        </div>

        <div class="alert alert-danger" v-if="errorMessage">{{ errorMessage }}</div>
    </div>
</template>

<script>
    module.exports = {
        data: function() {
            return {
                gameID: null,
                errorMessage: null,
            }
        },
        methods: {
            joinGame: function () {
                this.errorMessage = null
                if (this.gameID) {
                    this.$root.ds.rpc.make('join-game', {
                        gameID: this.gameID,
                        me: this.$root.me
                    }, (error, result) => {
                        if (error) {
                            this.errorMessage = error
                        } else {
                            this.$root.joinedGame = result.gameID
                            this.$root.playingGame = true
                        }
                    })
                }
            }
        }
    }
</script>

<style>

</style>
