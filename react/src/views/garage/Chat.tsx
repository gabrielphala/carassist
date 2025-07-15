import { useEffect, useState } from "react";
import Chat from "../../components/chat/Chat";
import GarageManager from "../../components/info/GarageManager";
import { postWithAuth } from "../../helpers/http";

import { cutstr } from "../../helpers/str";
import date from "../../helpers/date";
import { getQuery } from "../../helpers/URL";

import "../user/Chat.css"
import { Link } from "react-router-dom";
import { $cls } from "../../helpers/dom";

const getChats = async (): Promise<any> => {
  const res = await postWithAuth('/chat/get/by/employee', {})

  return res.chats;
}

export const showChats = () => {
  $cls('info__pad__chats')[0].classList.add('mobile-open')
}

export const hideChats = () => {
  $cls('info__pad__chats')[0].classList.remove('mobile-open')
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
        <h1><i className="fa-regular fa-comments margin--right-1"></i>Messaging</h1>
        <p>Message your client</p>
        <div className="info__page-heading__hr"></div>
      </div>

      <div className="chats info__pad">
        <div className="flex">
          <div className="info__pad__chats">
            <p onClick={hideChats} className="mobile-chat-btn margin--bottom-1"><i className="fa-regular fa-circle-xmark margin--right-1"></i>Close chats</p>
            {
              chats?.map((chat: any) => (
                <Link to={`/g/chat?c=${chat._id}`} onClick={() => {hideChats(); setRefresh(Math.random())}}>
                  <div className="info__pad__chats__item" key={chat._id}>
                    <p><b>{chat.userId.name}</b></p>
                    <p>{cutstr(chat.message || '', { ignoreWindow: true, offset: 26 })} <small>{chat.messageDate && date(new Date(chat.messageDate))}</small></p>
                  </div>
                </Link>
              ))
            }

            {(!chats || chats && chats.length == 0) && (
              <p style={{ textAlign: 'center' }} className="margin--top-1">No chats</p>
            )}
          </div>
          <div className="info__pad__messages pos--rel" style={{ flex: '1' }}>
            <p onClick={showChats} className="mobile-chat-btn"><i className="fa-regular fa-comments margin--right-1"></i>See chats</p>
            {
              getQuery('c') ? <Chat setRefresh={setRefresh}></Chat> : (
                <div className="pos--abs pos--horizontal">
                  <p style={{ textAlign: 'center' }}><i className="fa-regular fa-comments" style={{ fontSize: '5rem' }}></i></p>
                  <p style={{ textAlign: 'center' }} className="margin--top-1"><b>No chat selected</b></p>
                  <p style={{ textAlign: 'center' }}>Please select a chat to continue</p>
                </div>
              )
            }
          </div>
        </div>
      </div>
    </GarageManager>
  )
}