import {  createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import liveChatApi from "../liveChatAxios.ts"
import { formatApiResponseMessage } from "@/lib/utils.ts";



export interface IUser {
  _id: string;
  name: string;
  role: "user" | "admin" | "superAdmin";
}

export type ConversationStatus = "pending" | "progress" | "closed";

export interface IConversation {
  _id: string;
  status: ConversationStatus;
  lastMessage?: string;
  request_user_id: IUser;          // always populated
  response_user_id: IUser | null;  // null OR populated user

  createdAt: string;
  updatedAt: string;
  __v: number;
}
export interface IMessageFile {
  publicID: string | null;
  url: string | null;
}
export type MessageStatus = "sending" | "sent" | "seen";

export interface IMessage {
  _id: string;
  client_id:string;
  sender_id: IUser;          // ObjectId string
  conversation_id: string;    // ObjectId string

  status: MessageStatus;
  message: string;
  file: IMessageFile;

  createdAt: string;
  updatedAt: string;
  __v?: number;
}

export type ChatMessage = {
  conversation_id:string;
  id: string | null;
  text?: string;
  fileName: string | null;
  sender_id:string; // extend if needed
  timestamp: string;
  status:MessageStatus
};


type InitialStateType ={
    conversations: IConversation[]
    newConversation: IConversation[]
    messages:ChatMessage[]
}

const initialState: InitialStateType = {
    conversations:[],
    newConversation:[],
    messages:[]
};

export const fetchAllConversation = createAsyncThunk("messages/fetchAllConversation", async (_, { getState, rejectWithValue }) => {
// const state: any = getState();

 try {
  
      // 🔥 Only call API if no data in state
      const response = await liveChatApi.get("conversations/get-all");
      
      return response?.data?.conversations
;
    } catch (err) {
      return rejectWithValue("Auth check failed");
    }

})

export const fetchConversationByUserId = createAsyncThunk("messages/fetchConversationByUserId", async (userId: string, { getState, rejectWithValue }) => {

  try {
    const response = await liveChatApi.get(`conversations/get-by-user/${userId}`);
    return response?.data?.conversations;
  } catch (error) {
    return rejectWithValue("Auth check failed");
  }

})
export const fetchMessagesByConversationId = createAsyncThunk("messages/fetchMessagesByConversationId", async (conversation_id: string, { getState, rejectWithValue }) => {

  try {
    const response = await liveChatApi.get(`messages/get-messages/${conversation_id}`);
    return response?.data?.messages;
  } catch (error) {
    return rejectWithValue("Auth check failed");
  }

})


export const fetchAllMessagesByUserId = createAsyncThunk("messages/fetchAllMessagesByUserId", async (userId: string, { getState, rejectWithValue }) => {

  try {
    const response = await liveChatApi.get(`messages/get-messages-by-user/${userId}`);
    console.log(response?.data)
    return response?.data?.messages;
  } catch (error) {
    return rejectWithValue("Auth check failed");
  }
})

const MessageSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    setConversations(state, action: PayloadAction<IConversation[]>) {
      state.conversations = action.payload;
    },
    setMessages(state, action: PayloadAction<ChatMessage[]>) {
      state.messages = action.payload;
    },
    updateMessage(state,action:PayloadAction<IMessage>){
      let updatedMessages = state.messages.map(msg => 
        msg?.id == action.payload.client_id ? formatApiResponseMessage([action.payload])[0] : msg
      ) 
      state.messages = updatedMessages 
    },
    deleteConversation(state, action: PayloadAction<{id:string,isNew:boolean}>) {
       if(action.payload.isNew){
        state.newConversation = state.newConversation.filter(convo => convo._id !== action.payload.id);
       }else{
        state.conversations = state.conversations.filter(convo => convo._id !== action.payload.id);
       }
      
    },
    addMessage(state, action: PayloadAction<ChatMessage>) {
      state.messages.push(action.payload);
    },
    addConversation(state, action: PayloadAction<IConversation>) {
      state.conversations.push(action.payload);
    },
    addNewConversation(state,action:PayloadAction<IConversation>) {
      state.newConversation.push(action.payload)
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllConversation.fulfilled, (state, action) => {
      state.newConversation = action.payload;
    }); 
    builder.addCase(fetchConversationByUserId.fulfilled,(state,action) => {
      state.conversations = action.payload
    });
    builder.addCase(fetchAllMessagesByUserId.fulfilled,(state,action) => {
      state.messages = formatApiResponseMessage(action.payload)
    });
    builder.addCase(fetchMessagesByConversationId.fulfilled,(state,action) => {
      state.messages = [...state.messages,...formatApiResponseMessage(action.payload)]
    })
}});

export const { setConversations,setMessages,deleteConversation,addMessage,addConversation ,addNewConversation,updateMessage} = MessageSlice.actions;

export default MessageSlice.reducer;