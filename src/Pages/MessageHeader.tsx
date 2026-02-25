import { useState, useEffect, useRef } from "react";
import { UserCircle, MoreVertical } from "lucide-react";
import MenuItem from "./MenuItem";

interface Props {
  selectedChat: any;
  getChatName: (chat: any) => string;
  searchMessage: string;
  setSearchMessage: (v: string) => void;
  handleSearchMessages: () => void;
  updateDp: () => void;
  createGroup: () => void;
  addMember: () => void;
  removeMember: () => void;
  editGroupName: () => void;
}

const MessageHeader = ({
  selectedChat,
  getChatName,
  searchMessage,
  setSearchMessage,
  handleSearchMessages,
  updateDp,
  createGroup,
  addMember,
  removeMember,
  editGroupName
}: Props) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isSearching, setIsSearching] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(()=>{
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside)
  },[])

  return (
    <div className="flex items-center justify-between px-4 py-3 border-b border-brand-border">
      <div className="flex items-center gap-2">
        <UserCircle className="text-primary" size={32} />
        <p className="text-lg font-bold">
          {getChatName(selectedChat)}
        </p>
      </div>

      {isSearching && (
        <div className="relative"> 
          <input
            value={searchMessage}
            onChange={(e) => setSearchMessage(e.target.value)}
            placeholder="Search message..."
            className="w-64 px-3 py-2 bg-transparent border-b border-brand-border text-white text-sm outline-none"
          />
          <button
            className="absolute top-1/2 right-3 -translate-y-1/2 "
            onClick={handleSearchMessages}
          />
        </div>  
      )}

      <div className="relative" ref={menuRef}>
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className="p-2 rounded-full hover:bg-brand-border transition"
        >
          <MoreVertical size={20} className="text-white"/>
        </button>
        {isOpen && (
           <div className="absolute right-0 mt-2 w-44 bg-gray-800 border border-gray-700 rounded-md shadow-md">
              <MenuItem label="Search Messages" onClick={() => setIsSearching((prev) => !prev)}/>
              {!selectedChat.isGroupChat && (
                <>
                  <MenuItem label="Create Group" 
                    onClick={() => {
                      createGroup()
                      setIsOpen(false)
                      }
                    }
                  />
                  <MenuItem label="Update Profile Picture" 
                    onClick={() => {
                      updateDp()
                      setIsOpen(false)
                      }
                    }
                  />
                </>
              )}

              {selectedChat.isGroupChat && (
                <>
                  <div className="border-t border-brand-border my-1" />
                  <MenuItem label="Edit Group Name"
                    onClick={() => {
                      editGroupName()
                      setIsOpen(false)
                      }
                    }
                  />
                  <MenuItem label="Add Member"
                    onClick={() => {
                      addMember()
                      setIsOpen(false)
                      }
                    }
                  />
                  <MenuItem
                    label="Remove Member"
                    danger
                    onClick={() => {
                      removeMember()
                      setIsOpen(false)
                      }
                    }
                  />
                </>
              )}
           </div>
        )}


        
      </div>
    </div>
  );
};

export default MessageHeader;