import { 
  useState, 
  useRef 
} from "react";
import Header from "./Header";
import { checkValidData } from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
  RecaptchaVerifier,
  signInWithPhoneNumber
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { USER_AVATAR } from "../utils/constants";
import goog from '../img/goog.png'
import bg from '../img/bg.png'

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [otpSent, setOtpSent] = useState(false);
  const dispatch = useDispatch();

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);
  const phoneRef = useRef(null);
  const otpRef = useRef(null);

  const googleProvider = new GoogleAuthProvider();

  const handleButtonClick = () => {
    const message = checkValidData(email.current.value, password.current.value);
    setErrorMessage(message);
    if (message) return;

    if (!isSignInForm) {
      // Sign Up Logic
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current.value,
            photoURL: USER_AVATAR,
          })
            .then(() => {
              const { uid, email, displayName, photoURL } = auth.currentUser;
              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                  photoURL: photoURL,
                })
              );
            })
            .catch((error) => {
              setErrorMessage(error.message);
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
        });
    } else {
      // Sign In Logic
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          dispatch(
            addUser({
              uid: user.uid,
              email: user.email,
              displayName: user.displayName,
              photoURL: user.photoURL,
            })
          );
        })
        .catch((error) => {
          const errorMessage = error.message;
          console.log(errorMessage);
          setErrorMessage("Seems like you've got the wrong creds there");
        });
    }
  };

  const handleGoogleSignIn = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const user = result.user;
        dispatch(
          addUser({
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
          })
        );
      })
      .catch((error) => {
        setErrorMessage("Google Sign In Failed: " + error.message);
      });
  };

  const setupRecaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "invisible",
        callback: (response) => {
          console.log("Recaptcha Verified");
        }
      },
      auth
    );
  };

  const handleSendOTP = () => {
    if (!phoneRef.current.value) {
      setErrorMessage("Please enter your phone number");
      return;
    }
    setupRecaptcha();
    const phoneNumber = phoneRef.current.value;
    const appVerifier = window.recaptchaVerifier;

    signInWithPhoneNumber(auth, phoneNumber, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        setOtpSent(true);
        setErrorMessage(null);
      })
      .catch((error) => {
        setErrorMessage("Phone Sign In Failed: " + error.message);
      });
  };

  const handleVerifyOTP = () => {
    const code = otpRef.current.value;
    if (!code) {
      setErrorMessage("Please enter the OTP");
      return;
    }
    window.confirmationResult
      .confirm(code)
      .then((result) => {
        const user = result.user;
        dispatch(
          addUser({
            uid: user.uid,
            phoneNumber: user.phoneNumber,
            displayName: user.displayName,
            photoURL: user.photoURL,
          })
        );
        setErrorMessage(null);
      })
      .catch((error) => {
        setErrorMessage("Invalid OTP: " + error.message);
      });
  };

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };

  return (
    <div>
      <Header />
      <div className="absolute">
        <img className="h-[110vh] w-[125vw]" src={bg} alt="logo" />
      </div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="w-full md:w-3/12 absolute p-12 bg-black my-24 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-90 font-martelsans"
      >
        <h1 className="font-bold text-3xl py-4">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>

        {!isSignInForm && (
          <input
            ref={name}
            type="text"
            placeholder="Full Name"
            className="p-4 my-4 w-full bg-gray-700"
          />
        )}
        {!otpSent && (
          <>
            <input
              ref={email}
              type="text"
              placeholder="Email Address"
              className="p-4 my-4 w-full bg-gray-700"
            />
            <input
              ref={password}
              type="password"
              placeholder="Password"
              className="p-4 my-4 w-full bg-gray-700"
            />
          </>
        )}
        {otpSent && (
          <>
            <input
              ref={otpRef}
              type="text"
              placeholder="Enter OTP"
              className="p-4 my-4 w-full bg-gray-700"
            />
          </>
        )}
        <p className="text-red-500 font-bold text-lg py-2">{errorMessage}</p>
        {!otpSent && (
          <button
            className="p-4 my-6 bg-red-700 w-full rounded-lg"
            onClick={handleButtonClick}
          >
            {isSignInForm ? "Sign In" : "Sign Up"}
          </button>
        )}
        {!otpSent && (
          <button
            className="p-4 my-2 bg-blue-600 w-full rounded-lg flex gap-4 justify-center items-center"
            onClick={handleGoogleSignIn}
          >
            <img className="w-[15%] font-bold" src={goog} alt="accnt_logo"/>
            Sign In with Google
          </button>
        )}
        {!otpSent && (
          <>
            <input
              ref={phoneRef}
              type="text"
              placeholder="Phone Number"
              className="p-4 my-4 w-full bg-gray-700"
            />
            <button
              className="p-4 my-2 bg-green-600 w-full rounded-lg"
              onClick={handleSendOTP}
            >
              Send OTP
            </button>
          </>
        )}
        {otpSent && (
          <button
            className="p-4 my-2 bg-green-600 w-full rounded-lg"
            onClick={handleVerifyOTP}
          >
            Verify OTP
          </button>
        )}
        <div id="recaptcha-container"></div>
        <p className="py-4 cursor-pointer" onClick={toggleSignInForm}>
          {isSignInForm
            ? "New to Flixy? Sign Up Now"
            : "Already registered? Sign In Now."}
        </p>
      </form>
    </div>
  );
};

export default Login;
