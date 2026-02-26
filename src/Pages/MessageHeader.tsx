import { useState, useEffect, useRef } from "react";
import { UserCircle, MoreVertical, Search, Plus } from "lucide-react";
import MenuItem from "./MenuItem";
import type{ User } from "../types/chat"
import { API } from "../api";

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
  const [modalOpen, setModalOpen] = useState(false)
  const [isSearching, setIsSearching] = useState(false)
  const [modalSearch, setModalSearch] = useState("");
  const [modalSearchResult, setModalSearchResult] = useState<User []>([])
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

  // ====================
  // Search All Users in
  // ====================
  const handleSearchUser = async () => {
      if (!modalSearch.trim()) return;
  
      const { data } = await API.get(`/chat/search?search=${modalSearch}`);
      console.log(data)
      // Filter the existing members
      const filtered = data.user.filter((u: User) =>
        !selectedChat.users.some((member: User) => member._id === u._id)
      );
      setModalSearchResult(filtered);
      
    };
  
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
                      setModalOpen(true)
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

        {/* Modal */}
        {modalOpen && (
          <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-brand-dark rounded-3xl w-full max-w-lg max-h-[85vh] overflow-hidden shadow-2xl border border-brand-border">
              <div className="sticky top-0 bg-white border-b p-6 flex justify-between items-center z-10">
                <p className="text-brand-accent text-xl font-bold">Add New Member</p>
                <button
                  onClick={() => {
                    setModalOpen(false)
                    setModalSearch("")
                    setModalSearchResult([])
                  }}
                  className="text-brand-danger text-xl font-bold hover:bg-brand-danger/50 px-3 py-1 rounded-full"
                >
                  x
                </button>
              </div>
               <div className="p-8">
              <div className="max-w-none">
                <div className="flex gap-2 mb-6" >
                  <input 
                    type="text" 
                    name="searchUser" 
                    value={modalSearch} 
                    onChange={(e) => setModalSearch(e.target.value)} className="flex-1 text-brand-primary bg-transparent border rounded-lg px-3 py-2 outline-none focus:border-primary"
                  />
                  <button 
                    onClick={handleSearchUser}
                    className="p-3 rounded-lg bg-primary/50 hover:opacity-50 transition"
                  >
                    <Search />
                  </button>
                </div>
                <h4 className="text-xl font-bold text-brand-text mb-4">List of all ChatApp Users</h4>
                {modalSearchResult.length > 0  && (
                  <ul className="space-y-2 overflow-y-auto">
                    {modalSearchResult.map((user) => (
                      <li 
                          key={user._id}
                          className="px-4 py-3 bg-brand-card hover:bg-brand-accent/10 cursor-pointer transition mb-6 leading-relaxed"
                        >
                          <span className="flex items-center justify-between">
                            {user.username}
                            <button className="p-2 rounded-md hover:bg-primary/20 transition">
                              <Plus size={18} />
                            </button>
                        </span>
                          
                        </li>
                    ))}  
                  </ul>
                )}
                
              </div>  
            </div>
          </div>
          </div>
        )}
      
      </div>        
    </div>
  );
};

export default MessageHeader;