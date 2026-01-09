import React, { useState, useRef, useEffect } from 'react';
import { Send, Paperclip, Search, MoreHorizontal, CheckCheck, FileText, X } from 'lucide-react';
import {messageSocket} from "../socket.tsx"
import {deleteConversation, fetchAllConversation} from '../reducer/message.reducer.ts';
import { useStoreDispatch,useStoreSelector } from '@/store/store.ts';
import { formatChatTime } from '@/lib/utils.ts';
interface Message {
  id: number;
  text?: string;
  fileName?: string;
  sender: 'admin' | 'user';
  timestamp: string;
  status?: 'sent' | 'delivered' | 'seen';
}

const AdminChatUI = () => {
  const {newConversation} = useStoreSelector(state => state.message)
  const {userId} = useStoreSelector(state => state.user)
  const [selectedChatId, setSelectedChatId] = useState<string>('1');
  const [inputValue, setInputValue] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const dispatch = useStoreDispatch();
  // 1. Array for the Conversation History
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "Hi, I just bought the VIP package but my account still says 'Standard'.", sender: 'user', timestamp: '10:01 AM' },
    { id: 2, text: "I'm sorry to hear that. Could you please provide your transaction ID?", sender: 'admin', timestamp: '10:01 AM', status: 'seen' },
    { id: 3, fileName: "receipt_7721.png", text: "Here is the screenshot of my receipt.", sender: 'user', timestamp: '10:04 AM' },
    { id: 4, text: "Thank you. I've just manually refreshed your status. Could you logout and log back in?", sender: 'admin', timestamp: '10:09 AM', status: 'seen' },
    { id: 5, text: "It worked! I see the Premium badge now. Thank you so much!", sender: 'user', timestamp: '10:10 AM' },
  ]);

  // 2. Array for the Sidebar User List
  const chatList = [
    { id: '1', userName: 'Thae Oo Su Pyae Sone', lastMsg: 'It worked! Thank you!', time: '10:10 AM', unread: 0, online: true },
    { id: '2', userName: 'John Doe', lastMsg: 'How do I cancel my plan?', time: '09:45 AM', unread: 2, online: false },
    { id: '3', userName: 'Alice Smith', lastMsg: 'Payment failed again.', time: 'Yesterday', unread: 0, online: true },
  ];

  // Auto-scroll logic
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    console.log('Setting up message socket listeners');
    messageSocket.on("message:new",(data:any) => {
      const newMsg: Message = {
        id: Date.now(),
        text: data.message,
        sender: 'user',
        timestamp:data.createdAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prevMessages) => [...prevMessages, newMsg]);
    })
    messageSocket.on("conversation:new",(data:any) => {
      console.log("New conversation:",data)
    })
    messageSocket.on("newConversation:remove",(data) => {
      console.log("Removing new conversation with ID:",data)
      dispatch(deleteConversation({id:data,isNew:true}));

    })
    dispatch(fetchAllConversation());
    return () => {
      console.log('Cleaning up message socket listeners');
      messageSocket.off("message:new");
      messageSocket.off("conversation:new");
    };

  },[])

  const takeConversation = (id:string) => {
    console.log("Taking conversation with ID:",id);
    let payload = {
      conversation_id:id ,
      user_id :userId
    }
    messageSocket.emit("conversation:take",payload);
    // Implement API call to take the conversation
  }

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() && !selectedFile) return;

    const newMessage: Message = {
      id: Date.now(),
      text: inputValue || undefined,
      fileName: selectedFile?.name,
      sender: 'admin',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'sent'
    };

    setMessages([...messages, newMessage]);
    setInputValue('');
    setSelectedFile(null);
  };

  return (
    <div className="flex h-[90vh] w-full bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
      
      {/* --- Sidebar (Chat List) --- */}
      <div className="w-80 border-r border-gray-100 flex flex-col bg-gray-50/30">
        <div className="p-4 border-b border-gray-100">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input type="text" placeholder="Search..." className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm outline-none focus:border-black" />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto scrollbar-hide">

          {newConversation.length > 0 && <p className='text-center text-gray-500 text-1xl font-bold'>New Conversation</p>}
          {newConversation.map((chat  ) => (
            <button 
              key={chat?._id} 
              onClick={() => takeConversation(chat._id)}
              className={`w-full p-4 flex gap-3 border-b border-gray-50 transition-colors hover:bg-gray-100`}
            >
              <div className="relative w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center font-bold text-gray-500">
                {chat.request_user_id?.name.charAt(0)}
                {chat && <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />}
              </div>
              <div className="flex-1 text-left truncate">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-semibold text-gray-800">{chat.request_user_id?.name}</span>
                  <span className="text-[10px] text-gray-400">{formatChatTime(chat?.createdAt)}</span>
                </div>
                <p className="text-xs text-gray-500 truncate">{chat?.lastMessage}</p>
              </div>
            </button>
          ))}
          {newConversation.length > 0 && <div className='w-full border border-bray-50'/>}
          {chatList.map((chat) => (
            <button 
              key={chat.id} 
              onClick={() => setSelectedChatId(chat.id)}
              className={`w-full p-4 flex gap-3 border-b border-gray-50 transition-colors ${selectedChatId === chat.id ? 'bg-white' : 'hover:bg-gray-100'}`}
            >
              <div className="relative w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center font-bold text-gray-500">
                {chat.userName.charAt(0)}
                {chat.online && <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />}
              </div>
              <div className="flex-1 text-left truncate">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-semibold text-gray-800">{chat.userName}</span>
                  <span className="text-[10px] text-gray-400">{chat.time}</span>
                </div>
                <p className="text-xs text-gray-500 truncate">{chat.lastMsg}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* --- Main Chat Area --- */}
      <div className="flex-1 flex flex-col bg-white">
        <div className="p-4 border-b border-gray-100 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <h3 className="font-bold text-gray-800">username</h3>
            <span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Active Now</span>
          </div>
          <button className="text-gray-400 hover:text-black"><MoreHorizontal size={20} /></button>
        </div>

        {/* --- Render Conversation Messages --- */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50/20 scrollbar-hide">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.sender === 'admin' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[70%] ${msg.sender === 'admin' ? 'flex flex-col items-end' : 'flex gap-3'}`}>
                {msg.sender === 'user' && (
                  <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-xs font-bold shrink-0">U</div>
                )}
                <div>
                  <div className={`p-3 rounded-2xl text-sm shadow-sm ${
                    msg.sender === 'admin' 
                    ? 'bg-black text-white rounded-tr-none' 
                    : 'bg-white border border-gray-200 text-gray-800 rounded-tl-none'
                  }`}>
                    {msg.fileName && (
                      <div className="flex items-center gap-2 mb-2 p-2 bg-white/10 rounded border border-white/10">
                        <FileText size={14} />
                        <span className="text-[11px] truncate">{msg.fileName}</span>
                      </div>
                    )}
                    {msg.text}
                  </div>
                  <div className={`flex items-center gap-1 mt-1 ${msg.sender === 'admin' ? 'justify-end' : 'justify-start'}`}>
                    <span className="text-[10px] text-gray-400">{msg.timestamp}</span>
                    {msg.sender === 'admin' && (
                      <CheckCheck size={14} className={msg.status === 'seen' ? 'text-blue-500' : 'text-gray-300'} />
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* --- Input Area --- */}
        <div className="p-4 border-t border-gray-100">
          <form onSubmit={handleSendMessage} className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 focus-within:border-black transition-all">
            <input type="file" ref={fileInputRef} className="hidden" onChange={(e) => setSelectedFile(e.target.files?.[0] || null)} />
            <button type="button" onClick={() => fileInputRef.current?.click()} className={`hover:text-black ${selectedFile ? 'text-black' : 'text-gray-400'}`}>
              <Paperclip size={20} />
            </button>
            <input 
              type="text" 
              value={inputValue} 
              onChange={(e) => setInputValue(e.target.value)} 
              placeholder="Message..." 
              className="flex-1 bg-transparent border-none focus:ring-0 text-sm py-1 outline-none" 
            />
            <button type="submit" className="p-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors">
              <Send size={18} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminChatUI;