import { FOOD_QUIZ_QUESTIONS } from "../data/foodQuizQuestions.js";


/* --------------------------------
   SPIN & WIN REWARD CONFIGURATION
--------------------------------- */


export const SPIN_REWARDS = [
  {
    id: "points-5",
    label: "5 Bonus Points",
    shortLabel: "5 PTS",
    points: 5,
    probability: 20,
    kind: "points",
    color: "#f2a66f",
  },
  {
    id: "points-10",
    label: "10 Bonus Points",
    shortLabel: "10 PTS",
    points: 10,
    probability: 18,
    kind: "points",
    color: "#e6c76d",
  },
  {
    id: "better-luck",
    label: "Better Luck Next Time",
    shortLabel: "TRY AGAIN",
    points: 0,
    probability: 4,
    kind: "none",
    color: "#b7aaa0",
  },
  {
    id: "points-15",
    label: "15 Bonus Points",
    shortLabel: "15 PTS",
    points: 15,
    probability: 15,
    kind: "points",
    color: "#8eb7a1",
  },
  {
    id: "free-dessert",
    label: "Free Dessert – Demo Reward",
    shortLabel: "DESSERT",
    points: 0,
    probability: 5,
    kind: "demo-reward",
    color: "#e5a9bd",
  },
  {
    id: "free-beverage",
    label: "Free Beverage – Demo Reward",
    shortLabel: "DRINK",
    points: 0,
    probability: 4,
    kind: "demo-reward",
    color: "#8fc7c5",
  },
  {
    id: "better-luck-2",
    label: "Better Luck Next Time",
    shortLabel: "TRY AGAIN",
    points: 0,
    probability: 4,
    kind: "none",
    color: "#b7aaa0",
  },
  {
    id: "points-20",
    label: "20 Bonus Points",
    shortLabel: "20 PTS",
    points: 20,
    probability: 12,
    kind: "points",
    color: "#88a9ce",
  },
  {
    id: "free-ice-cream",
    label: "Free Ice Cream – Demo Reward",
    shortLabel: "ICE CREAM",
    points: 0,
    probability: 4,
    kind: "demo-reward",
    color: "#b6b778",
  },
  {
    id: "better-luck-3",
    label: "Better Luck Next Time",
    shortLabel: "TRY AGAIN",
    points: 0,
    probability: 14,
    kind: "none",
    color: "#b7aaa0",
  },
];



/* --------------------------------
   DEFAULT GAME PROGRESS
--------------------------------- */

export const DEFAULT_PROGRESS = {
  version: 2,

  totalPoints: 0,

  quizPoints: 0,
  puzzlePoints: 0,
  spinPoints: 0,

  quizQuestionHistory: [],
  quizScores: [],

  puzzleThemesUsed: [],
  puzzleLayoutsUsed: [],
  puzzleCompletions: [],

  spinUsed: false,
  spinResult: null,
};


/* --------------------------------
   PUZZLE FALLBACK THEMES
--------------------------------- */

const PUZZLE_FALLBACK_THEMES = [
  {
    id: "emoji-south-breakfast",
    name: "South Indian Breakfast",
    emojiTiles: ["🥞", "🫓", "🥥", "🍅", "🫘", "🌶️", "🍃", "🍽️"],
  },
  {
    id: "emoji-street-food",
    name: "Street Food Fiesta",
    emojiTiles: ["🥙", "🥔", "🧅", "🍋", "🌶️", "🥣", "🌿", "🍽️"],
  },
  {
    id: "emoji-sweet-treats",
    name: "Sweet Treats",
    emojiTiles: ["🍩", "🍮", "🍬", "🍫", "🍨", "🍓", "🥛", "🍽️"],
  },
  {
    id: "emoji-pizza-night",
    name: "Pizza Night",
    emojiTiles: ["🍕", "🧀", "🍅", "🫑", "🫒", "🍄", "🌿", "🍽️"],
  },
  {
    id: "emoji-biryani-feast",
    name: "Biryani Feast",
    emojiTiles: ["🍚", "🍗", "🥕", "🧅", "🌶️", "🌿", "🍋", "🍽️"],
  },
  {
    id: "emoji-cafe-favourites",
    name: "Cafe Favourites",
    emojiTiles: ["🥪", "🥐", "☕", "🧁", "🍪", "🧀", "🍓", "🍽️"],
  },
  {
    id: "emoji-chinese-treats",
    name: "Indo-Chinese Treats",
    emojiTiles: ["🍜", "🥢", "🥕", "🫑", "🌽", "🍄", "🌶️", "🍽️"],
  },
  {
    id: "emoji-summer-coolers",
    name: "Summer Coolers",
    emojiTiles: ["🥤", "🍋", "🧊", "🍉", "🍊", "🌿", "🍓", "🍽️"],
  },
  {
    id: "emoji-snack-time",
    name: "Snack Time",
    emojiTiles: ["🍟", "🍔", "🌭", "🍿", "🥨", "🥫", "🥒", "🍽️"],
  },
  {
    id: "emoji-pasta-party",
    name: "Pasta Party",
    emojiTiles: ["🍝", "🍅", "🧀", "🌿", "🍄", "🫒", "🧄", "🍽️"],
  },
];


