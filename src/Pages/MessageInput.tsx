import { Plus, Send } from "lucide-react";

interface Props {
  newMessage: string;
  setNewMessage: (v: string) => void;
  sendMessage: any;
  handleFileChange: any;
  fileRef: any;
}

const MessageInput = ({
  newMessage,
  setNewMessage,
  sendMessage,
  handleFileChange,
  fileRef,
}: Props) => {
  return (
    <div className="p-4 border-t border-brand-border flex items-center gap-3">
      <input
        type="file"
        className="hidden"
        ref={fileRef}
        onChange={handleFileChange}
      />

      <button
        onClick={() => fileRef.current?.click()}
        className="p-2 rounded-full hover:bg-brand-card"
      >
        <Plus className="text-primary" />
      </button>

      <input
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        onKeyDown={sendMessage}
        placeholder="Type a message..."
        className="flex-1 px-3 py-3 bg-brand-dark border border-brand-border rounded-full outline-none focus:border-primary"
      />

      <button
        onClick={sendMessage}
        className="p-3 bg-primary rounded-full"
      >
        <Send size={20} />
      </button>
    </div>
  );
};

export default MessageInput;