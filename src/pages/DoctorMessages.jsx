import React, { useEffect, useState } from "react";
import { MessageSquare, Send } from "lucide-react";
import { doctorDashboardAPI } from "../services/doctorDashboardAPI";
const Messages = () => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newMessage, setNewMessage] = useState("");
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    useEffect(() => {
        const fetchMessages = async () => {
            try {
                setLoading(true);
                const res = await doctorDashboardAPI.getMessages({ page, limit: 20 });
                setMessages(res.data.messages || []);
                setTotal(res.data.total || 0);
            }
            catch (err) {
                console.error("Failed to fetch messages", err);
            }
            finally {
                setLoading(false);
            }
        };
        fetchMessages();
    }, [page]);
    const handleSendMessage = async () => {
        if (!newMessage.trim())
            return;
        try {
            await doctorDashboardAPI.sendMessage({ receiverId: "", message: newMessage });
            setNewMessage("");
        }
        catch (err) {
            console.error("Failed to send message", err);
        }
    };
    return (<div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Messages</h1>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Chat List */}
        <div className="lg:col-span-1 bg-white rounded-lg shadow-md overflow-hidden h-96">
          <div className="p-4 border-b font-semibold text-gray-900">Conversations</div>
          <div className="overflow-y-auto h-80">
            {messages.length === 0 ? (<div className="p-4 text-center text-gray-500 text-sm">No messages</div>) : (messages.slice(0, 10).map((msg) => (<div key={msg._id} className="p-3 border-b hover:bg-gray-50 cursor-pointer transition">
                  <p className="font-medium text-gray-900 text-sm truncate">
                    {msg.senderId?.name}
                  </p>
                  <p className="text-gray-600 text-xs truncate">{msg.message}</p>
                </div>)))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="lg:col-span-3 bg-white rounded-lg shadow-md overflow-hidden flex flex-col h-96">
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.length === 0 ? (<div className="flex items-center justify-center h-full text-gray-500">
                <div className="text-center">
                  <MessageSquare size={48} className="mx-auto mb-2 opacity-50"/>
                  <p>No messages yet</p>
                </div>
              </div>) : (messages.map((msg) => (<div key={msg._id} className={`flex ${msg.senderId?._id === "current" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-xs px-4 py-2 rounded-lg ${msg.senderId?._id === "current"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-900"}`}>
                    <p className="text-sm">{msg.message}</p>
                    <p className="text-xs mt-1 opacity-70">
                      {new Date(msg.createdAt).toLocaleTimeString()}
                    </p>
                  </div>
                </div>)))}
          </div>

          {/* Input */}
          <div className="border-t p-4 flex gap-2">
            <input type="text" value={newMessage} onChange={(e) => setNewMessage(e.target.value)} onKeyPress={(e) => e.key === "Enter" && handleSendMessage()} placeholder="Type a message..." className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"/>
            <button onClick={handleSendMessage} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              <Send size={20}/>
            </button>
          </div>
        </div>
      </div>
    </div>);
};
export default Messages;