function safeArray(value) {
  return Array.isArray(value) ? value : [];
}


function safeNumber(value) {
  const number = Number(value);

  return Number.isFinite(number) && number >= 0
    ? number
    : 0;
}


/* --------------------------------
   ORDER-SPECIFIC STORAGE
--------------------------------- */

export function getStorageKey(orderId) {
  return orderId
    ? `vf-games-${encodeURIComponent(String(orderId))}`
    : null;
}


export function readProgress(orderId) {
  const key = getStorageKey(orderId);

  if (!key || typeof window === "undefined") {
    return { ...DEFAULT_PROGRESS };
  }

  try {
    const saved = JSON.parse(
      window.localStorage.getItem(key) || "null"
    );

    if (!saved || typeof saved !== "object") {
      return { ...DEFAULT_PROGRESS };
    }

    const questionIds = new Set(
      FOOD_QUIZ_QUESTIONS.map((question) => question.id)
    );

    const rewardIds = new Set(
      SPIN_REWARDS.map((reward) => reward.id)
    );


    const quizScores = safeArray(saved.quizScores)
      .filter(
        (record) =>
          record && typeof record.id === "string"
      )
      .map((record) => ({
        id: record.id,

        score: Math.min(
          50,
          safeNumber(record.score)
        ),

        questionIds: safeArray(record.questionIds)
          .filter((id) => questionIds.has(id)),

        completedAt:
          typeof record.completedAt === "string"
            ? record.completedAt
            : null,
      }));


    const result = rewardIds.has(saved.spinResult)
      ? saved.spinResult
      : null;


    const progress = {
      version: 2,

      quizPoints: safeNumber(saved.quizPoints),
      puzzlePoints: safeNumber(saved.puzzlePoints),
      spinPoints: safeNumber(saved.spinPoints),

      quizQuestionHistory: [
        ...new Set(
          safeArray(saved.quizQuestionHistory)
            .filter((id) => questionIds.has(id))
        ),
      ],

      quizScores,

      puzzleThemesUsed: [
        ...new Set(
          safeArray(saved.puzzleThemesUsed)
            .filter((id) => typeof id === "string")
        ),
      ],

      puzzleLayoutsUsed: [
        ...new Set(
          safeArray(saved.puzzleLayoutsUsed)
            .filter(
              (signature) => typeof signature === "string"
            )
        ),
      ].slice(-250),

      puzzleCompletions: [
        ...new Set(
          safeArray(saved.puzzleCompletions)
            .filter((id) => typeof id === "string")
        ),
      ],

      spinUsed: Boolean(saved.spinUsed || result),

      spinResult: result,
    };


    progress.totalPoints =
      progress.quizPoints +
      progress.puzzlePoints +
      progress.spinPoints;

    return progress;

  } catch {
    return { ...DEFAULT_PROGRESS };
  }
}


export function writeProgress(orderId, progress) {
  const key = getStorageKey(orderId);

  if (!key || typeof window === "undefined") {
    return false;
  }

  try {
    const safeProgress = {
      ...progress,

      version: 2,

      totalPoints:
        safeNumber(progress.quizPoints) +
        safeNumber(progress.puzzlePoints) +
        safeNumber(progress.spinPoints),
    };

    window.localStorage.setItem(
      key,
      JSON.stringify(safeProgress)
    );

    return true;

  } catch {
    return false;
  }
}


