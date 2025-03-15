export default (props: any) => {
  return (
    <div className="service-card flex  flex flex--a-center flex--j-space-between">
      <div className="service-card__details">
        <p style={{ fontSize: '1.5rem' }}><b>{props.name}</b></p>
        <p style={{ color: '#838383', fontSize: '1.25rem' }}> {props?.isPriceUserDefined ? 'User price' : `R${props.price}`}</p>
      </div>
      <i className="fa-solid fa-xmark" onClick={(e) => props.removeService(e, props._id)}></i>
    </div>
  )
}