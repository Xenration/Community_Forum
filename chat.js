document.addEventListener('DOMContentLoaded', () => {
    const messagesContainer = document.getElementById('messages');
    const messageInput = document.getElementById('messageInput');
    const sendBtn = document.getElementById('sendBtn');
    const logoutBtn = document.getElementById('logoutBtn');
    const imageUpload = document.getElementById('imageUpload');
    const uploadBtn = document.getElementById('uploadBtn');

    let currentUser = null;

    // Check auth state
    auth.onAuthStateChanged((user) => {
        if (!user) {
            // Not logged in, redirect to login page
            window.location.href = 'index.html';
        } else {
            currentUser = user;
            loadMessages();
        }
    });

    // Logout function
    logoutBtn.addEventListener('click', () => {
        auth.signOut().then(() => {
            window.location.href = 'index.html';
        });
    });

    // Send message function
    function sendMessage(text, imageUrl = null) {
        db.collection('messages').add({
            text: text,
            imageUrl: imageUrl,
            senderId: currentUser.uid,
            senderEmail: currentUser.email,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })
        .catch(error => {
            console.error('Error sending message:', error);
        });
    }

    // Load messages function
    function loadMessages() {
        db.collection('messages')
            .orderBy('timestamp', 'asc')
            .onSnapshot((snapshot) => {
                messagesContainer.innerHTML = '';
                snapshot.forEach(doc => {
                    const message = doc.data();
                    displayMessage(message);
                });
                // Scroll to bottom
                messagesContainer.scrollTop = messagesContainer.scrollHeight;
            });
    }

    // Display message function
    function displayMessage(message) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message';
        
        const senderSpan = document.createElement('span');
        senderSpan.className = 'message-sender';
        senderSpan.textContent = message.senderEmail.split('@')[0] + ': ';
        
        const textSpan = document.createElement('span');
        textSpan.textContent = message.text || '';
        
        const timeSpan = document.createElement('span');
        timeSpan.className = 'message-time';
        timeSpan.textContent = message.timestamp ? 
            new Date(message.timestamp.toDate()).toLocaleTimeString() : 'now';
        
        messageDiv.appendChild(senderSpan);
        messageDiv.appendChild(textSpan);
        messageDiv.appendChild(document.createElement('br'));
        messageDiv.appendChild(timeSpan);
        
        if (message.imageUrl) {
            const img = document.createElement('img');
            img.src = message.imageUrl;
            img.className = 'message-image';
            messageDiv.appendChild(img);
        }
        
        messagesContainer.appendChild(messageDiv);
    }

    // Send text message
    sendBtn.addEventListener('click', () => {
        const message = messageInput.value.trim();
        if (message) {
            sendMessage(message);
            messageInput.value = '';
        }
    });

    // Press Enter to send message
    messageInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const message = messageInput.value.trim();
            if (message) {
                sendMessage(message);
                messageInput.value = '';
            }
        }
    });

    // Upload image
    uploadBtn.addEventListener('click', () => {
        const file = imageUpload.files[0];
        if (file) {
            const storageRef = storage.ref(`images/${file.name}`);
            const uploadTask = storageRef.put(file);
            
            uploadTask.on('state_changed', 
                null, 
                (error) => {
                    console.error('Upload error:', error);
                }, 
                () => {
                    uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                        sendMessage('', downloadURL);
                        imageUpload.value = '';
                    });
                }
            );
        }
    });
});