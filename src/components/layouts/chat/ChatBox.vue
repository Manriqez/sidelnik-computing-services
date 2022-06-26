<template>
  <div class="chat-box">
      <div class="chat-box-view">
          <Message></Message>
      </div>
      <div class="chat-box-input">
        <div class="input-field">
            <div class="row">
                <input
                    placeholder="Введите сообщение"
                    id="message"
                    type="text"
                    class="validate col s11"
                    v-model="message">
                <div class="col s1">
                    <button 
                        class="btn waves-effect waves-light"
                        type="submit" name="action"
                        @click.prevent="submitMessage"
                        :disabled="!this.message"
                    >
                        <i class="material-icons right">send</i>
                    </button>
                </div>
            </div>
        </div>
      </div>
  </div>
</template>

<script>
import Message from './Message.vue'

export default {
    name: 'ChatBox',
    components: {
        Message
    },
    emits: ['messageHandler'],
    data() {
        return {
            message: ''
        }
    },
    methods: {
        submitMessage() {
            this.$emit('messageHandler', this.message)
            this.message = ''
        }
    }
}
</script>

<style lang="scss" scoped>
    .chat-box {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-content: stretch;
        
        min-height: 100%;
        padding: 15px 45px;
        margin: 30px auto;
        max-width: 768px;
        height: 70vh;
        border-radius: 15px;
        box-shadow: 5px 4px 25px 0px rgba(34, 60, 80, 0.2);
        &-input {
            padding-top: 10px;
            border-top: 1px solid #cbcaca;
        }
        &-view {
            
        overflow: auto;
        }
        &-view, &-input {
            flex: 0 1 auto;
        }
    }

    button i {
        margin-left: 0;
    }
</style>