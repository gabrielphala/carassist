import { Link } from "react-router-dom"
import "./Terms.css"

export default function App() {
  return (
    <>
      <header className="base flex flex--a-center flex--j-space-between" style={{ position: 'fixed', width: '100%', zIndex: '3', padding: '2rem 6rem' }}>
        <p>CAR <b>ASSIST HUB</b></p>
        <ul className="home-header__links flex">
          <li className="margin--right-1"><Link to="/terms-and-conditions">Ts & Cs</Link></li>
          <li className="margin--right-1"><Link to="/sign-in">Driver sign in</Link></li>
          <li><Link to="/g/sign-in">Garage sign in</Link></li>
        </ul>
      </header>
      <main className="main-terms">
        <p><b><Link to={'/'}>Return to home</Link></b></p>
        <h1>Terms and Conditions</h1>
        <p>Effective Date: 01 January 2025</p>

        <p style={{ margin: '2rem 0' }}> Welcome to CarAssistHub, a platform that connects drivers with automotive service providers including towing services, garages, and repair shops. By accessing or using our platform, website, or mobile app ("Platform"), you agree to the following terms and conditions ("Terms").</p>

        <ul>
          <li>
            <b>1. Definitions</b>
            <br />
            "Platform" refers to the CarAssistHub website, mobile app, and services.

            "User" refers to drivers or individuals seeking automotive assistance.

            "Service Provider" refers to garages, tow truck companies, mechanics, and others offering automotive-related services.

            "We", "Us", "Our" refers to CarAssistHub and its affiliates.
          </li>

          <li>
            <b>2. Eligibility</b>
            <br />
            You must be at least 18 years old and legally capable of entering into a contract to use our services.
          </li>

          <li>
            <b>3. Service Description</b>
            <br />
            CarAssistHub does not provide towing, repairs, or mechanical services directly. We facilitate connections between Users and Service Providers. We do not guarantee the availability, quality, safety, legality, or pricing of services.
          </li>

          <li>
            <b>4. User Responsibilities</b>
            <br />
            Provide accurate, up-to-date personal and vehicle information.

            Use the platform in compliance with all applicable laws.

            Pay for services rendered by Service Providers directly (unless otherwise specified).

            Do not impersonate others or misuse the platform.
          </li>

          <li>
            <b>5. Service Provider Responsibilities</b>
            <br />
            Maintain accurate business profiles and pricing details.

            Ensure all licenses, permits, and insurance are valid.

            Provide services professionally and lawfully.

            Resolve complaints or disputes directly with Users when possible.
          </li>

          <li>
            <b>6. Fees and Payments</b>
            <br />
            <b>For Users:</b> Some services may incur platform or referral fees, disclosed before confirmation.

            <b>For Service Providers:</b> A commission or subscription model may apply.

            CarAssistHub may use third-party payment processors.
          </li>

          <li>
            <b>7. Cancellations and Refunds</b>
            <br />
            Users and Service Providers may cancel bookings in accordance with the cancellation policy displayed during booking.
            Refunds, if any, are subject to service provider policies and processing fees.
          </li>

          <li>
            <b>8. Dispute Resolution</b>
            <br />
            CarAssistHub is not liable for service issues between Users and Providers but may offer a dispute resolution feature for mediation purposes. We do not guarantee outcomes.
          </li>

          <li>
            <b>9. Platform Access</b>
            <br />
            We reserve the right to suspend, modify, or terminate access to any part of the platform at any time, for any reason, without notice.
          </li>

          <li>
            <b>10. Limitation of Liability</b>
            <br />
            CarAssistHub is not liable for:

            Any damages resulting from services rendered by a Service Provider.

            Lost or damaged property, delayed responses, or accidents.

            Technical issues or outages on the Platform.
          </li>

          <li>
            <b>11. Indemnification</b>
            <br />
            You agree to indemnify and hold harmless CarAssistHub and its affiliates from any claims, damages, losses, or expenses arising out of:

            Your use of the platform.

            Services rendered through third-party providers.

            Violations of these Terms.
          </li>

          <li>
            <b>12. Changes to the Terms</b>
            <br />
            We may modify these Terms at any time. Continued use of the platform constitutes acceptance of the updated Terms.
          </li>

          <li>
            <b>13. Governing Law</b>
            <br />
            These Terms shall be governed by the laws of South Africa. Any disputes will be subject to the exclusive jurisdiction of the courts of South Africa.
          </li>

          <li>
            <b>14. Contact</b>
            <br />
            For questions, contact us at:
            Phone: +27 79 127 4458

            Let me know if you want:

            A Privacy Policy to pair with this.

            To adjust it for insurance partners, roadside plans, or subscription-based models.

            A shorter, mobile-friendly version for signup screens.
          </li>
        </ul>
      </main>
    </>
  )
}