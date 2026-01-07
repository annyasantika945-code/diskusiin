import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase, ref, push, onChildAdded } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyDOgu8RbtRmROhraUB7Nl1mJ41nAirxVk4",
  authDomain: "diskusi-in.firebaseapp.com",
  databaseURL: "https://diskusi-in-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "diskusi-in",
  storageBucket: "diskusi-in.firebasestorage.app",
  messagingSenderId: "823851958982",
  appId: "1:823851958982:web:5192dccfabdf69e83e8dc7"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const username = localStorage.getItem("username");
const chatBox = document.getElementById("chatBox");
const messagesRef = ref(db, "messages");

/* Kirim pesan */
window.sendMessage = function () {
  const messageInput = document.getElementById("message");
  const text = messageInput.value.trim();
  if (text === "") return;

  push(messagesRef, {
    user: username,
    text: text
  });

  messageInput.value = "";
};

/* Terima pesan */
onChildAdded(messagesRef, (snapshot) => {
  const data = snapshot.val();

  const bubble = document.createElement("div");
  bubble.classList.add("chat-bubble");

  if (data.user === username) {
    bubble.classList.add("chat-right"); // pengirim
  } else {
    bubble.classList.add("chat-left"); // penerima
  }

  bubble.innerHTML = `<strong>${data.user}</strong><br>${data.text}`;
  chatBox.appendChild(bubble);
  chatBox.scrollTop = chatBox.scrollHeight;
});
