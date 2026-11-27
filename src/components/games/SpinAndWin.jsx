import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import {
  BadgeCheck,
  Gift,
  RotateCw,
  Sparkles,
} from "lucide-react";

import {
  SPIN_REWARDS,
  chooseWeightedReward,
  getWheelSegments,
  getWheelTargetRotation,
} from "../../utils/waitingGames.js";


const CX = 180;
const CY = 180;
const RADIUS = 168;


function pointAt(angle) {
  const radians = (angle * Math.PI) / 180;

  return {
    x: CX + RADIUS * Math.cos(radians),
    y: CY + RADIUS * Math.sin(radians),
  };
}


function slicePath(startAngle, endAngle) {
  const start = pointAt(startAngle);
  const end = pointAt(endAngle);

  const largeArc =
    endAngle - startAngle > 180 ? 1 : 0;

  return `M ${CX} ${CY} L ${start.x} ${start.y} A ${RADIUS} ${RADIUS} 0 ${largeArc} 1 ${end.x} ${end.y} Z`;
}


function labelTransform(angle, x, y) {
  let rotation = angle + 90;

  const normalised =
    ((rotation % 360) + 360) % 360;

  if (normalised > 90 && normalised < 270) {
    rotation += 180;
  }

  return `rotate(${rotation} ${x} ${y})`;
}


export default function SpinAndWin({
  progress,
  onSpin,
}) {
  const [rotation, setRotation] = useState(() =>
    progress.spinResult
      ? getWheelTargetRotation(
          progress.spinResult,
          0,
          SPIN_REWARDS
        )
      : 0
  );

  const [spinning, setSpinning] = useState(false);

  const [showResult, setShowResult] = useState(
    Boolean(progress.spinUsed)
  );

  const timerRef = useRef(null);

  const spinLockRef = useRef(false);


  const segments = useMemo(
    () => getWheelSegments(SPIN_REWARDS),
    []
  );


  const prize = SPIN_REWARDS.find(
    (item) => item.id === progress.spinResult
  );


  useEffect(() => {
    return () => {
      window.clearTimeout(timerRef.current);
    };
  }, []);


 const spin = () => {
  if (progress.spinUsed || spinLockRef.current) {
    return;
  }

  spinLockRef.current = true;

  try {
    const selected = chooseWeightedReward(SPIN_REWARDS);

    const targetRotation = getWheelTargetRotation(
      selected.id,
      rotation,
      SPIN_REWARDS
    );

    console.log("Selected reward:", selected);
    console.log("Current rotation:", rotation);
    console.log("Target rotation:", targetRotation);

    setShowResult(false);
    setSpinning(true);
    setRotation(targetRotation);

    onSpin?.(selected);

    timerRef.current = window.setTimeout(() => {
      setSpinning(false);
      setShowResult(true);
    }, 4700);

  } catch (error) {
    console.error("Spin failed:", error);
    spinLockRef.current = false;
    setSpinning(false);
  }
};


  return (
    <div className="vf-game-panel vf-spin-panel">

      <span className="vf-eyebrow">
        A LITTLE LUCK
      </span>

      <h3>Give the wheel a spin!</h3>

      <p>
  Ten equal-sized sections, exciting rewards,
  and one spin for this order.
</p>


      <div className="vf-wheel-stage">

        <span
          className="vf-wheel-pointer"
          aria-hidden="true"
        />

        <div
          className={`vf-spin-wheel${
            spinning ? " is-spinning" : ""
          }`}
          style={{
            transform: `rotate(${rotation}deg)`,
          }}
        >

          <svg
            viewBox="0 0 360 360"
            role="img"
            aria-label="Spin wheel with ten equal-sized reward sections"
          >

            {segments.map((segment) => {
              const start = segment.startAngle;

              const end =
                start + segment.angle;

              const labelRadius = 120;

              const labelRadians =
                (segment.centerAngle * Math.PI) / 180;

              const labelX =
                CX + labelRadius * Math.cos(labelRadians);

              const labelY =
                CY + labelRadius * Math.sin(labelRadians);


              return (
                <g key={segment.id}>

                  <path
                    d={slicePath(start, end)}
                    fill={segment.color}
                    stroke="#fff9ef"
                    strokeWidth="2"
                  />

                  <text
                    x={labelX}
                    y={labelY}
                    transform={labelTransform(
                      segment.centerAngle,
                      labelX,
                      labelY
                    )}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="vf-wheel-svg-label"
                  >
                    {segment.shortLabel}
                  </text>

                </g>
              );
            })}


            <circle
              cx={CX}
              cy={CY}
              r="31"
              fill="#203d30"
              stroke="#fff9ef"
              strokeWidth="5"
            />

            <text
              x={CX}
              y={CY + 1}
              textAnchor="middle"
              dominantBaseline="middle"
              className="vf-wheel-centre-label"
            >
              VF
            </text>

          </svg>

        </div>

      </div>


      {showResult && progress.spinUsed && (
        <div
          className="vf-spin-result"
          role="status"
          aria-live="polite"
        >

          <strong>
            {prize
              ? `You landed on: ${prize.label}`
              : "Your spin has already been used for this order."
            }
          </strong>


          {prize?.points > 0 && (
            <span>
              {prize.points} demo points have been
              added to your rewards.
            </span>
          )}


          {prize?.kind === "demo-reward" && (
            <span>
              This is a demonstration reward only.
              It does not create a coupon or change
              your order total.
            </span>
          )}


          {prize?.kind === "none" && (
            <span>
              No points this time. Thanks for playing!
            </span>
          )}

        </div>
      )}


      {progress.spinUsed ? (
        <div className="vf-spin-locked">
          <BadgeCheck size={17} />
          Your one spin for this order has been used.
        </div>
      ) : (
        <button
          type="button"
          className="vf-primary-button vf-spin-button"
          onClick={spin}
          disabled={spinning}
        >
          {spinning
            ? <Sparkles size={17} />
            : <RotateCw size={17} />
          }

          {spinning ? "Spinning..." : "SPIN NOW"}
        </button>
      )}


      <div className="vf-spin-legend">
        <span>
          <Gift size={14} />
          Food rewards are demo-only
        </span>

        {/* <span>
          Points are added to your demo balance
        </span> */}
      </div>


      {/* <p className="vf-game-note">
  Every section has an equal visual size, but
  each reward has its own winning probability.
  Demo rewards cannot currently be redeemed.
</p> */}

    </div>
  );
}