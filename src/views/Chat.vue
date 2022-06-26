<template>
    <div class="container">
        <ChatBox @message-handler="messageHandler"></ChatBox>
    </div>
</template>

<script>
import ChatBox from '@/components/layouts/chat/ChatBox.vue'
import SocketioService from '@/services/sockets/socketio.service.js'
import { mapActions, mapGetters } from 'vuex'

export default {
    name: 'Chat',
    data() {
        return {
            userSocketId: ''
        }
    },
    computed: {
        ...mapGetters({
            isAuthorized: 'isAuthorized',
            userData: 'userData'
        }),
    },
    methods: {
        ...mapActions({
            fetchUserData: 'fetchUserData',
            fetchChatData: 'fetchChatData'
        }),
        messageHandler(msg) {
            const payload = {
                username: this.userData.username,
                msg
            }
            SocketioService.socket.emit('send-message', payload)
            this.fetchChatData({ ...payload, userId: this.userData._id })
        }
    },
    async created() {
        await this.fetchUserData()
        if(!this.isAuthorized) {
            this.$router.replace({ path: '/' }) 
        }
        const payload = {
            id: this.userData._id,
            username: this.userData.username
        }
        SocketioService.setupSocketConnection(payload); 
        SocketioService.socket.on('broadcast', (data) => {
            this.fetchChatData(data)
        })
        SocketioService.socket.emit('userJoin', { id: this.userData._id, username: this.userData.username }, data => {
            if (typeof data === 'string') {
                console.error(data)
            } else {
                this.userSocketId = data.userId
            }
        })
},
    beforeUnmount() {
        SocketioService.disconnect();
    },
    components: {
        ChatBox
    }
}
</script>

<style>

</style>