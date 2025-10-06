import { useEffect, useRef, useState } from "react";
import "./home.css";
import "./component.css";
import { data } from "./context/data";
import poncik from "./assets/poncik.png";
import butterfly from "./assets/butterfly.gif";
import eatin_birds from "./assets/birds.gif";
import snail from "./assets/salyangoz.gif";
import birds from "./assets/birds_fly.gif";
import cash from "./assets/cash.gif";
import music from "./assets/bg_music.mp3";

const env = window.ENV || { TITLE: "$NPCP Friends", X_LINK: "#", WALLET: "#" };

export const App = () => {
  const cardsRef = useRef([]);
  const exchangeRate = 50; // 1 USD = 50 NPCP
  const [usd, setUsd] = useState("");
  const [npcp, setNpcp] = useState("");
  const [balans] = useState(100);
  const [audio] = useState(new Audio(music));
  const [isMusicStarted, setIsMusicStarted] = useState(false);

  const handleUsdChange = (e) => {
    let value = e.target.value.replace(/^0+/, ""); // Baştaki 0'ları temizle
    if (value === "") {
      setUsd("");
      setNpcp("");
    } else {
      setUsd(value);
      setNpcp((parseFloat(value) * exchangeRate).toString());
    }
  };

  const handleNpcpChange = (e) => {
    let value = e.target.value.replace(/^0+/, ""); // Baştaki 0'ları temizle
    if (value === "") {
      setUsd("");
      setNpcp("");
    } else {
      setNpcp(value);
      setUsd((parseFloat(value) / exchangeRate).toString());
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal");
          }
        });
      },
      { threshold: 0.1 }
    );

    cardsRef.current.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const playMusic = () => {
      if (!isMusicStarted) {
        audio.loop = true;
        audio.volume = 0.1;
        audio.play().catch((err) => console.log("Autoplay blocked:", err));
        setIsMusicStarted(true);
      }
    };

    document.addEventListener("click", playMusic, { once: true });

    return () => document.removeEventListener("click", playMusic);
  }, [isMusicStarted, audio]);

  return (
    <div className="wrapper">
      <nav className="navbar">
        <h3>{env.TITLE}</h3>
        <div className="navbar-menu">
          <button
            className="connect"
            onClick={() =>
              window.open(
                env.WALLET,
                "_blank"
              )
            }
          >
            Get Free $NPCP
          </button>
          <a href="#about">About Us</a>
          <a href="#question">Questions</a>
        </div>
      </nav>

      <div className="wallet">
        <img src={cash} alt="cash" className="cash" />
        <img src={eatin_birds} alt="eatin_birds" className="eating-birds" />
        <div className="wallet-info">
          <p>
            Your balans: <span>{balans} $NPCP</span>
          </p>
          <button
            className="connect"
            onClick={() =>
              window.open(
                env.WALLET,
                "_blank"
              )
            }
          >
            Connect Wallet
          </button>
        </div>
        <div className="calculate">
          <h3>Calculate Currency</h3>
          <label>
            <input
              type="number"
              placeholder="1"
              value={usd}
              onChange={handleUsdChange}
            />
            <span>$USD</span>
          </label>
          <span>{"<-->"}</span>
          <label>
            <input
              type="number"
              placeholder="50"
              value={npcp}
              onChange={handleNpcpChange}
            />
            <span>$NPCP</span>
          </label>
        </div>
      </div>

      <section className="bento-section">
        <div className="container">
          <div className="bento-grid">
            {data.map((item, index) => (
              <a
                key={index}
                // onClick={(e) => {
                //   e.preventDefault();
                //   cardsRef.current[index + 1].scrollIntoView({
                //     behavior: "smooth",
                //   });
                // }}
                className={`card ${item.hero ? "hero" : ""}`}
                ref={(el) =>
                  item.hero ? null : (cardsRef.current[index + 1] = el)
                }
              >
                {item.hero && (
                  <img
                    src={eatin_birds}
                    alt="eatin_birds"
                    className="eating-birds hero"
                  />
                )}

                <img
                  src={snail}
                  alt="snail"
                  className={`snail _${index + 1}`}
                />
                <div className="visual">
                  <img
                    src={item.image}
                    alt={item.title}
                    width="512"
                    height="512"
                    loading="lazy"
                  />
                </div>
                <div className="content">
                  <p>
                    {item.price} <sup>$npcp</sup>
                  </p>
                  <h3>{item.title}</h3>
                  <small>{item.date}</small>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
      <div
        className="about-section"
        id="about"
        data-aos="fade-up"
        data-aos-easing="linear"
        data-aos-delay="100"
        data-aos-offset="0"
      >
        <img src={eatin_birds} alt="eatin_birds" className="eating-birds" />
        <div className="text">
          <h3
            data-aos="fade-up"
            data-aos-easing="linear"
            data-aos-delay="200"
            data-aos-offset="0"
          >
            Adopt & Care for Your Dream Virtual Pet!
          </h3>
          <p
            data-aos="fade-up"
            data-aos-easing="linear"
            data-aos-delay="300"
            data-aos-offset="0"
          >
            Welcome to Pet Haven, the ultimate platform where you can adopt,
            nurture, and bond with your very own virtual pets! Want a playful
            puppy, a mystical dragon, or even a cyber-kitten? The choice is
            yours! At Pet Haven, you can create and customize your perfect
            pet—choose their appearance, personality, and unique traits to make
            them truly one of a kind. <br />
            <br />
            🐾 Feed, play, and train your pet to keep them happy and healthy.{" "}
            <br />
            <br />
            🎮 Engage in interactive activities—go on adventures, teach them
            tricks, and watch their personality grow! <br />
            <br />
            📸 Receive adorable updates & snapshots of your pet’s daily life.{" "}
            <br />
            <br />
            🌎 Connect with other pet lovers in a vibrant virtual pet community!
            Whether you’re looking for a loyal companion or a magical creature
            to care for, Pet Haven brings your dream pet to life. <br />
            <br />
            Start your pet journey today—adopt your first virtual pet for free!
            🐶🐱🐉
          </p>
          <img src={butterfly} alt="butterfly" className="butterfly" />
        </div>
        <div
          className="info-image"
          data-aos="fade-up"
          data-aos-easing="linear"
          data-aos-delay="500"
          data-aos-offset="0"
        >
          <img src={poncik} alt="Poncik" className="poncik" />
          <img src={butterfly} alt="butterfly" className="butterfly" />
        </div>
      </div>

      <div
        className="question"
        id="question"
        data-aos="fade-up"
        data-aos-easing="linear"
        data-aos-delay="100"
        data-aos-offset="0"
      >
        <h3 data-aos="fade-up" data-aos-easing="linear">
          Frequently Asked Questions
        </h3>
        <div className="question-list">
          <div className="question-item">
            <h4
              data-aos="fade-up"
              data-aos-easing="linear"
              data-aos-delay="100"
              data-aos-offset="0"
            >
              How do I adopt a virtual pet?
            </h4>
            <p
              data-aos="fade-up"
              data-aos-easing="linear"
              data-aos-delay="200"
              data-aos-offset="0"
            >
              Simply create an account, browse our selection of adorable pets,
              and choose the one that captures your heart!
            </p>
          </div>
          <div className="question-item">
            <h4
              data-aos="fade-up"
              data-aos-easing="linear"
              data-aos-delay="300"
              data-aos-offset="0"
            >
              Can I customize my pet?
            </h4>
            <p
              data-aos="fade-up"
              data-aos-easing="linear"
              data-aos-delay="400"
              data-aos-offset="0"
            >
              Absolutely! You can personalize your pet's appearance, name, and
              even their personality traits.
            </p>
          </div>
          <div className="question-item">
            <h4
              data-aos="fade-up"
              data-aos-easing="linear"
              data-aos-delay="500"
              data-aos-offset="0"
            >
              Is there a cost to adopt a pet?
            </h4>
            <p
              data-aos="fade-up"
              data-aos-easing="linear"
              data-aos-delay="600"
              data-aos-offset="0"
            >
              Nope! Adopting your first virtual pet is completely free!
            </p>
          </div>
          <div className="question-item">
            <h4
              data-aos="fade-up"
              data-aos-easing="linear"
              data-aos-delay="700"
              data-aos-offset="0"
            >
              What activities can I do with my pet?
            </h4>
            <p
              data-aos="fade-up"
              data-aos-easing="linear"
              data-aos-delay="800"
              data-aos-offset="0"
            >
              You can feed, play, train, and even take your pet on adventures!
              The possibilities are endless.
            </p>
          </div>
        </div>
      </div>
      <footer>
        <img src={eatin_birds} alt="eatin_birds" className="eating-birds" />
        <p>© 2025 Pet Haven. All rights reserved.</p>
        <p>This is a fictional project created for demonstration purposes.</p>
        <p>All pet images are for illustrative purposes only.</p>
      </footer>
      <img src={birds} alt="birds" className="birds" />
    </div>
  );
};
