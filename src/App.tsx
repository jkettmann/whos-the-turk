import { useState } from "react";
import Confetti from "react-confetti";
import "./App.css";

interface Item {
  image: string;
  type: "turk" | "other";
}

const items: Item[] = [
  { image: "/other/agnes_kittelsen.jpg", type: "other" },
  { image: "/turk/aslihan_guner.jpg", type: "turk" },
  { image: "/other/tamzin_merchant.jpg", type: "other" },

  { image: "/turk/asli_melisa_uzun.jpg", type: "turk" },
  { image: "/other/alexandra_maria_lara.jpg", type: "other" },
  { image: "/other/alicja_bachleda.jpg", type: "other" },

  { image: "/other/amelia_warner.jpg", type: "other" },
  { image: "/other/charlotte_riley.jpg", type: "other" },
  { image: "/turk/beren_saat.webp", type: "turk" },

  { image: "/other/ben_barnes.jpg", type: "other" },
  { image: "/turk/cagatay_ulusoy.webp", type: "turk" },
  { image: "/other/david_oakes.jpg", type: "other" },

  { image: "/turk/kerem_bursin.jpg", type: "turk" },
  { image: "/other/freddie_fox.jpg", type: "other" },
  { image: "/other/george_blagden.webp", type: "other" },

  { image: "/other/georgia_may_foote.jpg", type: "other" },
  { image: "/turk/gizem_karaca.jpg", type: "turk" },
  { image: "/other/weronika_rosati.jpg", type: "other" },

  { image: "/other/jack_huston.avif", type: "other" },
  { image: "/other/jamie_blackley.jpg", type: "other" },
  { image: "/turk/kivanc-tatlitug.jpg", type: "turk" },

  { image: "/other/jessica_brown_findlay.png", type: "other" },
  { image: "/turk/hazal_kaya.jpg", type: "turk" },
  { image: "/other/jessica_schwarz.jpg", type: "other" },

  { image: "/turk/elcin_sangu.jpg", type: "turk" },
  { image: "/other/kasia_smutniak.jpg", type: "other" },
  { image: "/other/katie_mcgrath.webp", type: "other" },

  { image: "/other/lisa_nilsson.jpg", type: "other" },
  { image: "/turk/hande_ercel.jpg", type: "turk" },
  { image: "/other/magdalena_rozczka.webp", type: "other" },

  { image: "/turk/mehmet_ozan_dolunay.jpg", type: "turk" },
  { image: "/other/nicholas_hoult.jpg", type: "other" },
  { image: "/other/max_irons.jpg", type: "other" },

  { image: "/other/michelle_ryan.jpg", type: "other" },
  { image: "/other/malin_buska.webp", type: "other" },
  { image: "/turk/selda_alkor.webp", type: "turk" },

  { image: "/turk/selen-soyder.jpg", type: "turk" },
  { image: "/other/sabrina_bartlett.jpeg", type: "other" },
  { image: "/other/sidse_babett_knudsen.webp", type: "other" },

  { image: "/other/silje_torp.jpg", type: "other" },
  { image: "/turk/tugce_kazaz.webp", type: "turk" },
  { image: "/other/sophie_cookson.webp", type: "other" },
];

interface GameOverProps {
  score: number;
  totalRounds: number;
  onPlayAgain: () => void;
}

const GameOver = ({ score, totalRounds, onPlayAgain }: GameOverProps) => {
  const getMessage = () => {
    if (score >= 8) return "Congrats! You have a good Turk radar";
    if (score >= 4) return "Not bad but you should work on your Turk radar";
    return "Don't tell anyone they don't look like a Turk";
  };

  return (
    <div className="game-container">
      <h2>{getMessage()}</h2>
      <p>
        Your final score: {score} out of {totalRounds}
      </p>
      <button onClick={onPlayAgain}>Play Again</button>
    </div>
  );
};

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
      <GameOver
        score={score}
        totalRounds={TOTAL_ROUNDS}
        onPlayAgain={() => {
          setCurrentRound(1);
          setScore(0);
          setStartIndex(
            Math.floor(Math.random() * Math.floor(items.length / 3)) * 3
          );
        }}
      />
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
        <p style={{ maxWidth: 420, margin: "auto" }}>
          Ever told a person they don't look like a Turk? You only have the
          right to do so if you pass this test.
        </p>
        <p style={{ fontWeight: "bold" }}>
          So tell me: out of the 3 photos below, who's the Turk?
        </p>

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

        <p>
          Round {currentRound} of {TOTAL_ROUNDS}
        </p>
        <p>Score: {score}</p>
      </div>
    </>
  );
}

export default App;
