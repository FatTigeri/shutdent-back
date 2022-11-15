<template>
    <div style="padding: 0.625rem; margin-bottom: 3.125rem">
        <el-row>
            <el-col :xs="6" :sm="6">
                <el-card style="width: 100%; min-height: 18.75rem; color: #333">
                    <div style="padding-bottom: 0.625rem; border-bottom: 1px solid #ccc; font-weight: 600;">
                        在线用户<span style="font-size: 0.75rem">（点击聊天气泡开始聊天）</span>
                    </div>
                    <div style="padding: 0.625rem 0; font-weight: 600;" v-for="user in users" :key="user.username">
                        <span>{{ user.username }}</span>
                        <i class="el-icon-chat-dot-round"
                            style="margin-left: 0.625rem; font-size: 0.0333rem; cursor: pointer;font-weight: 600;"
                            @click="connect(user.username)"></i>
                        <span style="font-size: 0.75rem;color: limegreen; margin-left: 0.3125rem;font-weight: 600;"
                            v-if="user.username === chatUser">chatting...</span>
                    </div>
                    <div v-if="users.length === 0"
                        style="width: 100%; font-size: 0.9rem; font-weight: 600;margin: 2rem auto;">
                        当前没有在线的用户
                    </div>
                </el-card>
            </el-col>
            <el-col :xs="18" :sm="18">
                <div style="width: 90%; margin: 0 auto; background-color: white;
                      border-radius: 0.3125rem; box-shadow: 0 0 0.625rem #ccc; box-sizing: border-box;">
                    <div style="text-align: center; line-height: 3.125rem;font-weight: 600;">
                        Web聊天室（{{ chatUser }}）
                    </div>
                    <div style="height: 21.875rem; overflow:auto; border-top: 0.0333rem solid #ccc;border-bottom: 0.0333rem solid #ccc"
                        v-html="content">
                    </div>
                    <div style="height: 12.5rem">
                        <el-input type="textarea" :rows="5" @keydown.enter.native="send" v-model="text"
                            placeholder="Enter发送消息" style="width:97%; padding: 1.25rem; border: none; outline: none">
                        </el-input>
                        <div style="text-align: right; padding-right: 0.625rem">
                            <el-button type="primary" size="mini" @click="send">消息发送</el-button>
                        </div>
                    </div>
                </div>
            </el-col>
        </el-row>
    </div>
