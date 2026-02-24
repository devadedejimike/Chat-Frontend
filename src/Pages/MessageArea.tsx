import type{ Message, Chat, User } from "../types/chat";

interface Props {
  messages: Message[];
  loggedInUser: User | null;
  selectedChat: Chat;
  scrollRef: React.RefObject<HTMLDivElement | null>;
}

const MessageArea = ({
  messages,
  loggedInUser,
  selectedChat,
  scrollRef,
}: Props) => {
  return (
    <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-brand-border space-y-2 p-4">
    {messages.map((m) => {
    const isMe = m.sender?._id === loggedInUser?._id
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
                                    className="m-2 inline-block text-white/60 hover:underline text-sm"
                                >
                                    Click to veiw attachment
                                </a>
                                
                                )
                            })}
                        </div>
                    )}
                    <p className="text-[10px] opacity-70 mt-1 text-right">{formattedTime}</p>
                </div>
                <div ref={scrollRef}/>
            </div>
        )
    })}
    </div>
  );
};

export default MessageArea;