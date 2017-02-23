Vue.use(httpVueLoader);

new Vue({
    el: '#app',
    components: {
        'test-component': 'url:test-component.vue',
        'login': 'url:login.vue',
        'join-game': 'url:join-game.vue',
        'create-game': 'url:create-game.vue',
        'game': 'url:game.vue',
    },
    data: {
        ds: null,
        loggedIn: false,
        me: {},
        playingGame: false,
        joinedGame: null,
    },
    created: function created() {
        this.ds = deepstream('localhost:6220');
    },
    methods: {

    }
});