/* --------------------------------
   RANDOMIZATION HELPERS
--------------------------------- */

export function createId(prefix = "game") {
  const randomId =
    typeof crypto !== "undefined" &&
    typeof crypto.randomUUID === "function"
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;

  return `${prefix}-${randomId}`;
}


export function shuffleArray(items) {
  const result = [...items];

  for (
    let index = result.length - 1;
    index > 0;
    index--
  ) {
    const swapIndex = Math.floor(
      Math.random() * (index + 1)
    );

    [
      result[index],
      result[swapIndex],
    ] = [
      result[swapIndex],
      result[index],
    ];
  }

  return result;
}


/* --------------------------------
   QUIZ ROUND GENERATOR
--------------------------------- */

export function createQuizRound(playedQuestionIds = []) {
  const history = new Set(playedQuestionIds);

  const available = shuffleArray(
    FOOD_QUIZ_QUESTIONS.filter(
      (question) => !history.has(question.id)
    )
  );


  const pickVaried = (pool, count) => {
    const remaining = shuffleArray(pool);
    const selected = [];

    const difficultyOrder = [
      "Easy",
      "Medium",
      "Easy",
      "Challenging",
      "Medium",
    ];


    for (
      const difficulty of difficultyOrder.slice(0, count)
    ) {
      if (!remaining.length) break;

      let candidates = remaining.filter(
        (question) =>
          question.difficulty === difficulty &&
          !selected.some(
            (item) => item.category === question.category
          )
      );


      if (!candidates.length) {
        candidates = remaining.filter(
          (question) =>
            question.difficulty === difficulty
        );
      }


      if (!candidates.length) {
        candidates = remaining;
      }


      const chosen = candidates[
        Math.floor(Math.random() * candidates.length)
      ];

      selected.push(chosen);

      remaining.splice(
        remaining.findIndex(
          (question) => question.id === chosen.id
        ),
        1
      );
    }

    return selected;
  };


  let selected = pickVaried(available, 5);


  // If fewer than five unused questions remain,
  // use the unused questions first and refill
  // without duplicating any question in this round.
  if (selected.length < 5) {
    const selectedIds = new Set(
      selected.map((question) => question.id)
    );

    const refill = FOOD_QUIZ_QUESTIONS.filter(
      (question) => !selectedIds.has(question.id)
    );

    selected = [
      ...selected,
      ...pickVaried(
        refill,
        5 - selected.length
      ),
    ];
  }


  const questions = selected.map((question) => {
    const options = shuffleArray(
      question.options.map((text, index) => ({
        text,
        correct: index === question.answer,
      }))
    );

    return {
      id: question.id,
      category: question.category,
      difficulty: question.difficulty,
      question: question.question,
      options,
      explanation: question.explanation,
    };
  });


  return {
    id: createId("quiz-round"),

    questions,

    questionIds: questions.map(
      (question) => question.id
    ),
  };
}


/* --------------------------------
   PUZZLE THEME GENERATOR
--------------------------------- */

function puzzleThemes(menuItems = []) {
  const imageThemes = [];

  const seenImages = new Set();


  safeArray(menuItems).forEach((item, index) => {
    const image =
      typeof item?.image === "string"
        ? item.image.trim()
        : "";

    if (!image || seenImages.has(image)) {
      return;
    }

    seenImages.add(image);

    const stableId =
      item.id ?? item.name ?? index;


    imageThemes.push({
      id: `menu-${String(stableId)
        .toLowerCase()
        .replace(/[^a-z0-9_-]+/g, "-")}`,

      name: item.name || "Restaurant Favourite",

      image,

      emojiTiles: null,
    });
  });


  return [
    ...imageThemes,
    ...PUZZLE_FALLBACK_THEMES,
  ];
}


/* --------------------------------
   SOLVABLE PUZZLE GENERATOR
--------------------------------- */

