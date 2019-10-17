<template>
    <div class="home-page">
        <h2>let's get it</h2>
        <mt-button type="default" class="choose-button" @click.native="goTodo('wh')">我是吴慧,go</mt-button>
        <br>
        <mt-button type="primary" class="choose-button" @click.native="goTodo('xh')">我是谢浩,go</mt-button>
    </div>
</template>

<script>
export default {
    data() {
        return {}
    },
    methods: {
        goTodo(user){
            window.localStorage.setItem('user', user);
            this.$router.push('/todolist');
        }
    }
}
</script>

<style scoped>
.home-page {
    text-align: center;
    margin-top: 150px;
}
.choose-button {
    margin: 10px 0;
}
</style>