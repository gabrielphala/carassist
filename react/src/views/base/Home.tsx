import { Link } from "react-router-dom"
import "./Home.css"

export default function App() {
  return (
    <>
      <header className="flex flex--a-center flex--j-space-between" style={{ position: 'fixed', width: '100%', zIndex: '3', color: '#fafafa', padding: '2rem 6rem' }}>
        <p>CAR <b>ASSIST HUB</b></p>
        <ul className="home-header__links flex">
          <li className="margin--right-2"><Link to="/sign-in">Driver sign in</Link></li>
          <li><Link to="/g/sign-in">Garage sign in</Link></li>
        </ul>
      </header>
      <div className="showcase">
        <div className="showcase__back image--back" style={{ backgroundImage: "url('/background/4.jpg')" }}></div>
        <div className="showcase__caption pos--abs pos--vertical" style={{ left: '6rem', width: '30rem', color: '#fafafa' }}>
          <h1 style={{ fontSize: '6rem' }}>
            For Your <span style={{color: '#0071ce'}}>Road</span> side <span style={{color: '#0071ce'}}>Assistance</span>
          </h1>
          <p>Your partner in finding the best help for your needs</p>
        </div>

        <a href="#services"><button className="btn pos--abs pos--horizontal" style={{ borderRadius: '3rem', padding: '1.1rem 3rem', bottom: '15rem' }}><i className="fa-solid fa-screwdriver-wrench margin--right-1"></i>Check our services</button></a>
        
      </div>
      <section className="services" id="services">
        <h4>Our services</h4>
        <p>How can we help?</p>
        <div className="services__list flex margin--top-2">
          <div className="services__list__item">
            <i className="fa-solid fa-gas-pump"></i>
            <h4>Filling station</h4>
            <p>Are you out of fuel? Let us connect you with filling stations near you</p>
          </div>
          <div className="services__list__item">
            <i className="fa-solid fa-truck-pickup"></i>
            <h4>Breakdown</h4>
            <p>Do you need towing? Let us connect you with towing companies near you</p>
          </div>
          <div className="services__list__item">
            <i className="fa-solid fa-industry"></i>
            <h4>Workshop</h4>
            <p>Does your car need more attention? Let us connect you with workshops near you</p>
          </div>

        </div>

        <p style={{ color: '#0071ce' }} className="margin--top-2"><Link to="/sign-up"><b><i className="fa-solid fa-screwdriver-wrench margin--right-1"></i> Sign up now</b></Link></p>

      </section>
    </>
  )
}