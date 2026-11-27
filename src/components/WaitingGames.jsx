import { useCallback, useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronRight,
  Gift,
  Puzzle as PuzzleIcon,
  RotateCw,
  Sparkles,
  Target,
  Trophy,
  X,
} from "lucide-react";

import { Link } from "../router.jsx";

import FoodQuiz from "./games/FoodQuiz.jsx";
import FoodPuzzle from "./games/FoodPuzzle.jsx";
import SpinAndWin from "./games/SpinAndWin.jsx";
import RewardsDashboard from "./games/RewardsDashboard.jsx";

import {
  createQuizRound,
  DEFAULT_PROGRESS,
  readProgress,
  writeProgress,
} from "../utils/waitingGames.js";

import "../styles/WaitingGames.css";


function GameCard({
  icon: Icon,
  title,
  description,
  tint,
  onClick,
  detail,
}) {
  return (
    <button
      type="button"
      className={`vf-game-card ${tint}`}
      onClick={onClick}
    >
      <span className="vf-game-card-icon">
        <Icon size={30} strokeWidth={2.1} />
      </span>

      <span className="vf-game-card-copy">
        <strong>{title}</strong>

        <small>{description}</small>

        <span className="vf-game-card-cta">
          {detail || "Play now"}
          <ChevronRight size={15} />
        </span>
      </span>
    </button>
  );
}


