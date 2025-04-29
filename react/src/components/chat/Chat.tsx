import { useEffect, useState } from "react"
import { getQuery } from "../../helpers/URL"
import { getValueById } from "../../helpers/dom"
import { getUserBySession, postWithAuth } from "../../helpers/http"
import "./chat.css"

const getAll = async () => {
  const res = await postWithAuth('/chat/get', {
    chatId: getQuery('c'),
  })

  return res.messages;
}

export default (props: any) => {
  const [messages, setMessages] = useState([]) as any;
  const [__user, setUser] = useState([]) as any;

  useEffect(() => {
    (async () => {
      let _user = await getUserBySession();

      setMessages(await getAll());
      setUser(_user)
    })()
  }, [])

  const sendMessage = async () => {
    await postWithAuth('/chat/send', {
      chatId: getQuery('c'),
      message: getValueById('mssg')
    });

    (document.getElementById('mssg') as HTMLInputElement).value = '';

    setMessages(await getAll());

    props.setRefresh(Math.random())
  }

  return (
    <>
      <div className="chat">
        <div className="chat__messages flex">
          {messages?.map((message: any) => (
            <p key={message._id} className={`chat__messages__item ${`${message.sender}` == `${__user._id}` ? 'chat__messages__item--right' : ''}`}>
              {message.message}
            </p>
          ))}
        </div>

        <div className="chat__footer flex margin--top-2">
          <div className="input">
            <input type="text" id="mssg" placeholder="Type message" />
          </div>
          <button className="btn btn--primary" onClick={sendMessage}>Send</button>
        </div>
      </div>
    </>
  )
}