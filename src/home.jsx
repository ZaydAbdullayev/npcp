import { useEffect, useRef } from "react";
import "./home.css";
import { data } from "./context/data";

export const App = () => {
  const cardsRef = useRef([]);

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

  return (
    <section className="bento-section">
      <div className="container">
        <header>
          <h2>Latest Stories</h2>
        </header>
        <div className="bento-grid">
          {data.map((item, index) => (
            <a
              key={index}
              href="#"
              className={`card ${item.hero ? "hero" : ""}`}
              ref={(el) =>
                item.hero ? null : (cardsRef.current[index + 1] = el)
              }
            >
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
                <small>FEATURED STORY</small>
                <h3>{item.title}</h3>
                <small>{item.date}</small>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