export default function WaitingGames({
  order = null,
  money,
  menuItems = [],
  onOrderSomethingElse,
  onBackToWebsite,
  standalone = false,
  onClose,
}) {
  const orderId = order?.id ? String(order.id) : null;

// Standalone games have their own progress.
// Order confirmation games remain separate for each order.
const progressId = standalone
  ? "standalone"
  : orderId;

const [activeGame, setActiveGame] = useState(null);

const [progress, setProgress] = useState(() =>
  readProgress(progressId)
);

  const [quizRound, setQuizRound] = useState(null);

  const [storageUnavailable, setStorageUnavailable] =
    useState(false);


  // Save progress separately for every order.
  useEffect(() => {
  if (!progressId) return;

  if (!writeProgress(progressId, progress)) {
    setStorageUnavailable(true);
  }
}, [progressId, progress]);


  // Update game progress safely.
  const updateProgress = useCallback((updater) => {
    setProgress((current) => {
      const next =
        typeof updater === "function"
          ? updater(current)
          : updater;

      const normalized = {
        ...DEFAULT_PROGRESS,
        ...next,

        quizQuestionHistory: Array.isArray(
          next.quizQuestionHistory
        )
          ? next.quizQuestionHistory
          : [],

        quizScores: Array.isArray(next.quizScores)
          ? next.quizScores
          : [],

        puzzleThemesUsed: Array.isArray(
          next.puzzleThemesUsed
        )
          ? next.puzzleThemesUsed
          : [],

        puzzleLayoutsUsed: Array.isArray(
          next.puzzleLayoutsUsed
        )
          ? next.puzzleLayoutsUsed
          : [],

        puzzleCompletions: Array.isArray(
          next.puzzleCompletions
        )
          ? next.puzzleCompletions
          : [],
      };

      normalized.totalPoints =
        normalized.quizPoints +
        normalized.puzzlePoints +
        normalized.spinPoints;

      return normalized;
    });
  }, [orderId]);


  // Generate a fresh quiz round.
  const startNewQuizRound = useCallback(() => {
    const nextRound = createQuizRound(
      progress.quizQuestionHistory
    );

    setQuizRound(nextRound);

    updateProgress((current) => ({
      ...current,

      quizQuestionHistory: [
        ...new Set([
          ...current.quizQuestionHistory,
          ...nextRound.questionIds,
        ]),
      ],
    }));

    setActiveGame("quiz");
  }, [progress.quizQuestionHistory, updateProgress]);


  const openQuiz = () => {
    if (
      !quizRound ||
      progress.quizScores.some(
        (record) => record.id === quizRound.id
      )
    ) {
      startNewQuizRound();
    } else {
      setActiveGame("quiz");
    }
  };


  // Add quiz score only once.
  const completeQuiz = (roundId, score, questionIds) => {
    updateProgress((current) => {
      if (
        current.quizScores.some(
          (record) => record.id === roundId
        )
      ) {
        return current;
      }

      return {
        ...current,

        quizPoints: current.quizPoints + score,

        quizScores: [
          ...current.quizScores,
          {
            id: roundId,
            score,
            questionIds,
            completedAt: new Date().toISOString(),
          },
        ],
      };
    });
  };


  // Add puzzle points only once.
  const completePuzzle = (puzzleId) => {
    updateProgress((current) => {
      if (
        current.puzzleCompletions.includes(puzzleId)
      ) {
        return current;
      }

      return {
        ...current,

        puzzlePoints: current.puzzlePoints + 15,

        puzzleCompletions: [
          ...current.puzzleCompletions,
          puzzleId,
        ],
      };
    });
  };


  // Remember puzzle themes and arrangements.
  const markPuzzleStarted = useCallback(
    (themeId, signature, resetHistory = false) => {
      updateProgress((current) => ({
        ...current,

        puzzleThemesUsed: resetHistory
          ? [themeId]
          : (
              current.puzzleThemesUsed.includes(themeId)
                ? current.puzzleThemesUsed
                : [...current.puzzleThemesUsed, themeId]
            ),

        puzzleLayoutsUsed: [
          ...new Set([
            ...current.puzzleLayoutsUsed,
            signature,
          ]),
        ].slice(-250),
      }));
    },
    [updateProgress]
  );


  // Save the spinner result and its points.
  const completeSpin = (prize) => {
    updateProgress((current) => {
      if (current.spinUsed) return current;

      return {
        ...current,

        spinUsed: true,
        spinResult: prize.id,

        spinPoints:
          current.spinPoints + prize.points,
      };
    });
  };


  const closeConfirmation = useCallback(() => {
  setActiveGame(null);

  if (standalone) {
    onClose?.();
  } else {
    onOrderSomethingElse?.();
  }
}, [standalone, onClose, onOrderSomethingElse]);


  // Escape key navigation.
  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key !== "Escape") return;

      event.preventDefault();

      if (activeGame) {
        setActiveGame(null);
      } else {
        closeConfirmation();
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activeGame, closeConfirmation]);


  const savedQuizScore = useMemo(
    () =>
      quizRound
        ? progress.quizScores.find(
            (record) => record.id === quizRound.id
          )?.score
        : undefined,
    [progress.quizScores, quizRound]
  );


  const formattedTotal =
    typeof money === "function"
      ? money(order?.total)
      : `₹${Number(order?.total || 0).toLocaleString("en-IN")}`;


  return (
    <div
      className="order-confirmation vf-waiting-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="Order confirmation and waiting games"
    >
      <section className="vf-waiting-modal">

        <button
          type="button"
          className="vf-waiting-close"
          onClick={closeConfirmation}
          aria-label="Close order confirmation"
        >
          <X size={20} />
        </button>


        {!standalone && (
  <>
    <div className="vf-order-success-line">
      <span className="confirmation-check">
        <Check />
      </span>

      <span className="order-kicker">
        ORDER RECEIVED
      </span>
    </div>

    <h2 className="vf-waiting-title">
      Thank you, {order?.customer?.name || "foodie"}!
    </h2>

    <p className="vf-order-message">
      Your order has been received. The restaurant
      will confirm it. Enjoy a little fun while your
      food is being prepared!
    </p>

    <div className="vf-order-summary">
      <div>
        <span>ORDER REFERENCE</span>
        <strong>{orderId || "Not available"}</strong>
      </div>

      <div>
        <span>ORDER TOTAL</span>
        <strong>{formattedTotal}</strong>
      </div>

      <div>
        <span>ORDER TYPE</span>
        <strong>{order?.orderType || "Pickup"}</strong>
      </div>
    </div>
  </>
)}

{standalone && (
  <div className="vf-standalone-heading">
    <span className="order-kicker">
      VARANASI – THE FOOD PARK
    </span>

    <h2 className="vf-waiting-title">
      Fun Games
    </h2>

    <p className="vf-order-message">
      Take a break and enjoy our food-themed mini-games!
    </p>
  </div>
)}


        <div className="vf-games-heading">
          <div>
            <span className="order-kicker">
              A LITTLE ENTERTAINMENT
            </span>

            <h3>
              {activeGame
                ? "Let's play!"
                : "Waiting? Play!"}
            </h3>

            <p>
              {standalone
                ? "Play, collect points and enjoy!"
                : activeGame
                  ? "Have fun while your order is being prepared."
                  : "Your order is being prepared. Enjoy some fun while you wait!"}
            </p>
          </div>

          <div className="vf-points-pill">
            <Sparkles size={15} />
            {progress.totalPoints} pts
          </div>
        </div>


        {activeGame ? (
          <>
            <button
              type="button"
              className="vf-back-games"
              onClick={() => setActiveGame(null)}
            >
              <ArrowLeft size={16} />
              Back to games
            </button>


            {activeGame === "quiz" && quizRound && (
              <FoodQuiz
                key={quizRound.id}
                round={quizRound}
                savedScore={savedQuizScore}
                onComplete={completeQuiz}
                onPlayAgain={startNewQuizRound}
              />
            )}


            {activeGame === "puzzle" && (
              <FoodPuzzle
                menuItems={menuItems}
                recentlyUsedThemes={progress.puzzleThemesUsed}
                recentlyUsedLayouts={progress.puzzleLayoutsUsed}
                completedPuzzleIds={progress.puzzleCompletions}
                onPuzzleStarted={markPuzzleStarted}
                onComplete={completePuzzle}
              />
            )}


            {activeGame === "spin" && (
              <SpinAndWin
                progress={progress}
                onSpin={completeSpin}
              />
            )}


            {activeGame === "rewards" && (
              <RewardsDashboard progress={progress} />
            )}
          </>
        ) : (
          <div className="vf-games-grid">

            <GameCard
              icon={Target}
              title="Quiz"
              description="Discover fun food facts"
              tint="peach"
              detail="5 fresh questions"
              onClick={openQuiz}
            />

            <GameCard
              icon={PuzzleIcon}
              title="Puzzle"
              description="Arrange the tasty tiles"
              tint="white"
              detail="A new challenge"
              onClick={() => setActiveGame("puzzle")}
            />

            <GameCard
              icon={RotateCw}
              title="Spin & Win"
              description="Try your luck on the wheel"
              tint="peach"
              detail={
                progress.spinUsed
                  ? "Spin completed"
                  : standalone
                    ? "One spin in Fun Games"
                    : "One spin per order"
              }
              onClick={() => setActiveGame("spin")}
            />

            <GameCard
              icon={Trophy}
              title="Rewards"
              description="See your points and badges"
              tint="white"
              detail={`${progress.totalPoints} points collected`}
              onClick={() => setActiveGame("rewards")}
            />

          </div>
        )}


        {storageUnavailable && (
          <p className="vf-storage-warning" role="status">
            Your browser is blocking local storage. Games still
            work, but scores may not remain after you close this page.
          </p>
        )}


        {!orderId && !standalone && (
          <p className="vf-storage-warning" role="status">
            An order reference was not available, so game progress
            will not be saved between visits.
          </p>
        )}


        <div className="vf-waiting-footer">
          <p>
            <Gift size={14} />
            Demo games only. Rewards do not affect your order or bill.
          </p>

          <div className="vf-waiting-actions">

            {!standalone && (
              <button
                type="button"
                className="vf-secondary-button"
                onClick={closeConfirmation}
              >
                Order something else
              </button>
            )}

            {standalone && (
              <button
                type="button"
                className="vf-secondary-button"
                onClick={closeConfirmation}
              >
                Close games
              </button>
            )}

            <Link
              className="vf-primary-button vf-home-button"
              to="/"
              onClick={() => {
                onBackToWebsite?.();

                if (standalone) {
                  onClose?.();
                }
              }}
            >
              Back to website
              <ArrowRight size={16} />
            </Link>

          </div>

        </div>

      </section>
    </div>
  );
}