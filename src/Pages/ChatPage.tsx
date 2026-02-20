import { API } from "../api/index" 
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Search, Send, UserCircle } from "lucide-react";
import Button from "../components/button";

interface User{
    _id: string;
    username: string;
    email: string
}

interface Chat{
    _id: string;
    chatName: string;
    users: User[];
    latestMessage?: {
        text: string
    } ;
    isGroupChat: boolean;
}

interface Message{
    _id: string;
    text?: string;
    attachments?: string[],
    sender: User;
    chat: string;
    createdAt: string;
}

const ChatPage = () => {
    const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
    const [chats, setChats] = useState<Chat[]>([]);
    const [searchUser, setSearchUser] = useState('');
    const [searchUserResult, setSearchUserResult] = useState<User[]>([]);
    // const [isLoading, setIsLoading] = useState(false);
    const [selectedChat, setSelectedChat] = useState<Chat | null>(null)
    const [messages, setMessages] = useState<Message[]>([])
    const [newMessage, setNewMessage] = useState('')
    const [searchMessage, setSearchMessage] = useState("")
    const [searchMessageResult, setSearchMessageResult] = useState<Message[]>([]);
    const navigate = useNavigate();
    
    // To move to last sent message
    const scrollRef = useRef<HTMLDivElement>(null)
    useEffect(() => {
        scrollRef.current?.scrollIntoView({behavior: "smooth"})
    }, [messages])

    const fileRef = useRef<HTMLInputElement | null>(null)


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
    // Get chat name
    const getChatName = (chat: Chat) => {
        if(!loggedInUser) return "Loading...."

        if(chat.isGroupChat){
            return chat.chatName;
        }

        const otherUser = chat.users.find(u => u._id !== loggedInUser._id)
        return otherUser?.username || "unknown username"; 
    }
    // Search user feature
    const handleSearchUser = async () => {
        if (!searchUser){
            return alert("Please enter a name to search");
        }
        // setIsLoading(true)
        try {
            const {data} = await API.get(`/chat/search?search=${searchUser}`)
            setSearchUserResult(data.user || [])
        } catch (error) {
            console.error("Error searching chats", error)
        } finally {
            // setIsLoading(false)
        }
    }
    // Search Message in Chat
    const handleSearchMessages = async() =>{
        if(!searchMessage.trim() || !selectedChat) return;
        
        try {
            const {data} = await API.get(`/message/search/${selectedChat?._id}?keyword=${searchMessage}`)
            if(data.messages.length === 0){
                alert("No message found")
                return;
            }
            setSearchMessageResult(data.messages)
        } catch (error) {
            console.error("Error search message", error)
        }
    }

    // Clear Search Message

    // Fetch messages between users when chat is clicked
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
    // Fetch Messages when a chat is clicked
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
    // Sending message 
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

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if(!file || !selectedChat) return;
        console.log("File submitted", file)

        const formData = new FormData();
        formData.append("file", file);
        formData.append("chatId", selectedChat._id)

        try {
            const { data } = await API.post("/message/send", formData, {headers : {"Content-Type": "multipart/form-data"}})

            setMessages(prev => [...prev, data])
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
    
    // logout
    const logOut = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        navigate('/auth')
    }
    return (
        <div className="flex h-screen bg-brand-dark text-white overflow-hidden">
            {/* Sidebar */}
            <div className="w-72 lg:w-80 border-r border-brand-border flex flex-col bg-brand-dark/50">
                {/* Header */}
                <div className="p-4 border-b border-brand-border">
                    <h1 className="text-lg font-bold mb-3">Welcome, {loggedInUser?.username}👋</h1>
                    <div className="relative">
                        <input type="text"
                        name="search"
                        placeholder="Search for user...."
                        onChange={(e) => setSearchUser(e.target.value)} 
                        className="w-full px-3 py-2 bg-brand-card border border-brand-border rounded-md focus:border-primary text-white outline-none" 
                        />
                        <button className="absolute top-2 right-2 " onClick={handleSearchUser}><Search className="text-gray-400 hover:text-primary transition-colors"/></button>

                        {searchUserResult.length > 0 && (
                            <ul className="absolute top-12 left-0 w-full border border-brand-border bg-brand-card px-2 py-2 rounded shadow-lg z-50 overflow-y-auto space-y-2 max-h-60">
                            {searchUserResult.map(result => 
                                <li 
                                key={result._id} 
                                onClick={()=> handleAccessChat(result._id)}
                                className="px-4 py-3 hover:bg-brand-accent/10 cursor-pointer border-b border-brand-border last:border-0"
                                >{result.username}</li>
                        )}
                        </ul>
                        )}
                        
                    </div>
                </div>
                <div className="flex-1 overflow-y-auto">
                    <h3 className="font-bold text-xl p-4">Messages</h3>
                    {chats.map(chat => (
                        <div key={chat._id} onClick={() => setSelectedChat(chat)} 
                            className={`px-4 py-3 cursor-pointer ${selectedChat?._id == chat._id ? "bg-primary/20" : "hover:bg-brand-card" }`}>
                            <h4 className="font-semibold">{getChatName(chat)}</h4>
                            <p className="text-xs text-muted">{chat.latestMessage?.text || 'No message yet'}</p>
                        </div>
                    ))}
                </div>
                <Button
                    className="w-5/6 mx-auto mb-4 rounded-full"
                    onClick={logOut}
                >
                    Log out
                </Button>
            </div>
            {/* Message Area */}
            <div className="flex-1 flex flex-col bg-brand-dark">
                {selectedChat ? (
                <>
                    {/* Message Area Header */}
                    <div className="flex items-center justify-between gap-3 px-4 py-3 border-b border-brand-border bg-brand-dark/40">
                        <div className="flex items-center gap-2">
                            <UserCircle className="text-primary" size={32}/>
                            <p className="text-lg font-bold">{getChatName(selectedChat)}</p>
                        </div>
                        <div className="relative">
                            <input type="text"
                            name="search"
                            placeholder="Search Message...."
                            onChange={(e) => setSearchMessage(e.target.value)} 
                            className="px-3 py-2 bg-brand-card border border-brand-border rounded-md    focus:border-primary text-white outline-none" 
                            />
                            <button className="absolute right-3 top-1/2 -translate-y-3" onClick={handleSearchMessages}><Search className="text-gray-400 hover:text-primary transition-colors"/></button>
                        </div>
                    </div>
                    {/* Messaging Area */}
                    <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-brand-border space-y-2 p-4">
                        {(searchMessageResult.length > 0 ? searchMessageResult : messages).map((m) => {
                            const isMe = m.sender._id === loggedInUser?._id
                            const messageTime = new Date(m.createdAt) 
                            const formattedTime = messageTime.toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                                hour12: true
                            })
                            return (
                            <div
                                    key={m._id}
                                    className={`flex ${
                                        isMe
                                        ? "justify-end"
                                        : "justify-start"
                                    }`}
                                >
                                    <div className={`max-w-[70%] px-4 py-2 rounded-2xl ${
                                        isMe
                                        ? "bg-primary text-white rounded-tr-none"
                                        : "bg-brand-card text-white rounded-tl-none"
                                    }`}>
                                        {selectedChat.isGroupChat && !isMe && (
                                            <p className="text-xs text-primary mb-1">
                                                {m.sender.username}
                                            </p>
                                        )}

                                        <p className="text-sm leading-snug hover:opacity-90 transition-opacity">{m.text}</p>
                                        {m.attachments && m.attachments.length > 0 && (
                                            <div className="mt-2 space-y-2">
                                                {m.attachments.map((url, index) => {
                                                    const isImage = url.match(/\.(jpeg|jpg|png|gif|webp)$/i);
                                                    return isImage ? (
                                                        <img key={index} src={url} alt="Attachment" className="max-w-xs rounded-lg"/>
                                                    ) :(
                                                        <a
                                                        key={index}
                                                        href={url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="m-2 inline-block text-primary hover:underline text-sm"
                                                    >
                                                        veiw attachment
                                                    </a>
                                                    )
                                                })}
                                            </div>
                                        )}
                                        <p className="text-[10px] opacity-70 mt-1 text-right">{formattedTime}</p>
                                    </div>
                                    
                                </div>)
                        })}
                        <div ref={scrollRef}/>
                    </div>
                    {/* Input Box and Button */}
                    <div className="p-4 border-t border-brand-border bg-brand-dark/30 flex items-center gap-3">
                        <input 
                            type="file" 
                            name="upload-file" 
                            aria-hidden="true" 
                            className="hidden"
                            ref={fileRef}
                            onChange={handleFileChange}
                        />
                        <button 
                            type="button" 
                            aria-label="upload-file" 
                            className="p-2 rounded-full hover:bg-brand-card hover:scale-150 shadow-md transition-transform"
                            onClick={() => fileRef.current?.click()}
                        >
                            <Plus size={24} className=" text-primary"/>
                        </button>
                            
                        
                        <input 
                            type="text"
                            name="text" 
                            value={newMessage}
                            onChange={e => setNewMessage(e.target.value)}
                            onKeyDown={sendMessage}
                            placeholder="Type a message..."
                            className="flex-1 px-3 py-3 bg-brand-dark border border-brand-border rounded-full outline-none focus:border-primary"
                        />
                        <button type="button" onClick={sendMessage} className="p-3 bg-primary rounded-full hover:scale-120 shadow-md transition-transform disabled:opacity-50" disabled={!newMessage.trim()}>
                            <Send size={20}/>
                        </button>
                    </div>
                </>
                ) : 
                    <div className="flex-1 flex flex-col items-center justify-center text-gray-500">
                        <div className="bg-brand-card p-6 rounded-full mb-4">
                            <Send size={48} className="opacity-20"/>
                        </div>
                        <p className="text-sm mt-2 ">Select a chat to start messaging</p>
                    </div> 
                }
            </div>
        </div>
    );
};

export default ChatPage;