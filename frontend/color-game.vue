<template>
    <div>
        <div class="colorBox" :style="{backgroundColor: game.data.color}"></div>

        <div class="controls" v-if="myTurn">
            <h2>Your Turn!</h2>

            <div class="colorOptionBoxContainer">
                <div class="colorOptionBox" style="background-color: #ffffff;" @click="selectColor('#ffffff')"></div>
                <div class="colorOptionBox" style="background-color: #000000;" @click="selectColor('#000000')"></div>
                <div class="colorOptionBox" style="background-color: #A27E6F;" @click="selectColor('#A27E6F')"></div>
                <div class="colorOptionBox" style="background-color: #09814A;" @click="selectColor('#09814A')"></div>
                <div class="colorOptionBox" style="background-color: #150578;" @click="selectColor('#150578')"></div>
            </div>
        </div>
    </div>
</template>

<script>
    module.exports = {
        props: ['game', 'gameid'],
        data: function() {
            return {

            }
        },
        methods: {
          selectColor: function(color) {
              this.$root.ds.rpc.make('turn',{me: this.$root.me, gameID: this.gameid, data: {color: color}}, (error, result) => {
                  console.log(error, result)
              })
          }
        },
        computed: {
            myTurn: function() {
                return this.game.nextTurn === this.$root.me.username
            }
        }
    }
</script>

<style scoped>
    .colorBox {
        width: 100%;
        height: 70px;
        border: 3px solid black;
        border-radius: 5px;
        margin-bottom: 20px;
    }

    .colorOptionBoxContainer {
        display: flex;
    }

    .colorOptionBox {
        height: 50px;
        width: 50px;
        border: 3px solid black;
        border-radius: 5px;
        margin-right: 10px;
    }
</style>
