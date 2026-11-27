import { useState } from "react";
import {
  ArrowRight,
  Check,
  RefreshCw,
  Trophy,
} from "lucide-react";


export default function FoodQuiz({
  round,
  savedScore,
  onComplete,
  onPlayAgain,
}) {
  const [questionIndex, setQuestionIndex] = useState(0);

  const [selectedOption, setSelectedOption] =
    useState(null);

  const [score, setScore] = useState(savedScore ?? 0);

  const [finished, setFinished] = useState(
    savedScore !== null && savedScore !== undefined
  );


  if (!round?.questions?.length) {
    return (
      <div className="vf-game-panel">
        <p>
          We couldn't load this quiz round.
          Please go back and start again.
        </p>
      </div>
    );
  }


  const question = round.questions[questionIndex];

  const isCorrect = Boolean(selectedOption?.correct);


  const chooseAnswer = (option) => {
    if (selectedOption || finished) return;

    setSelectedOption(option);

    if (option.correct) {
      setScore((current) => current + 10);
    }
  };


  const nextQuestion = () => {
    if (questionIndex === round.questions.length - 1) {
      setFinished(true);

      onComplete?.(
        round.id,
        score,
        round.questionIds
      );

      return;
    }

    setQuestionIndex((current) => current + 1);
    setSelectedOption(null);
  };


  if (finished) {
    return (
      <div className="vf-game-panel vf-quiz-result">

        <span className="vf-result-icon">
          <Trophy size={34} />
        </span>

        <span className="vf-eyebrow">
          QUIZ COMPLETED
        </span>

        <h3>You scored {score} out of 50!</h3>

        <p>
          {score >= 40
            ? "Brilliant! You're a true food explorer."
            : score >= 20
              ? "Nice work! Your food knowledge is growing."
              : "Good try! There are plenty more tasty facts to discover."
          }
        </p>

        <div className="vf-quiz-result-meta">
          <span>
            {round.questions.length} questions
          </span>

          <span>
            {round.questions
              .map((item) => item.category)
              .filter(
                (item, index, all) =>
                  all.indexOf(item) === index
              )
              .join(" · ")
            }
          </span>
        </div>

        <button
          type="button"
          className="vf-primary-button"
          onClick={onPlayAgain}
        >
          <RefreshCw size={16} />
          New quiz round
        </button>

      </div>
    );
  }


  return (
    <div className="vf-game-panel vf-quiz-panel">

      <div className="vf-game-progress-row">
        <span>
          QUESTION {questionIndex + 1} OF {round.questions.length}
        </span>

        <strong>{score} points</strong>
      </div>


      <div className="vf-progress-track">
        <span
          style={{
            width: `${
              ((questionIndex + 1) / round.questions.length) * 100
            }%`,
          }}
        />
      </div>


      <div className="vf-question-meta">
        <span>{question.category}</span>
        <span>{question.difficulty}</span>
      </div>


      <h3 className="vf-game-question">
        {question.question}
      </h3>


      <div className="vf-quiz-options">

        {question.options.map((option, index) => {
          const chosen = selectedOption === option;

          const correct =
            selectedOption !== null && option.correct;

          return (
            <button
              key={`${question.id}-${option.text}`}
              type="button"

              className={
                `vf-quiz-option${
                  chosen ? " is-selected" : ""
                }${
                  correct ? " is-correct" : ""
                }${
                  chosen && !isCorrect ? " is-wrong" : ""
                }`
              }

              onClick={() => chooseAnswer(option)}

              disabled={selectedOption !== null}
            >
              <span>
                {String.fromCharCode(65 + index)}
              </span>

              {option.text}

              {correct && <Check size={17} />}
            </button>
          );
        })}

      </div>


      {selectedOption && (
        <div
          className={`vf-answer-feedback${
            isCorrect ? " correct" : " incorrect"
          }`}
          role="status"
        >

          <strong>
            {isCorrect
              ? "Correct! +10 points"
              : "Not quite!"
            }
          </strong>

          <span>{question.explanation}</span>

          <button
            type="button"
            className="vf-primary-button"
            onClick={nextQuestion}
          >
            {questionIndex === round.questions.length - 1
              ? "See my score"
              : "Next question"
            }

            <ArrowRight size={16} />
          </button>

        </div>
      )}

    </div>
  );
}