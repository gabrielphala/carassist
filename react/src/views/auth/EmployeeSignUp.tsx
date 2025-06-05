import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { initMap, initAutoComplete } from "../../helpers/map"
import { postWithAxios } from "../../helpers/http";
import { getElementById, getValueById } from "../../helpers/dom";
import { addInputFile } from "../../helpers/inputs";

import "./auth.css"
import { showError } from "../../helpers/error";

let width = 320;    // We will scale the photo width to this
let height = 0;     // This will be computed based on the input stream
let streaming: string = 'initial';

export default () => {
  const videoRef = useRef(null);
  const photoRef = useRef(null);
  const canvasRef = useRef(null);

  const [location, setLocation] = useState('');
  const [isAuth, setAuth] = useState('');
  const [capturedPhoto, setCapturedPhoto] = useState('');

  const con = useRef(null) as any;

  const nav = useNavigate();

  const signUp = async (e: any) => {
		(e as PointerEvent).preventDefault();
    getElementById('auth').style.pointerEvents = 'none';


    let body: any = {
      name: getValueById('full-name'),
      email: getValueById('email-address'),
      phone: getValueById('phone-number'),
      password: getValueById('password'),
      passwordAgain: getValueById('password-again'),
      garageName: getValueById('garage-name'),
      registrationNumber: getValueById('registration-no'),
      type: getValueById('garage-type'),
      locationName: getValueById('location'),
      capturedPhoto: new Blob([capturedPhoto], { type: 'text/plain' }),
      location
    };

    const data = addInputFile('registration-file', 'registration');

    for (const fieldName in body) {
      if (body.hasOwnProperty(fieldName)) {
        data.append(fieldName, body[fieldName])
      }
    }

    const res = await postWithAxios('/g/sign-up', data, {
      credentials: true
    })

		setAuth(res.successful);

    getElementById('auth').style.pointerEvents = 'auto';

    if (res.error) {
      showError('auth', res.error)
    }
	}

	useEffect(() => {
    if (isAuth) nav(`/g/sign-in`);;
  }, [isAuth]);
  
  useEffect(() => {
    if (!con.current) return;

    const { map } = initMap();

    initAutoComplete(con.current, (coords: string) => {
      setLocation(coords)

      const coordsArr = coords.split(',');

      const pos = {
        lat: parseFloat(coordsArr[0]),
        lng: parseFloat(coordsArr[1])
      }

      map.setCenter(pos);
      map.setZoom(14)

      // new maps.Marker({
      //   map: map,
      //   position: pos
      // });
    })
  }, [con.current])

  let video: any;
  let canvas: any;
  let photo: any;
  // let startbutton = null;
  // let _stream: any;

  function startup () {
    getElementById('camera-con').classList.remove('hide');
    width = getElementById('camera-main').offsetWidth - 18;

    video = videoRef?.current;
    canvas = canvasRef?.current;
    photo = photoRef?.current;
    // startbutton = getElementById('startbutton');

    navigator.mediaDevices
      .getUserMedia({ video: true, audio: false })
      .then((stream) => {
        if (!video) return;

        video.srcObject = stream;
        video.play();

        // _stream = stream;
      })
      .catch((err) => {
        console.error(`An error occurred: ${err}`);
      });

    video?.addEventListener(
      "canplay",
      (_ev: any) => {
        if (streaming == 'initial') {
          height = (video.videoHeight / video.videoWidth) * width;

          video.setAttribute("width", `${width}`);
          video.setAttribute("height", `${height}`);
          canvas.setAttribute("width", `${width}`);
          canvas.setAttribute("height", `${height}`);
          streaming = 'playing';
        }
      },
      false,
    );

    clearphoto();
  }

  function clearphoto() {
    const context = canvas?.getContext("2d");
    if (!context) return;

    context.fillStyle = "#AAA";
    context.fillRect(0, 0, canvas.width, canvas.height);

    const data = canvas.toDataURL("image/png");
    photo.setAttribute("src", data);
  }

  function takepicture() {
    retake();
    
    let _canvas: any = canvasRef?.current;
    let _photo: any = photoRef?.current;
    let _video: any = videoRef?.current;

    const context = _canvas?.getContext("2d");

    if (!context) return;

    if (width && height) {
      _canvas.width = width;
      _canvas.height = height;
      context.drawImage(_video, 0, 0, width, height);

      const data = _canvas.toDataURL("image/png");
      
      _photo.setAttribute("src", data);

      _photo.style.zIndex = 7;
    } else {
      clearphoto();
    }
  }

  function retake () {
    let _photo: any = photoRef?.current;
    _photo.style.zIndex = 5;
  }

  function _exit () {
    streaming = 'stopped';

    let _video: any = videoRef?.current;

    const mediaStream = _video.srcObject;

    // Through the MediaStream, you can get the MediaStreamTracks with getTracks():
    const tracks = mediaStream.getTracks();

    // Tracks are returned as an array, so if you know you only have one, you can stop it with: 
    tracks[0].stop();

    // Or stop all like so:
    tracks.forEach((track: any) => track.stop())

    getElementById('camera-con').classList.add('hide')
  }

  function savepicture () {
    let _photo: any = photoRef?.current;

    setCapturedPhoto(_photo.src)
    
    _exit()
  }

  return (
    <div className="auth flex">
      <main className="auth__main">
        <form className="auth__main__form auth__main__form--uu" style={{ width: '38rem', marginTop: '5%' }} onSubmit={signUp}>
          <div className="auth__main__form__title">
            <h4>Administrator on-boarding</h4>
            <p>Administrator &amp; Garage details</p>
          </div>

          <div id="auth-error" className="error hide">
            <p><b>Sorry, </b><span className="error-msg"></span></p>
          </div>

          <div className="flex" style={{ gap: '1rem' }}>
            <div className="input">
              <input type="text" id="garage-name" placeholder="Garage name" />
            </div>
            <div className="input">
              <input type="text" id="registration-no" placeholder="Registration number" />
            </div>
          </div>

          <div className="input margin--top-1">
            <input type="text" ref={con} id="location" placeholder="Garage location" />
          </div>

          <div className="input">
            <label htmlFor="">Garage type</label>
            <select id="garage-type" style={{ marginTop: '.3rem' }}>
              <option value="select">Choose</option>
              <option value="Filling station">Filling station</option>
              <option value="Workshop">Workshop</option>
              <option value="Breakdowns">Breakdowns</option>
            </select>
          </div>

          <div className="auth__main__form__hr"></div>

          <div className="input">
            <input type="text" id="full-name" placeholder="Full name" />
          </div>

          <div className="input">
            <input type="email" id="email-address" placeholder="Email address" />
          </div>

          <div className="input">
            <input type="text" id="phone-number" placeholder="Phone number" />
          </div>

          <div className="flex" style={{ gap: '1rem' }}>
            <div className="input">
              <input type="password" id="password" placeholder="Password" />
            </div>

            <div className="input">
              <input type="password" id="password-again" placeholder="Password again" />
            </div>
          </div>

          <label className="margin--top-2" style={{ display: 'block', cursor: 'pointer' }}><b>Company Registration*</b></label>
          <div className="flex flex--a-center" style={{ marginTop: '.5rem', gap: '1rem' }}>
            <label className="btn btn--primary" htmlFor="registration-file" style={{ flex: 1, display: 'block', cursor: 'pointer' }}><b>Upload PDF Document</b></label>
            <button type="button" className="btn" onClick={startup} style={{ display: 'block', cursor: 'pointer', flex: 1 }}><b>Take Photo</b></button>
          </div>
          <input type="file" id="registration-file" hidden />

          <button type="submit" id="auth" className="btn btn--primary margin--top-2">Sign up</button>

          <div className="auth__main__form__footer flex flex--j-space-around margin--top-2">
            <p><Link to="/g/sign-in">Sign in instead</Link></p>
            <p>Cookie policy</p>
            <p>Cookie policy</p>
          </div>

          <div className="camera hide" id="camera-con">
            <div className="camera__main" id="camera-main">
              <video id="video" ref={videoRef}>Video stream not available.</video>
              <canvas id="canvas" ref={canvasRef} hidden> </canvas>
              <div className="output">
                <img id="photo" className="pos--abs" style={{ top: '1rem', left: '1rem' }} ref={photoRef} alt="The screen capture will appear in this box." />
              </div>

              <div className="flex">
                <button type="button" onClick={() => retake()}>Retake</button>
                <button type="button" onClick={() => takepicture()}>Capture</button>
                <button type="button" onClick={() => _exit()}>Exit</button>
                <button type="button" onClick={() => savepicture()}>Save</button>
              </div>
            </div>
          </div>
        </form>
      </main>
      <div className="auth__background" style={{ background: 'transparent'}}>
        <div id="google-maps"></div>
      </div>
    </div>
  )
}