/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  checkSubscribe,
  createSubscribe,
  unSubscribe,
} from "../../redux/featurs/subscribeSlice";
import { useNavigate } from "react-router-dom";
import "./style.css";
import { useWindowSize } from "react-use";
import Confetti from "canvas-confetti";
import confetti from "canvas-confetti";
import clapGif from "/assets/fanscription/clap.gif";

const Fanscription = ({ data }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.auth.user);
  const accessToken = useSelector((state) => state.auth.data?.accessToken);

  const checkIsSubscribed = useSelector(
    (state) => state.subscriber.checkIsSubscribed
  );

  console.log("Check Subscribe:", checkIsSubscribed);

  const [isSubscribed, setIsSubscribed] = useState();
  const { width, height } = useWindowSize();

  // eslint-disable-next-line no-unused-vars
  const [showConfetti, setShowConfetti] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isAnimating, setIsAnimating] = useState(false);

  const [showSubscribeText, setShowSubscribeText] = useState(true);

  // Initialize with some dot positions
  const [dotPositions, setDotPositions] = useState([
    { x: 20, y: 0 },
    { x: 40, y: 0 },
    { x: 60, y: 0 },
    { x: 80, y: 0 },
    { x: 100, y: 0 },
    { x: 120, y: 0 },
    { x: 140, y: 0 },
    { x: 160, y: 0 },
    { x: 180, y: 0 },
  ]);

  useEffect(() => {
    setIsSubscribed(checkIsSubscribed);
  }, [checkIsSubscribed]);

  useEffect(() => {
    if (isSubscribed) {
      setIsAnimating(false);
      setShowConfetti(false);
      setDotPositions([]);
    }
  }, [isSubscribed]);
  useEffect(() => {
    if (isAnimating && dotPositions.length > 0) {
      const interval = setInterval(() => {
        setPosition((prevPosition) => {
          let newX = (prevPosition.x + 20) % 400; // Assuming the screen width is 400px
          let newY = prevPosition.y;
          return { x: newX, y: newY };
        });
      }, 200);

      return () => clearInterval(interval);
    } else {
      setIsAnimating(false); // Stop the animation if no dots are left or if isAnimating is false
    }
  }, [isAnimating, dotPositions]);

  useEffect(() => {
    setDotPositions((prevDotPositions) =>
      prevDotPositions.filter(
        (dot) => dot.x !== position.x || dot.y !== position.y
      )
    );
  }, [position]);

  const calculateConfettiOrigin = () => {
    const buttonElement = document.getElementById("button");
    if (buttonElement) {
      const rect = buttonElement.getBoundingClientRect();
      const originX = (rect.left + rect.width / 2) / window.innerWidth;
      const originY = (rect.top + rect.height / 2) / window.innerHeight;
      return { x: originX, y: originY };
    }
    // Default to center if the button is not found
    return { x: 0.5, y: 0.5 };
  };

  const handleClick = () => {
    setShowSubscribeText(false); // Initially hide the subscribe text
    setPosition({ x: 0, y: 0 });
    // Start animation only if there are dots left to eat
    if (dotPositions.length > 0) {
      setIsAnimating(true);
      setTimeout(() => {
        setIsAnimating(false); // Stop animation after 3 seconds

        setShowSubscribeText(true);

        const confettiOrigin = calculateConfettiOrigin();
        confetti({
          particleCount: 100,
          spread: 70,
          origin: confettiOrigin,
        });
        setTimeout(() => {
          confetti.reset();
        }, 3000);
      }, 2000);
    }
    if (isSubscribed) {
      // setIsSubscribed(!isSubscribed);
      setShowSubscribeText(true);
      // setIsAnimating(false);
      setPosition({ x: 0, y: 0 });
      setDotPositions([
        { x: 20, y: 0 },
        { x: 40, y: 0 },
        { x: 60, y: 0 },
        { x: 80, y: 0 },
        { x: 100, y: 0 },
        { x: 120, y: 0 },
        { x: 140, y: 0 },
        { x: 160, y: 0 },
        { x: 180, y: 0 },
      ]);
    }
  };

  // handle Subscribe function
  const handlesubscribe = () => {
    if (!user) navigate("/login");
    else
      dispatch(
        createSubscribe({
          userId: user._id,
          username: data?.channelData?.owner.username,
          channelId: data.channelData._id,
          accessToken,
        })
      );
  };

  // handle unSubscribe function
  const handleUnsubscribe = () => {
    if (!user) navigate("/login");
    else
      dispatch(
        unSubscribe({
          userId: user._id,
          username: data?.channelData?.owner.username,
          channelId: data.channelData._id,
          accessToken,
        })
      );
  };

  return (
    <>
      <button id="button" className="fanscription-button" onClick={handleClick}>
        {showSubscribeText &&
          (isSubscribed ? (
            <div className="message successMessage" onClick={handleUnsubscribe}>
              <span className="button-text">Fanscribed</span>
            </div>
          ) : (
            <div className="message submitMessage" onClick={handlesubscribe}>
              <span className="button-text">Fanscribe</span>
            </div>
          ))}
        {showConfetti && (
          <Confetti
            width={width}
            height={height}
            drawShape={(ctx) => {
              ctx.beginPath();
              for (let i = 0; i < 22; i++) {
                const angle = 0.35 * i;
                const x = (0.2 + 1.5 * angle) * Math.cos(angle);
                const y = (0.2 + 1.5 * angle) * Math.sin(angle);
                ctx.lineTo(x, y);
              }
              ctx.stroke();
              ctx.closePath();
            }}
          />
        )}

        <div className="message loadingMessage">
          {isAnimating && (
            <div
              className="pacman"
              style={{
                position: "absolute",
                width: 20,
                height: 20,
                left: position.x,
                top: position.y + "3px",
                transition: "left 0.3s",
              }}
            >
              <span className="top"></span>
              <span className="bottom"></span>
              <span className="left"></span>
              <div className="eye"></div>
            </div>
          )}
          {isAnimating &&
            dotPositions.map((dotPosition, index) => (
              <img
                src={clapGif}
                key={index}
                alt=""
                style={{
                  position: "absolute",
                  height: 20,
                  width: 20,
                  left: dotPosition.x,
                  top: dotPosition.y + 10,
                }}
              />
            ))}
        </div>
      </button>
    </>
  );
};

export default Fanscription;
