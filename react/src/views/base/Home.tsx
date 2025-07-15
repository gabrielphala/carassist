import { Link } from "react-router-dom"
import "./Home.css"

export default function App() {
  return (
    <>
      <header className="h-header flex flex--a-center flex--j-space-between">
        <p>CAR <b>ASSIST HUB</b></p>
        <div className="h-header__menu flex">
          <li>Home</li>
          <li>About</li>
          <li>Contact</li>
        </div>
        <ul className="h-header__links flex">
          <li className="margin--right-2"><Link to="/sign-in">Driver sign in</Link></li>
          <li><Link to="/g/sign-in">Garage sign in</Link></li>
        </ul>
      </header>
      <section className="h-showcase flex">
        <div className="h-showcase__main-caption">
          <h1>We Are Here For All Your Road Side Assistance Needs</h1>
          <p>Wherever you may be. Whatever you may need. Any situation. Where are here to help. </p>
        </div>
        
        <div className="pos--rel">
          <div className="h-showcase__main-img image--back" style={{backgroundImage: 'url("/background/4.jpg")'}}>
          </div>
          
          <div className="h-showcase__main-mini-img image--back pos--vertical" style={{ backgroundImage: 'url("/background/1.jpg")' }}></div>
        </div>
      </section>
      <div className="h-services">
        <div className="h-title">
          <h2>What can we help you with?</h2>
          <p>Our services</p>
        </div>

        <div className="h-services__list">
          <div className="h-services__list__item">
            <h4><i className="fa-solid fa-gas-pump margin--right-1"></i> Petrol & Diesel</h4>
            <p>Should you run out of fuel on the way, our suppliers can help you getv back on your feet</p>
          </div>

          <div className="h-services__list__item">
            <h4><i className="fa-solid fa-truck-pickup margin--right-1"></i> Towing</h4>
            <p>You should have any trouble that requires that your car be towed to your home or a service centre</p>
          </div>

          <div className="h-services__list__item">
            <h4><i className="fa-solid fa-wrench margin--right-1"></i> Breakdowns</h4>
            <p>In the event that you need your car look at should it break down on the way</p>
          </div>
        </div>
      </div>

      <div className="h-stats">
        <div className="h-stats__list flex flex--j-center">
          <div className="h-stats__list__item">
            <h4>2080</h4>
            <h4>Driver Accounts Created</h4>
          </div>

          <div className="h-stats__list__item">
            <h4>20</h4>
            <h4>Garages</h4>
          </div>

          <div className="h-stats__list__item">
            <h4>1500</h4>
            <h4>Requests</h4>
          </div>
        </div>
      </div>

      <div className="h-testimonials">
        <div className="h-title">
          <h2>What do our clients say</h2>
          <p>Our testimonials</p>
        </div>

        <div className="h-testimonials__list">
          <div className="h-testimonials__list__item">
            <p>"I ran out of fuel late at night on a quiet stretch of road with no gas station in sight. I found Car Assist Hub, and within 25 minutes, a service provider arrived with enough fuel to get me back on the road. Absolute lifesaver!"
              <b> — Tebogo M., Polokwane</b></p>
          </div>

          <div className="h-testimonials__list__item">
            <p>"My car broke down on the way to a job interview. I was stressed and had no idea who to call. I used Car Assist Hub, and they connected me with a nearby mechanic who came out, diagnosed the issue, and arranged towing—all in under an hour. Incredible support!"
              <b>— Zanele D., Johannesburg</b></p>
          </div>

          <div className="h-testimonials__list__item">
            <p>"I hit a pothole and realized I didn’t have a spare in the trunk. Car Assist Hub helped me find a mobile tire service in minutes. The technician showed up with the right tire and had me moving again fast. Highly recommend!"
              <b>— Mpho L., Durban</b></p>
          </div>
        </div>
      </div>
    </>
  )
}