</template>
<script>
let socket;
export default {
    name: "chat",
    data() {
        return {
            circleUrl: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
            user: '',
            isCollapse: false,
            users: [],
            chatUser: '',
            text: "",
            messages: [],
            content: ''
        }
    },
    created() {
        this.init()
    },
    methods: {
        connect(username) {
            // 要进行聊天的人 this.user 是本人
            this.chatUser = username
            let message = { from: this.user, to: this.chatUser, text: this.user + '邀请您聊天' }
            socket.send(JSON.stringify(message));  // 将组装好的json发送给服务端，由服务端进行转发
            this.messages.push({ user: this.user, text: this.text })
            // 构建消息内容，本人消息
            // this.createContent(null, this.user, this.text)
            // this.text = '';
        },
        send() {
            if (!this.chatUser) {
                this.$message({ type: 'warning', message: "请选择聊天对象" })
                return;
            }
            if (!this.text) {
                this.$message({ type: 'warning', message: "请输入内容" })
            } else {
                if (typeof (WebSocket) == "undefined") {
                    console.log("您的浏览器不支持WebSocket");
                } else {
                    console.log("您的浏览器支持WebSocket");
                    // 组装待发送的消息 json
                    // {"from": "zhang", "to": "admin", "text": "聊天文本"}
                    let message = { from: this.user, to: this.chatUser, text: this.text }
                    socket.send(JSON.stringify(message));  // 将组装好的json发送给服务端，由服务端进行转发
                    this.messages.push({ user: this.user, text: this.text })
                    // 构建消息内容，本人消息
                    this.createContent(null, this.user, this.text)
                    this.text = '';
                }
            }
        },
        createContent(remoteUser, nowUser, text) {  // 这个方法是用来将 json的聊天消息数据转换成 html的。
            let html
            // 当前用户消息
            if (nowUser) { // nowUser 表示是否显示当前用户发送的聊天消息，绿色气泡
                html = "<div class=\"el-row\" style=\"padding: 0.3125rem 0\">\n" +
                    "  <div class=\"el-col el-col-22\" style=\"text-align: right; padding-right: 0.625rem\">\n" +
                    "    <div class=\"tip left1\">" + text + "</div>\n" +
                    "  </div>\n" +
                    "  <div class=\"el-col el-col-2\">\n" +
                    "  <span class=\"el-avatar el-avatar--circle\" style=\"height: 2.5rem; width: 2.5rem; line-height: 2.5rem;\">\n" +
                    "    <img " + "src=" + this.getSrc(this.$store.state.imgSrc) + " style=\"object-fit: cover;\">\n" +
                    "  </span>\n" +
                    "  </div>\n" +
                    "</div>";
            } else if (remoteUser) {   // remoteUser表示远程用户聊天消息，蓝色的气泡
                html = "<div class=\"el-row\" style=\"padding: 0.3125rem 0\">\n" +
                    "  <div class=\"el-col el-col-2\" style=\"text-align: right\">\n" +
                    "  <span class=\"el-avatar el-avatar--circle\" style=\"height: 2.5rem; width: 2.5rem; line-height: 2.5rem;\">\n" +
                    "    <img src=\"https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png\" style=\"object-fit: cover;\">\n" +
                    "  </span>\n" +
                    "  </div>\n" +
                    "  <div class=\"el-col el-col-22\" style=\"text-align: left; padding-left: 0.625rem\">\n" +
                    "    <div class=\"tip right1\">" + text + "</div>\n" +
                    "  </div>\n" +
                    "</div>";
            }
            this.content += html;
        },
        init() {
            this.user = sessionStorage.getItem("user") ? JSON.parse(sessionStorage.getItem("user")) : {}
            let username = this.user;
            let _this = this;
            if (typeof (WebSocket) == "undefined") {
                console.log("您的浏览器不支持WebSocket");
            } else {
                console.log("您的浏览器支持WebSocket");
                let socketUrl = "ws://1.12.235.213:8088/imserver/" + username;
                if (socket != null) {
                    socket.close();
                    socket = null;
                }
                // 开启一个websocket服务
                socket = new WebSocket(socketUrl);
                //打开事件
                socket.onopen = function () {
                    console.log("websocket已打开");
                };
                //  浏览器端收消息，获得从服务端发送过来的文本消息
                socket.onmessage = function (msg) {
                    console.log("收到数据====" + msg.data)
                    let index = msg.data.lastIndexOf('"')
                    let i = msg.data.lastIndexOf(':')
                    let m = msg.data.substring(index - 5, index)
                    let n = msg.data.substring(i + 2, index - 5)
                    if (m === '邀请您聊天') {
                        _this.$notify.info({
                            title: '消息',
                            message: '' + n + m
                        });
                    }
                    let data = JSON.parse(msg.data)  // 对收到的json数据进行解析， 类似这样的： {"users": [{"username": "zhang"},{ "username": "admin"}]}
                    if (data.users) {  // 获取在线人员信息
                        _this.users = data.users.filter(user => user.username !== username)  // 获取当前连接的所有用户信息，并且排除自身，自己不会出现在自己的聊天列表里
                    } else {
                        // 如果服务器端发送过来的json数据 不包含 users 这个key，那么发送过来的就是聊天文本json数据
                        //  // {"from": "zhang", "text": "hello"}
                        if (data.from === _this.chatUser) {
                            _this.messages.push(data)
                            // 构建消息内容
                            _this.createContent(data.from, null, data.text)
                        }
                    }
                };
                //关闭事件
                socket.onclose = function () {
                    console.log("websocket已关闭");
                };
                //发生了错误事件
                socket.onerror = function () {
                    console.log("websocket发生了错误");
                }
            }
        },
        // 返回后端传输到前端的图片地址
        getSrc(src) {
            return 'http://1.12.235.213/img/' + src
        },
    }
}
</script>
<style>
.tip {
    color: white;
    text-align: center;
    border-radius: 0.625rem;
    font-family: sans-serif;
    padding: 0.625rem;
    width: auto;
    display: inline-block !important;
    display: inline;
}

.right1 {
    background-color: deepskyblue;
}

.left1 {
    background-color: forestgreen;
}
</style>
  