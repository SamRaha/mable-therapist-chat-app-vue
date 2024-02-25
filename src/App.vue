<script setup>
import { ref, nextTick } from "vue";
import { useChat } from "./api/useChat";

const { sendMessage: originalSendMessage, messages, userInput } = useChat();
const messagesContainerRef = ref(null);

const sendMessage = async () => {
    await originalSendMessage();
    await nextTick();
    messagesContainerRef.value.scrollTop = messagesContainerRef.value.scrollHeight;
};
</script>

<template>
    <div class="chat-container">
        <div class="messages" ref="messagesContainerRef">
            <div v-for="(message, index) in messages" :key="index" :class="`message ${message.role}`">
                {{ message.content }}
            </div>
        </div>
        <div class="message-input">
            <input v-model="userInput" @keyup.enter="sendMessage" placeholder="Speak to Mable here..." />
            <button @click="sendMessage">Send</button>
        </div>
    </div>
</template>
<style scoped>
.chat-container {
    display: flex;
    flex-direction: column-reverse;
    height: 100vh;
    background-color: #f7f8f9;
    margin: auto;
    max-width: 600px;
    width: 100%;
}

.messages {
    overflow-y: scroll;
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-bottom: 50px;
}

.message {
    padding: 10px 15px;
    border-radius: 20px;
    margin-bottom: 2px;
    max-width: 75%;
    word-break: break-word;
    background-color: #ffffff;
    box-shadow: 0 2px 2px rgba(0, 0, 0, 0.05);
}

.user {
    align-self: flex-end;
    background-color: #007bff;
    color: #ffffff;
    border-bottom-right-radius: 0;
}

.assistant {
    align-self: flex-start;
    background-color: #ececec;
    border-bottom-left-radius: 0;
}

.message-input {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    max-width: 600px;
    margin: auto;
    background-color: #fff;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    display: flex;
    justify-content: space-between;
    padding: 10px;
    box-sizing: border-box;
}

.message-input input,
.message-input button {
    outline: none;
    border: none;
}

.message-input input {
    flex-grow: 1;
    margin-right: 10px;
    font-family: "Montserrat", sans-serif;
    font-size: 16px;
}

.message-input button {
    background-color: #52cda2;
    color: white;
    padding: 12px 24px;
    cursor: pointer;
    border-radius: 20px;
    font-size: 16px;
}

.message-input button:hover {
    background-color: #4dbf97;
}
</style>
