<template>
<div class="todo-page">
    <mt-header :title="headerTitle">
        <p slot="left" @click="changeUser">{{currentUser}}</p>
        <!-- <mt-button icon="more" slot="right"></mt-button> -->
    </mt-header>
    <mt-navbar v-model="selected">
        <mt-tab-item id="today">Today's Todolist.</mt-tab-item>
        <mt-tab-item id="history">History's Todolist</mt-tab-item>
    </mt-navbar>

    <!-- tab-container -->
    <mt-tab-container v-model="selected">
        <mt-tab-container-item id="today">
            <div class="home-page">
                <!-- <mt-checklist
                    title="just do it"
                    align="left"
                    v-model="value"
                    @change="checkChange"
                    :options="options">
                    </mt-checklist>
                </div> -->
                <p style="margin-left: 10px;font-size: 12px;color: #999; margin-top:10px;">{{this.options.length === 0?'添加今日任务':'just do it'}}</p>
                <ul>
                    <li v-for="(item, index) in options" :key="index" class="todolist-item">
                        <div class="todolist-label">
                            <i style="width: 20px; font-size: 20px; color: green; display: inline-block;" class="iconfont icon-zhengque" v-show="item.status === 'done'"></i>
                            <i style="width: 20px;color: #fff; display: inline-block;" class="iconfont icon-zhengque" v-show="item.status === 'doing'"></i>
                            <span>{{item.label}}</span>
                        </div>
                        <div class="btn-group">
                            <i class="iconfont icon-zhengque1" style="margin: 0 10px;" @click="done(index)"></i>
                            <i class="iconfont icon-shanchu" style="color: red;" @click="deleteOption(index)"></i>
                        </div>
                    </li>
                </ul>
            </div>
            <mt-field placeholder="New Item" :disableClear="true" v-model="newTodoItem">
                <mt-button @click="newItem">To do it</mt-button>
            </mt-field>
        </mt-tab-container-item>
        <mt-tab-container-item id="history">
            <p style="font-size: 12px;color: #999; margin-top:20px; text-align: center;" v-if="historyList.length === 0">暂无记录</p>
            <ul
                v-infinite-scroll="loadMore"
                infinite-scroll-disabled="loading"
                infinite-scroll-distance="10">
                <li v-for="item in historyList" :key="item.time">
                    <p>{{item.time}}</p>
                    <ul>
                        <li v-for="opt in item.content" :key="opt.label">
                            <div class="todolist-label">
                                <i style="width: 20px; font-size: 20px; color: green; display: inline-block;" class="iconfont icon-zhengque" v-show="opt.status === 'done'"></i>
                                <i style="width: 20px; font-size: 16px; color: red; display: inline-block;" class="iconfont icon-cuowu" v-show="opt.status === 'doing'"></i>
                                <span>{{opt.label}}</span>
                            </div>
                        </li>
                    </ul>
                </li>
            </ul>
        </mt-tab-container-item>
    </mt-tab-container>
    <div class="share">
        <share :config="config"></share>
    </div>
</div>

</template>

<script>
import {formatDate, baseUrl} from '../config/utils';
import { Toast } from 'mint-ui';

export default {
    data() {
        return {
            headerTitle: 'Today: ' + formatDate(new Date(), '-'),
            selected: 'today',
            currentUser: '',
            options: [],
            newTodoItem: '',
            historyList: [],
            config: {
                url                 : window.location.href, // 网址
                sites               : ['wechat'], // 启用的站点
                disabled            : [], // 禁用的站点
                wechatQrcodeTitle   : '微信扫一扫：分享', // 微信二维码提示文字
                wechatQrcodeHelper  : '<p>微信里点“发现”，扫一下</p><p>二维码便可将本文分享至朋友圈。</p>'
            }
        }
    },
    watch: {
        selected() {
            this.options = [];
            this.getOptions();
        },
    },
    created() {
        this.currentUser = this.getCurrentUser();
        this.getOptions();
    },
    methods: {
        loadMore() {
            this.loading = true;
            setTimeout(() => {
                this.loading = false;
            }, 1500);
        },
        changeUser() {
            let currentUser = window.localStorage.getItem('user');
            window.localStorage.setItem('user', currentUser === 'wh'?'xh':'wh');
            this.currentUser = this.getCurrentUser();
            setTimeout(() => {
                this.getOptions();
            })
        },
        getCurrentUser() {
            return window.localStorage.getItem('user') === 'wh' ? '吴慧' :'谢浩';
        },
        newTodoList() {
            let params = {
                time: formatDate(new Date(), '-'),
                user: window.localStorage.getItem('user'),
                content: this.options,
            }
            this.$http.post(`${baseUrl}/todolist`, params).then((res) => {
                    Toast({
                        message: res.body,
                        position: 'bottom',
                        duration: 5000
                    }); 
            })
        },
        getOptions() {
            let params = {
                type: this.selected,
                time: formatDate(new Date(), '-'),
                user: window.localStorage.getItem('user'),
            }
            this.$http.get(`${baseUrl}/todolist`, {params: params}).then((res) => {
                if (this.selected === 'today') {
                    if (res.body.length !== 0) {
                        this.options = res.body[0].content;
                    } else {
                        this.options = []; 
                    }
                } else {
                    this.historyList = res.body;
                }
            })
        },
        newItem() {
            this.options.push({label: this.newTodoItem, status: 'doing'});
            this.newTodoItem = '';
            setTimeout(() => {
                this.newTodoList();
            })
        },
        done(index) {
            this.$set(this.options[index], 'status', 'done')
            setTimeout(() => {
                this.newTodoList();
            })
        },
        deleteOption(index){
            this.options.splice(index, 1);
            setTimeout(() => {
                this.newTodoList();
            })
        }
    }
}
</script>

<style>
    @font-face {
        font-family: 'iconfont';  /* project id 1464132 */
        src: url('//at.alicdn.com/t/font_1464132_pij70w5053.eot');
        src: url('//at.alicdn.com/t/font_1464132_pij70w5053.eot?#iefix') format('embedded-opentype'),
        url('//at.alicdn.com/t/font_1464132_pij70w5053.woff2') format('woff2'),
        url('//at.alicdn.com/t/font_1464132_pij70w5053.woff') format('woff'),
        url('//at.alicdn.com/t/font_1464132_pij70w5053.ttf') format('truetype'),
        url('//at.alicdn.com/t/font_1464132_pij70w5053.svg#iconfont') format('svg');
    }
    .mint-checklist-label {
        display: flex;
        align-items: center;
    }
    ul {
        padding: 0;
        margin: 10px;
    }
    ul li {
        list-style: none;
        margin: 5px 0;
    }
    .todolist-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .todolist-label {
        display: flex;
        align-items: center;
    }
    .btn-group {
        margin-right: 10px;
    }
    .share {
        position: absolute;
        bottom: 20px;
        left: 50%;
        margin-left: -21px;
    }
</style>  