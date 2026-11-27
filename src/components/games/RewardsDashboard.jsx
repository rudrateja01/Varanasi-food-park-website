import {
  CheckCircle2,
  Gift,
  Medal,
  Puzzle,
  Sparkles,
  Star,
  Target,
  Trophy,
} from "lucide-react";


export default function RewardsDashboard({ progress }) {
  const quizRounds = progress.quizScores.length;


  const bestQuizScore = quizRounds
    ? Math.max(
        ...progress.quizScores.map(
          (entry) => entry.score
        )
      )
    : 0;


  const demoRewards =
    progress.spinResult &&
    [
      "free-dessert",
      "free-beverage",
      "extra-topping",
    ].includes(progress.spinResult)
      ? [
          {
            "free-dessert": "Free Dessert – Demo Reward",
            "free-beverage": "Free Beverage – Demo Reward",
            "extra-topping": "Extra Topping – Demo Reward",
          }[progress.spinResult],
        ]
      : [];


  const badges = [
    {
      id: "food-explorer",
      label: "Food Explorer",
      description: "Complete your first quiz",
      earned: quizRounds >= 1,
      icon: Target,
    },

    {
      id: "food-genius",
      label: "Food Genius",
      description: "Score 40 or more in a quiz",
      earned: bestQuizScore >= 40,
      icon: Star,
    },

    {
      id: "puzzle-master",
      label: "Puzzle Master",
      description: "Complete a food puzzle",
      earned: progress.puzzleCompletions.length > 0,
      icon: Puzzle,
    },

    {
      id: "lucky-spinner",
      label: "Lucky Spinner",
      description: "Use Spin & Win once",
      earned: progress.spinUsed,
      icon: Medal,
    },

    {
      id: "quiz-champion",
      label: "Quiz Champion",
      description: "Complete five quiz rounds",
      earned: quizRounds >= 5,
      icon: Trophy,
    },
  ];


  return (
    <div className="vf-game-panel vf-rewards-panel">

      <div className="vf-rewards-total">

        <span className="vf-rewards-total-icon">
          <Sparkles size={25} />
        </span>

        <div>
          <span className="vf-eyebrow">
            YOUR DEMO BALANCE
          </span>

          <strong>
            {progress.totalPoints}
            <small> points</small>
          </strong>
        </div>

      </div>


      <div className="vf-points-breakdown">

        <div>
          <span>Quiz points</span>
          <strong>{progress.quizPoints}</strong>
        </div>

        <div>
          <span>Puzzle points</span>
          <strong>{progress.puzzlePoints}</strong>
        </div>

        <div>
          <span>Spin points</span>
          <strong>{progress.spinPoints}</strong>
        </div>

      </div>


      <div className="vf-reward-section-heading">
        <h3>Your foodie achievements</h3>

        <span>
          {badges.filter((badge) => badge.earned).length}
          /{badges.length} unlocked
        </span>
      </div>


      <div className="vf-badges-grid">

        {badges.map(
          ({
            id,
            label,
            description,
            earned,
            icon: Icon,
          }) => (
            <div
              className={`vf-badge-card${
                earned ? " is-earned" : ""
              }`}
              key={id}
            >

              <span>
                <Icon size={21} />
              </span>

              <div>
                <strong>{label}</strong>
                <small>{description}</small>
              </div>

              {earned && (
                <CheckCircle2
                  size={17}
                  className="vf-earned-check"
                />
              )}

            </div>
          )
        )}

      </div>


      <div className="vf-reward-earned-list">

        <h4>
          <Gift size={17} />
          Spinner demo rewards
        </h4>

        {demoRewards.length ? (
          demoRewards.map((reward) => (
            <p key={reward}>{reward}</p>
          ))
        ) : (
          <p>
            No food reward won yet. Try your one
            Spin & Win chance for this order.
          </p>
        )}

      </div>


      {/* <div className="vf-reward-disclaimer">
        <Gift size={18} />

        <p>
          These are demonstration rewards and cannot
          currently be redeemed for discounts or free
          food. They do not change your bill.
        </p>
      </div> */}

    </div>
  );
}