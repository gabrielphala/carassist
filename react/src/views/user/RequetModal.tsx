export default function (props: any) {
  return (
    <div className="modal modal--closed" id="request-modal">
      <div className="modal__main card">
        <div className="card__header">
          <h4>New request</h4>
          <p>Send request to {props.garageName}</p>
        </div>
        <div className="card__body">
          <p><b>Services offered.</b></p>

          {
            props.services?.map((service: Array<any>) => (
              <p key={service[0]} className="flex flex--j-space-between flex--a-center"><span>{service[0]}</span> {service[2] && <input style={{ border: '1px solid #eee', outline: 'none', padding: '.7rem 1.4rem' }} className="price-input" type="number" placeholder={`Indicate price for ${service[0]}`} />} <span onClick={(e: any) => props.sendRequest(e, props.garageId, service[0], service[1])}>Send request</span></p>
            ))
          }
        </div>
      </div>
    </div>
  )
}