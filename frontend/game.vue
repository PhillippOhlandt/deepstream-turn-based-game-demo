<template>
    <div v-if="gameRecordContent.type">
        <div class="head">
            <h1>Game: {{ gameRecordContent.type }}</h1>
            GameID: {{ gameid }}
        </div>
        <div class="players">
            Players: {{ gameRecordContent.players.length }}
        </div>

        <hr>

        <div class="game">
            <color-game v-if="gameRecordContent.type === 'color'" :game="gameRecordContent" :gameid="gameid"></color-game>
        </div>
    </div>
</template>

<script>
    module.exports = {
        props: ['gameid'],
        components: {
            'color-game': 'url:color-game.vue',
        },
        data: function() {
            return {
                gameRecord: null,
                gameRecordContent: {}
            }
        },
        created: function() {
            this.gameRecord = this.$root.ds.record.getRecord('session/' + this.gameid)
            this.gameRecord.whenReady((record) => {
                this.gameRecordContent = record.get()
            })

            this.gameRecord.subscribe(this.gameRecordChanged);
        },
        methods: {
            gameRecordChanged: function(record) {
                this.gameRecordContent = record
            }
        }
    }
</script>

<style>

</style>
