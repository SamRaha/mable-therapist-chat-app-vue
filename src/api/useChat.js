import { ref } from "vue";
import { v4 as uuidv4 } from "uuid";

export const useChat = () => {
    const messages = ref([]);
    const userInput = ref("");
    const sessionId = uuidv4();

    const sendMessage = async () => {
        const trimmedInput = userInput.value.trim();
        if (!trimmedInput) return;

        const userMessage = { role: "user", content: trimmedInput };
        console.log("userInput : ", userInput.value);
        console.log("message: ", userMessage);

        messages.value.push(userMessage);
        userInput.value = "";

        try {
            const response = await fetch("http://localhost:3000/chat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-api-key": "91ff0343-001a-4abd-a7cf-ad818430d5c0",
                },
                body: JSON.stringify({ sessionId, userMessage: userMessage.content }),
            });

            if (!response.ok) {
                throw new Error("Failed to fetch");
            }

            const { reply } = await response.json();
            messages.value.push({ role: "assistant", content: reply });
        } catch (error) {
            console.error("Error:", error);
            messages.value.push({ role: "system", content: "Error communicating with the server." });
        }
    };

    return { sendMessage, messages, userInput };
};