export function createPuzzle(
  menuItems = [],
  recentlyUsedThemes = [],
  recentlyUsedLayouts = []
) {
  const themes = puzzleThemes(menuItems);

  const used = new Set(recentlyUsedThemes);

  const usedLayouts = new Set(
    Array.isArray(recentlyUsedLayouts)
      ? recentlyUsedLayouts
      : recentlyUsedLayouts
        ? [recentlyUsedLayouts]
        : []
  );


  let available = themes.filter(
    (theme) => !used.has(theme.id)
  );


  const resetThemeHistory =
    available.length === 0;


  if (resetThemeHistory) {
    const lastTheme =
      recentlyUsedThemes[recentlyUsedThemes.length - 1];

    available = themes.filter(
      (theme) => theme.id !== lastTheme
    );

    if (!available.length) {
      available = themes;
    }
  }


  const theme =
    shuffleArray(available)[0] ||
    PUZZLE_FALLBACK_THEMES[0];


  const solution = [
    0, 1, 2,
    3, 4, 5,
    6, 7, null,
  ];


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


  const manhattan = (board) =>
    board.reduce((sum, tile, index) => {
      if (tile === null) return sum;

      const targetRow = Math.floor(tile / 3);
      const targetColumn = tile % 3;

      return (
        sum +
        Math.abs(Math.floor(index / 3) - targetRow) +
        Math.abs((index % 3) - targetColumn)
      );
    }, 0);


  let board = [...solution];

  let signature = "";


  // Scramble using legal moves from the solved board.
  // This guarantees the resulting arrangement is solvable.
  for (let attempt = 0; attempt < 30; attempt++) {
    board = [...solution];

    let blank = 8;
    let previousBlank = -1;


    for (let move = 0; move < 90; move++) {
      const choices = adjacent(blank).filter(
        (index) => index !== previousBlank
      );

      const next = choices[
        Math.floor(Math.random() * choices.length)
      ];


      [
        board[blank],
        board[next],
      ] = [
        board[next],
        board[blank],
      ];


      previousBlank = blank;
      blank = next;
    }


    signature = board.join(",");


    // Retry weak/easy layouts and recently used layouts.
    if (
      manhattan(board) >= 12 &&
      !usedLayouts.has(signature) &&
      signature !== solution.join(",")
    ) {
      break;
    }
  }


  return {
    id: createId("puzzle"),
    theme,
    board,
    signature,
    resetThemeHistory,
  };
}


/* --------------------------------
   WEIGHTED SPIN REWARD
--------------------------------- */

export function chooseWeightedReward(
  rewards = SPIN_REWARDS
) {
  const totalWeight = rewards.reduce(
    (sum, reward) => sum + reward.probability,
    0
  );


  if (totalWeight !== 100) {
    throw new Error(
      `Spinner probabilities must total 100; received ${totalWeight}.`
    );
  }


  let roll = Math.random() * totalWeight;


  for (const reward of rewards) {
    roll -= reward.probability;

    if (roll < 0) {
      return reward;
    }
  }


  return rewards[rewards.length - 1];
}


/* --------------------------------
   SPIN WHEEL SEGMENTS
--------------------------------- */


/* --------------------------------
   SPIN WHEEL SEGMENTS
--------------------------------- */

export function getWheelSegments(
  rewards = SPIN_REWARDS
) {
  const equalAngle = 360 / rewards.length;

  let cursor = -90;

  return rewards.map((reward) => {
    const segment = {
      ...reward,
      startAngle: cursor,
      angle: equalAngle,
      centerAngle: cursor + equalAngle / 2,
    };

    cursor += equalAngle;

    return segment;
  });
}



/* --------------------------------
   SPINNER POINTER ALIGNMENT
--------------------------------- */

export function getWheelTargetRotation(
  rewardId,
  currentRotation = 0,
  rewards = SPIN_REWARDS
) {
  const segments = getWheelSegments(rewards);

  const selected = segments.find(
    (segment) => segment.id === rewardId
  );


  if (!selected) {
    return currentRotation + 6 * 360;
  }


  const alignment =
    (
      (-90 - selected.centerAngle) % 360 + 360
    ) % 360;


  const currentNormalized =
    ((currentRotation % 360) + 360) % 360;


  const extra =
    (
      (alignment - currentNormalized) % 360 + 360
    ) % 360;


  return currentRotation + 6 * 360 + extra;
}