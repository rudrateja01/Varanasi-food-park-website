import { useEffect, useMemo, useState } from "react";
import {
  CheckCircle2,
  RefreshCw,
} from "lucide-react";

import { createPuzzle } from "../../utils/waitingGames.js";


const SOLUTION = [
  0, 1, 2,
  3, 4, 5,
  6, 7, null,
];


function tileStyle(theme, tile) {
  if (!theme?.image || tile === null) {
    return undefined;
  }

  return {
    backgroundImage: `url("${theme.image.replace(/"/g, "\\\"")}")`,
    backgroundSize: "300% 300%",

    backgroundPosition: `${
      (tile % 3) * 50
    }% ${
      Math.floor(tile / 3) * 50
    }%`,
  };
}


export default function FoodPuzzle({
  menuItems = [],
  recentlyUsedThemes = [],
  recentlyUsedLayouts = [],
  completedPuzzleIds = [],
  onPuzzleStarted,
  onComplete,
}) {
  const [puzzle, setPuzzle] = useState(() =>
    createPuzzle(
      menuItems,
      recentlyUsedThemes,
      recentlyUsedLayouts
    )
  );

  const [moves, setMoves] = useState(0);

  const [wasAwarded, setWasAwarded] = useState(() =>
    completedPuzzleIds.includes(puzzle.id)
  );


  const solved = puzzle.board.every(
    (tile, index) => tile === SOLUTION[index]
  );


  const themeTiles = useMemo(
    () =>
      puzzle.theme?.emojiTiles || [
        "🍕",
        "🍔",
        "🍟",
        "🌮",
        "🥗",
        "🍩",
        "🥤",
        "🍦",
      ],
    [puzzle.theme]
  );


  useEffect(() => {
    onPuzzleStarted?.(
      puzzle.theme.id,
      puzzle.signature,
      puzzle.resetThemeHistory
    );
  }, [puzzle.id, onPuzzleStarted]);


  const adjacent = (index) => {
    const row = Math.floor(index / 3);
    const column = index % 3;

    return [
      ...(row > 0 ? [index - 3] : []),
      ...(row < 2 ? [index + 3] : []),
      ...(column > 0 ? [index - 1] : []),
      ...(column < 2 ? [index + 1] : []),
    ];
  };


  const restart = () => {
    const themeHistory = puzzle.resetThemeHistory
      ? [puzzle.theme.id]
      : [
          ...new Set([
            ...recentlyUsedThemes,
            puzzle.theme.id,
          ]),
        ];

    const layoutHistory = [
      ...new Set([
        ...recentlyUsedLayouts,
        puzzle.signature,
      ]),
    ];


    const next = createPuzzle(
      menuItems,
      themeHistory,
      layoutHistory
    );

    setPuzzle(next);
    setMoves(0);

    setWasAwarded(
      completedPuzzleIds.includes(next.id)
    );
  };


  const moveTile = (index) => {
    const blank = puzzle.board.indexOf(null);

    if (!adjacent(blank).includes(index) || solved) {
      return;
    }

    const nextBoard = [...puzzle.board];

    [
      nextBoard[blank],
      nextBoard[index],
    ] = [
      nextBoard[index],
      nextBoard[blank],
    ];

    setPuzzle((current) => ({
      ...current,
      board: nextBoard,
    }));

    setMoves((current) => current + 1);


    if (
      nextBoard.every(
        (tile, tileIndex) =>
          tile === SOLUTION[tileIndex]
      )
    ) {
      setWasAwarded(true);

      if (!completedPuzzleIds.includes(puzzle.id)) {
        onComplete?.(puzzle.id);
      }
    }
  };


  return (
    <div className="vf-game-panel vf-puzzle-panel">

      <div className="vf-puzzle-instructions">

        <div>
          <span className="vf-eyebrow">
            FOODIE PUZZLE
          </span>

          <h3>Put the pieces together</h3>

          <p>
            Move a tile into the empty space and
            rebuild the picture. Every new round
            gets a fresh shuffle.
          </p>

          <strong className="vf-puzzle-theme-name">
            Today's theme: {puzzle.theme?.name || "Food favourites"}
          </strong>
        </div>


        <div className="vf-puzzle-moves">
          <strong>{moves}</strong>
          <small>MOVES</small>
        </div>

      </div>


      {puzzle.theme?.image ? (
        <div
          className="vf-puzzle-preview"
          style={{
            backgroundImage: `url("${puzzle.theme.image.replace(/"/g, "\\\"")}")`,
          }}
          aria-label={`Completed ${puzzle.theme.name} picture preview`}
        />
      ) : (
        <div
          className="vf-puzzle-preview vf-puzzle-emoji-preview"
          aria-label={`${puzzle.theme?.name || "Food"} picture guide`}
        >
          {themeTiles.map((emoji, index) => (
            <span key={`${emoji}-${index}`}>
              {emoji}
            </span>
          ))}
          <span className="vf-preview-empty" aria-hidden="true" />
        </div>
      )}


      <div
        className={`vf-puzzle-board${
          puzzle.theme?.image
            ? " has-image"
            : " has-emoji"
        }`}
        aria-label="Sliding food puzzle"
      >

        {puzzle.board.map((tile, index) => (
          <button
            key={index}
            type="button"

            className={`vf-puzzle-tile${
              tile === null ? " is-empty" : ""
            }`}

            style={tileStyle(puzzle.theme, tile)}

            onClick={() => moveTile(index)}

            disabled={tile === null || solved}

            aria-label={
              tile === null
                ? "Empty space"
                : `Move tile ${tile + 1}`
            }
          >
            {tile !== null && (
              puzzle.theme?.image
                ? (
                    <span className="vf-puzzle-tile-number">
                      {tile + 1}
                    </span>
                  )
                : (
                    <span>{themeTiles[tile]}</span>
                  )
            )}
          </button>
        ))}

      </div>


      {solved ? (
        <div
          className="vf-answer-feedback correct"
          role="status"
        >

          <strong>
            <CheckCircle2 size={17} />
            Puzzle solved!
          </strong>

          <span>
            {wasAwarded
              ? "Great job! Your 15 demo points have been recorded."
              : "Great job! Your puzzle reward has been recorded."
            }
          </span>

          <button
            type="button"
            className="vf-primary-button"
            onClick={restart}
          >
            <RefreshCw size={16} />
            Try a different puzzle
          </button>

        </div>
      ) : (
        <button
          type="button"
          className="vf-secondary-button vf-restart-button"
          onClick={restart}
        >
          <RefreshCw size={15} />
          New puzzle
        </button>
      )}

    </div>
  );
}