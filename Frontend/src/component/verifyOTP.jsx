import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { USER_AUTH_ENDPOINT } from "../utils/ENDPOINTS";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function OtpVerification() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(30); // 30s countdown for resend
  const [canResend, setCanResend] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email;

  // Countdown Timer Logic
  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    } else {
      setCanResend(true);
    }
    return () => clearInterval(interval);
  }, [timer]);

  // Handle OTP Input
  const handleChange = (value, index) => {
    if (/^[0-9]?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Auto-focus next field
      if (value && index < 5) {
        document.getElementById(`otp-${index + 1}`).focus();
      }
    }
  };

  // Handle Backspace (focus previous input)
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      document.getElementById(`otp-${index - 1}`).focus();
    }
  };

  // Submit OTP
  const handleVerify = async(e) => {
    e.preventDefault();
    const otpCode = otp.join("");
    if (otpCode.length === 6) {
      try {
        const res = await axios.post(`${USER_AUTH_ENDPOINT}/verify-otp`, {email, otp:otpCode},{
            headers : {
              "Content-Type" : "application/json"
            },
            withCredentials: true
          })

          if(res.data.success){
            toast.success(res.data.message)
            navigate('/profile');
          }
        
      } catch (error) {
          toast.error(error.response.data.message)
      }

    } else {
      alert("Please enter all 6 digits of the OTP.");
    }
  };

  // Resend OTP
  const handleResend = () => {
    if (canResend) {
      console.log("Resending OTP...");
      setTimer(30);
      setCanResend(false);
      setOtp(["", "", "", "", "", ""]);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6 sm:p-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
          OTP Verification
        </h2>
        <p className="text-center text-sm text-gray-600 mb-6">
          Enter the 6-digit code sent to your email/phone.
        </p>

        {/* OTP Input Fields */}
        <form onSubmit={handleVerify} className="flex flex-col items-center space-y-5">
          <div className="flex justify-center gap-2 sm:gap-3">
            {otp.map((digit, index) => (
              <input
                key={index}
                id={`otp-${index}`}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleChange(e.target.value, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className="w-10 h-12 sm:w-12 sm:h-14 text-center text-lg border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
              />
            ))}
          </div>

          {/* Verify Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Verify OTP
          </button>
        </form>

        {/* Resend OTP */}
        <div className="text-center mt-4">
          {canResend ? (
            <button onClick={handleResend} className="text-blue-600 hover:underline">
              Resend OTP
            </button>
          ) : (
            <p className="text-sm text-gray-500">
              Resend OTP in <span className="font-semibold">{timer}s</span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
