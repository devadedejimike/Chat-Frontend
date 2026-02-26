import { useEffect, useRef, useState } from "react";
import { API } from "../api";
import { useNavigate } from "react-router-dom";

import type{ Chat, User, Message } from "../types/chat";
import SideBar from "./SideBar";
import MessageHeader from "./MessageHeader";
import MessageArea from "./MessageArea";
import MessageInput from "./MessageInput";
import { Send } from "lucide-react";

const ChatPage = () => {
  const navigate = useNavigate();

  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
  const [chats, setChats] = useState<Chat[]>([]);
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [searchUser, setSearchUser] = useState("");
  const [searchUserResult, setSearchUserResult] = useState<User[]>([]);
  const [searchMessage, setSearchMessage] = useState("");

  const scrollRef = useRef<HTMLDivElement | null>(null);
  const fileRef = useRef<HTMLInputElement | null>(null);

  // =========================
  // Helper
  // =========================

  const getChatName = (chat: Chat) => {
          if(!loggedInUser) return "Loading...."

          if(chat.isGroupChat){
              return chat.chatName;
          }

          const otherUser = chat.users.find(u => u._id !== loggedInUser._id)
          return otherUser?.username || "unknown username"; 
  }

  // =========================
  // Fetch Chats
  // =========================

  useEffect(() => {
        // Fetch user from localStorage
        const user = localStorage.getItem("user");
        
        // Check if user is logged in
        if (!user){
            navigate("/auth") // Redirect to auth page
            return
        }
        const parsedUser = JSON.parse(user);
        setLoggedInUser(parsedUser);
        // Fetch all chat in db
        const fetchChats = async () => {
        try {
            const {data} = await API.get("/chat")
            // console.log("Data from server", data)
            setChats(data.chats || []) 
            // console.log("state of chats", chats)
        } catch (error) {
            console.log("Error fetching chats", error)
        }
    }
    fetchChats();
    }, [navigate])
  // =========================
  // Fetch Messages
  // =========================

  useEffect(()=>{
        if(!selectedChat) return;

        const fetchMessage = async() => {
            try {
                const {data} = await API.get(`/message/${selectedChat._id}`)
                setMessages(data)
            } catch (error) {
                console.log("Error fetching message", error)
            }
        }
        fetchMessage()
    },[selectedChat])

  // =========================
  // Send Message
  // =========================

  const sendMessage = async (e: any) => {
    if (e.type && e.key !== "Enter") return;
    if (!selectedChat || !newMessage.trim()) return;

    try {
        const { data } = await API.post("/message/send", {
            text: newMessage,
            chatId: selectedChat._id, 
        });

        setMessages(prev => [...prev, data.message]);

        // Update latest message in chat list
        setChats(prevChat =>
            prevChat.map(chat =>
                chat._id === data.chat._id
                    ? { ...chat, latestMessage: data.message }
                    : chat
            )
        );

        setSelectedChat(prev =>
            prev && prev._id === data.chat._id
                ? { ...prev, latestMessage: data.message }
                : prev
        );

        setNewMessage("");
        } catch (error) {
            console.log("Error occured", error);
        }
    };

  // =========================
  // File Upload
  // =========================

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if(!file || !selectedChat) return;
        console.log("File submitted", file)

        const formData = new FormData();
        formData.append("file", file);
        formData.append("chatId", selectedChat._id)

        try {
            const { data } = await API.post("/message/send", formData, {headers : {"Content-Type": "multipart/form-data"}})

            setMessages(prev => [...prev, data.message])
            setChats(prev =>
                prev.map(chat =>
                    chat._id === data.chat._id
                    ? { ...chat, latestMessage: data.message }
                    : chat
                )
                );

        } catch (error) {
            console.error("File upload failed", error);
        }
    }

  // =========================
  // Search User
  // =========================

  const handleSearchUser = async () => {
    if (!searchUser.trim()) return;

    const { data } = await API.get(`/chat/search?search=${searchUser}`);
    setSearchUserResult(data.user || []);
  };

  const handleAccessChat = async (userId: string) => {
        try {
            const { data } = await API.post("/chat", { userId });

            setChats(prev => {
                if (prev.find(c => c._id === data._id)) return prev;
                return [data, ...prev];
            });
            setSelectedChat(data)
            setSearchUserResult([]);
            setSearchUser("");
        } catch (error) {
            console.error("Error accessing chat", error);
        }
    };

  // =========================
  // Search Messages
  // =========================

  const handleSearchMessages = () => {
    const query = searchMessage.toLowerCase().trim();
    if (!query) {
      return;
    }

    const findMatch = messages.find((m) =>
      m.text?.toLowerCase().includes(query)
    );
    if (findMatch) {
      const element = document.getElementById(findMatch._id);
      element?.scrollIntoView({
        behavior: "smooth",
        block: "center"
      })
    }
  };

  // =========================
  //  Update Profile Picture
  // =========================

  const updateDp = () => {}

  // =========================
  //  Create Group
  // =========================

  const createGroup = () => {}

  // =========================
  //  Add Member
  // =========================

  const addMember = () => {}

  // =========================
  //  Remove Member
  // =========================

  const removeMember = () => {} 

  // =========================
  // Edit Group Name
  // =========================

  const editGroupName = () => {}

  // =========================
  // Logout
  // =========================

  const logOut = () => {
    localStorage.removeItem("token");
    navigate("/auth");
  };


  return (
    <div className="flex h-screen bg-brand-dark text-white overflow-hidden">
      <SideBar
        loggedInUser={loggedInUser}
        chats={chats}
        selectedChat={selectedChat}
        searchUser={searchUser}
        searchUserResult={searchUserResult}
        setSearchUser={setSearchUser}
        handleSearchUser={handleSearchUser}
        handleAccessChat={handleAccessChat}
        setSelectedChat={setSelectedChat}
        getChatName={getChatName}
        logOut={logOut}
      />

      <div className="flex-1 flex flex-col bg-brand-dark">
        {!selectedChat && (
          <div className="flex-1 flex flex-col items-center justify-center text-gray-500">
              <div className="bg-brand-card p-6 rounded-full mb-4">
                  <Send size={48} className="opacity-20"/>
              </div>
              <p className="text-sm mt-2 ">Select a chat to start messaging</p>
          </div> 
        )}

        {selectedChat && (
          <>
            <MessageHeader
              selectedChat={selectedChat}
              getChatName={getChatName}
              searchMessage={searchMessage}
              setSearchMessage={setSearchMessage}
              handleSearchMessages={handleSearchMessages}
              updateDp={updateDp}
              createGroup={createGroup}
              addMember={addMember}
              removeMember={removeMember}
              editGroupName={editGroupName}
            />

            <MessageArea
              messages={messages}
              loggedInUser={loggedInUser}
              selectedChat={selectedChat}
              scrollRef={scrollRef}
              searchMessage={searchMessage}
            />

            <MessageInput
              newMessage={newMessage}
              setNewMessage={setNewMessage}
              sendMessage={sendMessage}
              handleFileChange={handleFileChange}
              fileRef={fileRef}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default ChatPage;