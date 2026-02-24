import { Search, UserCircle } from "lucide-react";

interface Props {
  selectedChat: any;
  getChatName: (chat: any) => string;
  searchMessage: string;
  setSearchMessage: (v: string) => void;
  handleSearchMessages: () => void;
}

const MessageHeader = ({
  selectedChat,
  getChatName,
  searchMessage,
  setSearchMessage,
  handleSearchMessages,
}: Props) => {
  return (
    <div className="flex items-center justify-between px-4 py-3 border-b border-brand-border">
      <div className="flex items-center gap-2">
        <UserCircle className="text-primary" size={32} />
        <p className="text-lg font-bold">
          {getChatName(selectedChat)}
        </p>
      </div>

      <div className="relative">
        <input
          value={searchMessage}
          onChange={(e) => setSearchMessage(e.target.value)}
          placeholder="Search message..."
          className="px-3 py-2 bg-brand-card border border-brand-border rounded-md focus:border-primary text-white outline-none"
        />
        <button
          className="absolute right-3 top-1/2 -translate-y-1/2"
          onClick={handleSearchMessages}
        >
          <Search className="text-gray-400 hover:text-primary" />
        </button>
      </div>
    </div>
  );
};

export default MessageHeader;