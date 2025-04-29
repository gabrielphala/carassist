import { useEffect, useState } from "react";
import Chat from "../../components/chat/Chat";
import GarageManager from "../../components/info/GarageManager";
import { postWithAuth } from "../../helpers/http";

import { cutstr } from "../../helpers/str";
import date from "../../helpers/date";

import "../user/Chat.css"
import { getQuery } from "../../helpers/URL";

const getChats = async (): Promise<any> => {
  const res = await postWithAuth('/chat/get/by/employee', {})

  return res.chats;
}

export default () => {
  let [chats, setChats] = useState<any>([]);
  let [refresh, setRefresh] = useState<number>(0)

  useEffect(() => {
    (async () => {
      setChats(await getChats());
    })()
  }, [refresh])

  return (
    <GarageManager>
      <div className="info__page-heading">
        <h1>Messaging</h1>
        <p>Message your mechanic</p>
      </div>

      <div className="chats info__pad">
        <div className="flex">
          <div className="info__pad__chats">
            {
              chats?.map((chat: any) => (
                <div className="info__pad__chats__item" key={chat._id}>
                  <p><b>{chat.userId.name}</b></p>
                  <p>{cutstr(chat.message || '', { ignoreWindow: true, offset: 26 })} <small>{chat.messageDate && date(new Date(chat.messageDate))}</small></p>
                </div>
              ))
            }

            {(!chats || chats && chats.length == 0) && (
              <p style={{ textAlign: 'center' }} className="margin--top-1">No chats</p>
            )}
          </div>
          <div className="info__pad__messages">
            {
              getQuery('c') && <Chat setRefresh={setRefresh}></Chat>
            }
          </div>
        </div>
      </div>
    </GarageManager>
  )
}