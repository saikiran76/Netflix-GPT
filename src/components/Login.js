import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import { checkValidData } from "../utils/validate";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, GoogleAuthProvider, signInWithPopup, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth, requestPermissionForNotifications } from "../utils/firebase";
import { addUser, setGuestUser } from "../utils/userSlice";
import { BG_URL, USER_AVATAR } from "../utils/constants";
import bg from '../img/bg.png'

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [otpSent, setOtpSent] = useState(false);
  const [confirmationResult, setConfirmationResult] = useState(null);
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const navigate = useNavigate(); 

  // References to input fields
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const phoneRef = useRef(null);
  const otpRef = useRef(null);

  const googleProvider = new GoogleAuthProvider();

  /**
   * Handle submission of Sign In or Sign Up form.
   */
  const handleButtonClick = () => {
    if (isSignInForm) {
      handleSignIn();
    } else {
      handleSignUp();
    }
  };

  /**
   * Sign up new users with email and password.
   */
  const handleSignUp = async () => {
    const message = checkValidData(emailRef.current.value, passwordRef.current.value);
    setErrorMessage(message);
    if (message) return;

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        emailRef.current.value,
        passwordRef.current.value
      );
      const newUser = userCredential.user;
      await updateProfile(newUser, {
        displayName: nameRef.current.value,
        photoURL: USER_AVATAR,
      });
      dispatch(
        addUser({
          uid: newUser.uid,
          email: newUser.email,
          displayName: newUser.displayName || nameRef.current.value,
          photoURL: newUser.photoURL || USER_AVATAR,
          phoneNumber: newUser.phoneNumber || null,
        })
      );
      // Request notification permission
      requestPermissionForNotifications();
      // Navigate to /browse after successful sign-up
      navigate("/browse");
    } catch (error) {
      const errorCode = error.code;
      const errorMessageStr = error.message;
      setErrorMessage(errorCode + "-" + errorMessageStr);
    }
  };

  /**
   * Sign in existing users with email and password.
   */
  const handleSignIn = async () => {
    const message = checkValidData(emailRef.current.value, passwordRef.current.value);
    setErrorMessage(message);
    if (message) return;

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        emailRef.current.value,
        passwordRef.current.value
      );
      const loggedInUser = userCredential.user;
      dispatch(
        addUser({
          uid: loggedInUser.uid,
          email: loggedInUser.email,
          displayName: loggedInUser.displayName || "",
          photoURL: loggedInUser.photoURL || USER_AVATAR,
          phoneNumber: loggedInUser.phoneNumber || null,
        })
      );
      // Request notification permission
      requestPermissionForNotifications();
      // Navigate to /browse after successful sign-in
      navigate("/browse");
    } catch (error) {
      const errorMessageStr = error.message;
      console.log(errorMessageStr);
      setErrorMessage("Seems like you've got the wrong creds there");
    }
  };

  /**
   * Google Sign-In.
   */
  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const googleUser = result.user;
      dispatch(
        addUser({
          uid: googleUser.uid,
          email: googleUser.email,
          displayName: googleUser.displayName,
          photoURL: googleUser.photoURL,
          phoneNumber: googleUser.phoneNumber || null,
        })
      );
      // Request notification permission
      requestPermissionForNotifications();
      // Navigate to /browse after successful Google sign-in
      navigate("/browse");
    } catch (error) {
      setErrorMessage("Google Sign In Failed: " + error.message);
    }
  };

  /**
   * Send OTP to the provided phone number.
   */
  const handleSendOTP = async () => {
    setErrorMessage(null);

    if (!phoneRef.current.value) {
      setErrorMessage("Please enter your phone number");
      return;
    }

    // Initialize the Recaptcha Verifier
    window.recaptchaVerifier = new RecaptchaVerifier(
      'recaptcha-container', 
      { size: 'invisible' }, 
      auth
    );

    try {
      const confirmation = await signInWithPhoneNumber(auth, phoneRef.current.value, window.recaptchaVerifier);
      setConfirmationResult(confirmation);
      setOtpSent(true);
      setErrorMessage(null);
    } catch (error) {
      console.error(error);
      setErrorMessage("Phone Sign In Failed: " + error.message);
    }
  };

  /**
   * Verify the OTP entered by the user.
   */
  const handleVerifyOTP = async () => {
    if (!otpRef.current.value) {
      setErrorMessage("Please enter the OTP");
      return;
    }

    try {
      const result = await confirmationResult.confirm(otpRef.current.value);
      const phoneUser = result.user;
      dispatch(
        addUser({
          uid: phoneUser.uid,
          phoneNumber: phoneUser.phoneNumber,
          displayName: phoneUser.displayName || "Phone User",
          photoURL: phoneUser.photoURL || USER_AVATAR,
          email: phoneUser.email || null, // For phone sign-in, email may be null
        })
      );
      setErrorMessage(null);
      requestPermissionForNotifications();
      setOtpSent(false);
      // Navigate to /browse after successful OTP verification
      navigate("/browse");
    } catch (error) {
      setErrorMessage("Invalid OTP: " + error.message);
    }
  };

  /**
   * Toggle between Sign In and Sign Up forms.
   */
  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
    setOtpSent(false);
    setErrorMessage(null);
  };

  /**
   * Handle guest login.
   */
  const handleGuestLogin = () => {
    dispatch(setGuestUser());
    // Navigate to /browse for guest user
    navigate("/browse");
  };

  // Determine if user is logged in
  const isLoggedIn = user && user.uid;

  return (
    <div className="font-martelsans">
      {/* Only show the header if the user is logged in */}
      {isLoggedIn && <Header />}
      {/* Background Image */}
      <div className="absolute">
        <img className="h-[110vh] w-[125vw]" src={bg} alt="background" />
      </div>
      <div className="relative z-10">
        {/* Recaptcha container should be present in the DOM */}
        <div id="recaptcha-container"></div>
        <form
          onSubmit={(e) => e.preventDefault()}
          className="w-full md:w-3/12 absolute p-12 bg-black my-24 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80"
        >
          <h1 className="font-bold text-3xl py-4">
            {isSignInForm ? "Sign In" : "Sign Up"}
          </h1>

          {!isSignInForm && (
            <input
              ref={nameRef}
              type="text"
              placeholder="Full Name"
              className="p-4 my-4 w-full bg-gray-700 rounded"
            />
          )}

          {/* If not sending OTP or verifying, show email & password fields */}
          {!otpSent && (
            <>
              <input
                ref={emailRef}
                type="text"
                placeholder="Email Address"
                className="p-4 my-4 w-full bg-gray-700 rounded"
              />
              <input
                ref={passwordRef}
                type="password"
                placeholder="Password"
                className="p-4 my-4 w-full bg-gray-700 rounded"
              />
            </>
          )}

          {/* OTP Verification Input */}
          {otpSent && (
            <input
              ref={otpRef}
              type="text"
              placeholder="Enter OTP"
              className="p-4 my-4 w-full bg-gray-700 rounded"
            />
          )}

          <p className="text-red-500 font-bold text-lg py-2">{errorMessage}</p>

          {/* Action Buttons */}
          {!otpSent && (
            <button
              className="p-4 my-4 bg-red-700 w-full rounded-lg hover:bg-red-800 transition-colors"
              onClick={handleButtonClick}
            >
              {isSignInForm ? "Sign In" : "Sign Up"}
            </button>
          )}

          {/* Google Sign-In (only in Sign In form) */}
          {isSignInForm && !otpSent && (
            <button
              className="p-4 my-2 bg-blue-600 w-full rounded-lg hover:bg-blue-700 transition-colors"
              onClick={handleGoogleSignIn}
            >
              Sign In with Google
            </button>
          )}

          {/* Phone Number Authentication (only in Sign In form) */}
          {isSignInForm && !otpSent && (
            <div className="my-4">
              <input
                ref={phoneRef}
                type="text"
                placeholder="Phone Number"
                className="p-4 w-full bg-gray-700 rounded"
              />
              <button
                className="p-4 mt-2 bg-green-600 w-full rounded-lg hover:bg-green-700 transition-colors"
                onClick={handleSendOTP}
              >
                Sign In with Phone (OTP)
              </button>
            </div>
          )}

          {/* Verify OTP button (when OTP is sent) */}
          {otpSent && (
            <button
              className="p-4 my-2 bg-green-600 w-full rounded-lg hover:bg-green-700 transition-colors"
              onClick={handleVerifyOTP}
            >
              Verify OTP
            </button>
          )}

          {/* Guest Login Button */}
          {!isLoggedIn && (
            <button
              className="p-4 my-2 bg-gray-600 w-full rounded-lg hover:bg-gray-700 transition-colors"
              onClick={handleGuestLogin}
            >
              Continue as Guest
            </button>
          )}

          {/* Toggle between Sign In and Sign Up */}
          <p className="py-4 cursor-pointer" onClick={toggleSignInForm}>
            {isSignInForm
              ? "New to Flixy? Sign Up Now"
              : "Already registered? Sign In Now."}
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
