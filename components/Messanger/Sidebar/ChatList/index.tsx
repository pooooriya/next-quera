import React, { useContext } from "react";
import { ChatItem } from "./ChatItem";
import { AppContext } from "@/context/store";

interface ChatListProps extends React.PropsWithChildren {
  state: any;
}
export const ChatList: React.FunctionComponent<ChatListProps> = ({ state }) => {
  const {
    state: {
      contacts: { searchList },
    },
  } = useContext(AppContext);
  return searchList.length === 0
    ? state?.map((item: any) => (
        <ChatItem
          avatar={item.avatar}
          lastmessage={item.lastMessage}
          time={item.lastMessageSent}
          name={item.name}
          key={item.id}
          roomId={item.roomId}
        />
      ))
    : searchList?.map((item: any) => (
        <ChatItem
          avatar={item.avatar}
          lastmessage={item.lastMessage}
          time={item.lastMessageSent}
          name={item.name}
          key={item.id}
          roomId={item.roomId}
        />
      ));
};
