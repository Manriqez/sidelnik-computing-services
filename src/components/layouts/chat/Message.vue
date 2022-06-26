<template>
  <div>
      <ul v-if="chatData.length > 0" class="message-list">
            <li
                v-for="item in chatData"
                :key="item.id"
                :class="{ 'message-list-item': true, 'message-list-item__own': item.userId === userData._id }"
            >
                <div class="message-list-item--username">{{ item.username }}</div>
                <div class="message-list-item--message">{{ item.msg }}</div>
           </li>
      </ul>
      <div v-else><h5>Нет сообщений</h5></div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    name: 'Message',
    computed: {
        ...mapGetters({
            chatData: 'chatData',
            userData: 'userData'
        })
    }
}
</script>

<style lang="scss" scoped>
    .message-list {
        display: flex;
        flex-direction: column;
        .message-list-item {
            border-radius: 15px;
            background-color: rgb(232, 123, 134);
            color: #fff;
            padding: 12px;
            text-align: left;
            max-width: 300px;
            min-width: 150px;
            word-wrap: break-word;
            margin-bottom: 15px;
            align-self: flex-start;
            &--username {
                font-size: 18px;
                margin: 0 0 15px 15px;
            }
            &__own {
                align-self: flex-end;
                background-color: rgb(223, 84, 98);
            }
        }
    }
</style>