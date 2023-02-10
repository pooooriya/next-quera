import { Contacts } from "@/@types/api.types";
import { ContactActionTypes } from "@/@types/context/context.types";
import { Layout } from "@/components/Layout";
import { Messanger } from "@/components/Messanger";
import { ChatHeader } from "@/components/Messanger/Main/ChatHeader";
import { ChatMessage } from "@/components/Messanger/Main/ChatMessage";
import { ChatPreview } from "@/components/Messanger/Main/ChatPreview";
import { ChatSender } from "@/components/Messanger/Main/ChatSender";
import { ChatList } from "@/components/Messanger/Sidebar/ChatList";
import { Searchbar } from "@/components/Messanger/Sidebar/Searchbar";
import { AXIOS } from "@/config/axios.config";
import { ApiRoutes } from "@/constants/api.route";
import { AppContext } from "@/context/store";
import { AxiosResponse } from "axios";
import classNames from "classnames";
import React, { useContext, useEffect } from "react";
interface HomePageComponent extends React.PropsWithChildren {
  contacts: any[];
}
const HomePage: React.FunctionComponent<HomePageComponent> = ({
  contacts,
}): JSX.Element => {
  const {
    state: { messages },
    dispatch,
  } = useContext(AppContext);

  useEffect(() => {
    dispatch({
      type: ContactActionTypes.Get_All_Contact,
      payload: contacts,
    });
  }, []);

  return (
    <Layout>
      <div className="flex flex-row bg-white h-full rounded-lg w-full mx-auto">
        {/* Main Bar */}
        <div
          className={classNames(
            messages.roomId ? "flex" : "hidden",
            "sm:flex sm:flex-1 flex-col  flex-[1_1_auto]"
          )}
        >
          <div className="flex flex-col h-full">
            {messages.roomId ? (
              <>
                <ChatHeader />
                <ChatMessage />
                <ChatSender />
              </>
            ) : (
              <ChatPreview />
            )}
          </div>
        </div>
        {/* Side Bar */}
        <div
          className={classNames(
            "sm:flex-[0_0_350px] flex-col  flex-[1_1_auto]",
            messages.roomId ? "hidden sm:flex" : "flex"
          )}
        >
          <Searchbar />
          <div className="flex flex-col overflow-y-auto h-[calc(100%-48px)]  border-l-[1px] border-r-[1px] border-gray-100">
            <ChatList state={contacts} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;

export async function getServerSideProps() {
  let contacts;
  try {
    contacts = await AXIOS.get<any, AxiosResponse<Contacts[]>>(
      ApiRoutes.GetContacts
    );
    if (contacts.status === 200) {
      return {
        props: {
          contacts: contacts.data || null,
        },
      };
    }
  } catch (err) {
    console.log(err);
  }
}
