let deepstream = require('deepstream.io-client-js')
let ds

let loggedIn = false

process.stdin.resume();//so the program will not close instantly
function exitHandler(err) {
    if (err) console.log(err.stack);
    if(loggedIn) {
        ds.rpc.unprovide('get-game-types')
        ds.rpc.unprovide('create-game')
        ds.rpc.unprovide('join-game')
        ds.rpc.unprovide('leave-game')
        ds.rpc.unprovide('turn')
        setTimeout(function(){
            ds.close()
            process.exit();
        }, 1000)
    } else {
        process.exit();
    }
}
process.on('exit', exitHandler.bind(null));
process.on('SIGINT', exitHandler.bind(null));
process.on('SIGTERM', exitHandler.bind(null));
process.on('uncaughtException', exitHandler.bind(null));

setTimeout(connectAndLogin, 2000);

const gameTypes = {
    color: {
        data: {
            color: '#ffffff'
        }
    }
}

function connectAndLogin() {
    ds = deepstream(process.env.DEEPSTREAM_HOST + ':' + process.env.DEEPSTREAM_PORT , {
        reconnectIntervalIncrement: 100,
        maxReconnectInterval: 500,
        maxReconnectAttempts: Infinity
    })

    ds.on( 'error', () => {})

    ds.login({
            username: 'backend', password: 'password'
        },
        function(success, data) {
            console.log('LOGIN', success, data)

            if (loggedIn) {
                ds.rpc.unprovide('get-game-types')
                ds.rpc.unprovide('create-game')
                ds.rpc.unprovide('join-game')
                ds.rpc.unprovide('leave-leave')
                ds.rpc.unprovide('turn')
            }

            provideRPCs()

            loggedIn = true;
        })
}

function provideRPCs() {
    ds.rpc.provide('get-game-types', function (data, response) {
        response.send(Object.keys(gameTypes))
    });

    ds.rpc.provide('create-game', function (data, response) {
        if (gameTypes[data.gameType]) {

            const gameID = ds.getUid()
            const record = ds.record.getRecord('session/' + gameID).set({
                type: data.gameType,
                players: [
                    data.me.username
                ],
                nextTurn: data.me.username,
                data: gameTypes[data.gameType].data
            }).discard()

            response.send({gameID: gameID})

        } else {
            response.error('Invalid game ID!')
        }
    });

    ds.rpc.provide('join-game', function (data, response) {
        ds.record.has('session/' + data.gameID, (err, has) => {
            if (has) {
                const record = ds.record.getRecord('session/' + data.gameID)
                record.whenReady((record) => {
                    let players = record.get().players
                    console.log(players)
                    if (players.length >= 4 && !players.includes(data.me.username)) {
                        response.error('Game is full!')
                        return
                    }

                    if (!players.includes(data.me.username)) {
                        players.push(data.me.username)
                    }

                    record.set('players', players)
                    record.discard()

                    response.send({gameID: data.gameID})
                })
            } else {
                response.error('No game found!')
            }
        })
    });

    ds.rpc.provide('leave-game', function (data, response) {
        // Not implemented yet
    });

    ds.rpc.provide('turn', function (data, response) {
        const record = ds.record.getRecord('session/' + data.gameID)
        record.whenReady((record) => {
            record.set('data', data.data)

            //decide who can turn next
            const players = record.get().players

            let index = players.indexOf(data.me.username);
            if(index >= 0 && index < players.length - 1) {
                record.set('nextTurn', players[index + 1])
            } else {
                record.set('nextTurn', players[0])
            }
            record.discard()
            response.send({status: 'success'})
        })
    });
}




