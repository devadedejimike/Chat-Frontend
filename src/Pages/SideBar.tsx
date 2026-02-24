import { Search } from "lucide-react";
import Button from "../components/button";

interface Props {
  loggedInUser: any;
  chats: any[];
  selectedChat: any;
  searchUser: string;
  searchUserResult: any[];
  setSearchUser: (v: string) => void;
  handleSearchUser: () => void;
  handleAccessChat: (id: string) => void;
  setSelectedChat: (chat: any) => void;
  getChatName: (chat: any) => string;
  logOut: () => void;
}

const SideBar = ({
  loggedInUser,
  chats,
  selectedChat,
  searchUser,
  searchUserResult,
  setSearchUser,
  handleSearchUser,
  handleAccessChat,
  setSelectedChat,
  getChatName,
  logOut,
}: Props) => {
  return (
    <div className="w-72 lg:w-80 border-r border-brand-border flex flex-col bg-brand-dark/50">
      <div className="p-4 border-b border-brand-border">
        <h1 className="text-lg font-bold mb-3">
          Welcome, {loggedInUser?.username}
        </h1>

        <div className="relative">
          <input
            value={searchUser}
            onChange={(e) => setSearchUser(e.target.value)}
            placeholder="Search for user..."
            className="w-full px-3 py-2 bg-brand-card border border-brand-border rounded-md focus:border-primary text-white outline-none"
          />

          <button
            className="absolute top-2 right-2"
            onClick={handleSearchUser}
          >
            <Search className="text-gray-400 hover:text-primary" />
          </button>

          {searchUserResult.length > 0 && (
            <ul className="absolute top-12 w-full bg-brand-card p-2 rounded shadow-lg z-50 max-h-60 overflow-y-auto">
              {searchUserResult.map((user) => (
                <li
                  key={user._id}
                  onClick={() => handleAccessChat(user._id)}
                  className="px-4 py-2 hover:bg-brand-accent/10 cursor-pointer"
                >
                  {user.username}
                </li>
              ))}
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
                <p className="text-xs text-muted">{chat.latestMessage?.text && chat.latestMessage.text.trim() !== "" ? chat.latestMessage.text : chat.latestMessage ? "🔗 Attachment" : 'No message yet'}</p>
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
  );
};

export default SideBar;