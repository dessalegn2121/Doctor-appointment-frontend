import React, { useState } from 'react';
import { useConversations, useMessages, useSendMessage } from '../hooks/usePatient';
import { Send, ArrowLeft } from 'lucide-react';
const PatientMessages = () => {
    const [selectedConversationId, setSelectedConversationId] = useState(null);
    const [messageText, setMessageText] = useState('');
    const { data: conversationsData, isLoading: conversationsLoading } = useConversations();
    const { data: messagesData, isLoading: messagesLoading } = useMessages(selectedConversationId);
    const { mutate: sendMessage, isPending: isSending } = useSendMessage();
    const conversations = conversationsData?.data || [];
    const messages = messagesData?.data || [];
    const handleSendMessage = () => {
        if (!messageText.trim() || !selectedConversationId)
            return;
        const selectedConversation = conversations.find((c) => c._id === selectedConversationId);
        if (!selectedConversation)
            return;
        sendMessage({
            conversationId: selectedConversationId,
            receiverId: selectedConversation.doctorId._id,
            message: messageText,
        });
        setMessageText('');
    };
    if (conversationsLoading) {
        return (<div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading messages...</p>
        </div>
      </div>);
    }
    return (<div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg p-6">
        <h1 className="text-3xl font-bold">Messages</h1>
        <p className="text-blue-100">Chat with your doctors</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
        {/* Conversations List */}
        <div className="lg:col-span-1 bg-white rounded-lg shadow overflow-hidden flex flex-col">
          <div className="p-4 border-b border-gray-200">
            <h2 className="font-bold text-gray-800">Conversations</h2>
          </div>
          
          {conversations.length > 0 ? (<div className="overflow-y-auto flex-1">
              {conversations.map((conversation) => (<button key={conversation._id} onClick={() => setSelectedConversationId(conversation._id)} className={`w-full text-left p-4 border-b border-gray-100 hover:bg-blue-50 transition ${selectedConversationId === conversation._id ? 'bg-blue-100 border-l-4 border-l-blue-600' : ''}`}>
                  <p className="font-semibold text-gray-800">{conversation.doctorId?.name}</p>
                  <p className="text-sm text-gray-600">{conversation.doctorId?.specialization}</p>
                  {conversation.lastMessage && (<p className="text-xs text-gray-500 mt-1 truncate">{conversation.lastMessage}</p>)}
                </button>))}
            </div>) : (<div className="flex items-center justify-center py-8 text-gray-500 text-sm">
              No conversations yet
            </div>)}
        </div>

        {/* Messages Area */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow overflow-hidden flex flex-col">
          {selectedConversationId ? (<>
              {/* Header */}
              <div className="p-4 border-b border-gray-200 bg-blue-50">
                <button onClick={() => setSelectedConversationId(null)} className="flex items-center space-x-2 text-blue-600 mb-2 lg:hidden">
                  <ArrowLeft size={20}/>
                  <span>Back</span>
                </button>
                {conversations.find((c) => c._id === selectedConversationId) && (<div>
                    <p className="font-bold text-gray-800">
                      {conversations.find((c) => c._id === selectedConversationId)?.doctorId?.name}
                    </p>
                    <p className="text-sm text-gray-600">
                      {conversations.find((c) => c._id === selectedConversationId)?.doctorId?.specialization}
                    </p>
                  </div>)}
              </div>

              {/* Messages */}
              {messagesLoading ? (<div className="flex-1 flex items-center justify-center">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading messages...</p>
                  </div>
                </div>) : (<div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                  {messages.length > 0 ? (messages.map((message) => (<div key={message._id} className={`flex ${message.senderType === 'patient' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-xs px-4 py-2 rounded-lg ${message.senderType === 'patient'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-300 text-gray-800'}`}>
                          <p className="text-sm">{message.message}</p>
                          <p className={`text-xs mt-1 ${message.senderType === 'patient' ? 'text-blue-100' : 'text-gray-600'}`}>
                            {new Date(message.createdAt).toLocaleTimeString()}
                          </p>
                        </div>
                      </div>))) : (<div className="flex items-center justify-center h-full">
                      <p className="text-gray-500">No messages yet</p>
                    </div>)}
                </div>)}

              {/* Input */}
              <div className="p-4 border-t border-gray-200 bg-white">
                <div className="flex space-x-2">
                  <input type="text" value={messageText} onChange={(e) => setMessageText(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()} placeholder="Type your message..." className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"/>
                  <button onClick={handleSendMessage} disabled={!messageText.trim() || isSending} className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400">
                    <Send size={20}/>
                  </button>
                </div>
              </div>
            </>) : (<div className="flex-1 flex items-center justify-center text-gray-500">
              <p className="hidden lg:block">Select a conversation to start messaging</p>
              <p className="lg:hidden">No conversation selected</p>
            </div>)}
        </div>
      </div>
    </div>);
};
export default PatientMessages;
