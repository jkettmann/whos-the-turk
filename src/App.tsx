import { useState } from "react";
import Confetti from "react-confetti";
import "./App.css";

interface Item {
  image: string;
  type: "turk" | "other";
}

const items: Item[] = [
  { image: "/placeholder1.jpg", type: "other" },
  { image: "/aslihan_guner.jpg", type: "turk" },
  { image: "/placeholder2.jpg", type: "other" },

  { image: "/asli_melisa_uzun.jpg", type: "turk" },
  { image: "/placeholder3.jpg", type: "other" },
  { image: "/placeholder4.jpg", type: "other" },

  { image: "/placeholder5.jpg", type: "other" },
  { image: "/placeholder6.jpg", type: "other" },
  { image: "/beren_saat.webp", type: "turk" },

  { image: "/placeholder7.jpg", type: "other" },
  { image: "/cagatay_ulusoy.webp", type: "turk" },
  { image: "/placeholder8.jpg", type: "other" },

  { image: "/placeholder9.jpg", type: "other" },
  { image: "/placeholder10.jpg", type: "other" },
  { image: "/elcin_sangu.jpg", type: "turk" },

  { image: "/placeholder11.jpg", type: "other" },
  { image: "/gizem_karaca.jpg", type: "turk" },
  { image: "/placeholder12.jpg", type: "other" },

  { image: "/placeholder13.jpg", type: "other" },
  { image: "/placeholder14.jpg", type: "other" },
  { image: "/hande_ercel.jpg", type: "turk" },

  { image: "/placeholder15.jpg", type: "other" },
  { image: "/hazal_kaya.jpg", type: "turk" },
  { image: "/placeholder16.jpg", type: "other" },

  { image: "/kerem_bursin.jpg", type: "turk" },
  { image: "/placeholder17.jpg", type: "other" },
  { image: "/placeholder18.jpg", type: "other" },

  { image: "/placeholder19.jpg", type: "other" },
  { image: "/kivanc-tatlitug.jpg", type: "turk" },
  { image: "/placeholder20.jpg", type: "other" },

  { image: "/mehmet_ozan_dolunay.jpg", type: "turk" },
  { image: "/placeholder21.jpg", type: "other" },
  { image: "/placeholder22.jpg", type: "other" },

  { image: "/placeholder23.jpg", type: "other" },
  { image: "/placeholder24.jpg", type: "other" },
  { image: "/selda_alkor.webp", type: "turk" },

  { image: "/selen-soyder.jpg", type: "turk" },
  { image: "/placeholder25.jpg", type: "other" },
  { image: "/placeholder26.jpg", type: "other" },

  { image: "/placeholder27.jpg", type: "other" },
  { image: "/tugce_kazaz.webp", type: "turk" },
  { image: "/placeholder28.jpg", type: "other" },
];

function App() {
  const [currentRound, setCurrentRound] = useState(1);
  const [startIndex, setStartIndex] = useState(
    Math.floor(Math.random() * Math.floor(items.length / 3)) * 3
  );
  const [score, setScore] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [isWrongAnswer, setIsWrongAnswer] = useState(false);
  const TOTAL_ROUNDS = 10;

  const handleClick = (selectedItem: Item) => {
    if (isFading) return;

    setIsFading(true);

    if (selectedItem.type === "turk") {
      setShowConfetti(true);
      setTimeout(() => {
        setShowConfetti(false);
      }, 2000);
    } else {
      setIsWrongAnswer(true);
      setTimeout(() => {
        setIsWrongAnswer(false);
      }, 500);
    }

    setTimeout(() => {
      if (selectedItem.type === "turk") {
        setScore(score + 1);
      }
      setCurrentRound(currentRound + 1);
      setTimeout(() => {
        setIsFading(false);
      }, 50);
    }, 300);
  };

  if (currentRound > TOTAL_ROUNDS) {
    return (
      <div className="game-container">
        <h2>Game Over!</h2>
        <p>
          Your final score: {score} out of {TOTAL_ROUNDS}
        </p>
        <button
          onClick={() => {
            setCurrentRound(1);
            setScore(0);
            setStartIndex(
              Math.floor(Math.random() * Math.floor(items.length / 3)) * 3
            );
          }}
        >
          Play Again
        </button>
      </div>
    );
  }

  const index = startIndex + (currentRound - 1) * 3;
  const currentOptions = [
    items[index % items.length],
    items[(index + 1) % items.length],
    items[(index + 2) % items.length],
  ];

  return (
    <>
      {isWrongAnswer && <div className="flash-overlay flash-wrong" />}
      <div className="game-container">
        {showConfetti && (
          <Confetti
            width={window.innerWidth}
            height={window.innerHeight}
            recycle={false}
            numberOfPieces={200}
          />
        )}

        <h1>Who's the Turk?</h1>
        <p>
          Round {currentRound} of {TOTAL_ROUNDS}
        </p>
        <p>Score: {score}</p>
        <div className="food-options">
          {currentOptions.map((item, index) => (
            <img
              key={`${currentRound}-${index}`}
              src={item.image}
              onClick={() => handleClick(item)}
              className={`food-image ${isFading ? "fade-out" : ""}`}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
