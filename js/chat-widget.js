/* ========================================
   CHAT WIDGET JAVASCRIPT
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
    const chatToggle = document.getElementById('chat-toggle');
    const chatPanel = document.getElementById('chat-panel');
    const chatClose = document.getElementById('chat-close');
    const chatInput = document.getElementById('chat-input');
    const chatSend = document.getElementById('chat-send');
    const chatBody = document.getElementById('chat-body');
    const chatWelcome = document.querySelector('.chat-welcome');

    let isChatOpen = false;

    // Toggle Chat Panel
    const toggleChat = () => {
        if (!isChatOpen) {
            chatPanel.classList.remove('hidden');
            chatPanel.classList.remove('closing');
            isChatOpen = true;
            chatInput.focus();
        } else {
            chatPanel.classList.add('closing');
            setTimeout(() => {
                chatPanel.classList.add('hidden');
                chatPanel.classList.remove('closing');
            }, 200); // match animation duration
            isChatOpen = false;
        }
    };

    chatToggle.addEventListener('click', toggleChat);
    chatClose.addEventListener('click', toggleChat);

    // Send Message
    const sendMessage = async () => {
        const userInput = chatInput.value.trim();
        if (!userInput) return;

        // Hide welcome message if it exists
        if (chatWelcome) {
            chatWelcome.style.display = 'none';
        }

        // Add user message to UI
        appendMessage(userInput, 'user');
        chatInput.value = '';

        // Add loading spinner
        const loadingId = appendLoading();

        try {
            // API Call as requested
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ message: userInput })
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();

            // Remove loading spinner
            removeElement(loadingId);

            // Add bot response to UI
            if (data && data.answer) {
                appendMessage(data.answer, 'bot');
            } else {
                appendMessage('Something went wrong. Please try again.', 'error');
            }

        } catch (error) {
            console.error('Error fetching chat response:', error);
            removeElement(loadingId);
            appendMessage('Something went wrong. Please try again.', 'error');
        }
    };

    // Event Listeners for sending
    chatSend.addEventListener('click', sendMessage);

    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    // Helper Functions
    function appendMessage(text, sender) {
        const msgDiv = document.createElement('div');
        msgDiv.className = `chat-message ${sender}`;
        msgDiv.textContent = text;
        chatBody.appendChild(msgDiv);
        scrollToBottom();
    }

    function appendLoading() {
        const id = 'loading-' + Date.now();
        const loadingDiv = document.createElement('div');
        loadingDiv.className = 'chat-loading';
        loadingDiv.id = id;
        loadingDiv.innerHTML = '<span></span><span></span><span></span>';
        chatBody.appendChild(loadingDiv);
        scrollToBottom();
        return id;
    }

    function removeElement(id) {
        const el = document.getElementById(id);
        if (el) {
            el.remove();
        }
    }

    function scrollToBottom() {
        chatBody.scrollTop = chatBody.scrollHeight;
    }
});
