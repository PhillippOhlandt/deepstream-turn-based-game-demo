<template>
    <div>
        <h1>Login</h1>
        <div class="form-group">
            <label for="username">Username</label>
            <input type="text" class="form-control" id="username" placeholder="Username" v-model="username">
        </div>
        <div class="form-group">
            <label for="password">Password</label>
            <input type="password" class="form-control" id="password" placeholder="Password" v-model="password">
        </div>
        <button type="button" class="btn btn-primary" @click="login()">Login</button>
    </div>
</template>

<script>
    module.exports = {
        data: function() {
            return {
                username: '',
                password: '',
            }
        },
        methods: {
            login: function() {
                this.$root.ds.login({
                    username: this.username,
                    password: this.password
                }, (success, data) => {
                    if(success) {
                        this.$root.me = data;
                        this.$root.loggedIn = true;
                    }
                })
            }
        }
    }
</script>

<style>

</style>
