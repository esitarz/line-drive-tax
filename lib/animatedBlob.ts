type Point = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
};

type ABBStore = {
  frames: Record<string, number>;
  sheets: Record<string, CSSStyleSheet>;
};

interface ABB {
  (options: {
    element: string;
    background?: string;
    colors?: string[];
    speed?: number;
    opacity?: number;
    saturate?: number;
    invert?: boolean;
    blur?: number;
    grain?: {
      strength?: number;
      opacity?: number;
      blur?: number;
    };
  }): () => void;
  store?: ABBStore;
}

const removeSheet = (stylesheet?: CSSStyleSheet) => {
  if (!stylesheet) {
    return;
  }

  document.adoptedStyleSheets = document.adoptedStyleSheets.filter(
    (sheet) => sheet !== stylesheet
  );
};

const updateStyle = (points: Point[]) =>
  points
    .map(
      (point) =>
        `radial-gradient(at ${point.x}% ${point.y}%, ${point.color} 0px, transparent 50%)`
    )
    .join(",");

const loadNoise = ({
  width,
  height,
  opacity = 0.5,
  baseFrequency = 2,
  numOctaves = 1,
  type = "fractalNoise",
  grayScale = true,
}: {
  width: number;
  height: number;
  opacity?: number;
  baseFrequency?: number;
  numOctaves?: number;
  type?: "fractalNoise" | "turbulence";
  grayScale?: boolean;
}) => {
  const gs =
    "%3CfeColorMatrix type='matrix' values='0.33 0.33 0.33 0 0 0.33 0.33 0.33 0 0 0.33 0.33 0.33 0 0 0 0 0 1 0' /%3E";
  return `"data:image/svg+xml,%3Csvg viewBox='0 0 ${width} ${height}' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='${type}' baseFrequency='${baseFrequency}' numOctaves='${numOctaves}' stitchTiles='stitch'/%3E${
    grayScale ? gs : ""
  }%3C/filter%3E%3Crect opacity='${opacity}' width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E"`;
};

const round = (n: number) => Math.round(n * 10) / 10;

const updatePosition = (points: Point[]): Point[] =>
  points.map((p) => {
    const { x, y, color } = p;
    let { vx, vy } = p;
    if (x + vx > 100 || x + vx < 0) vx = -vx;
    if (y + vy > 100 || y + vy < 0) vy = -vy;
    return {
      x: round(x + vx),
      y: round(y + vy),
      vx: round(vx),
      vy: round(vy),
      color,
    };
  });

const abb: ABB = ({
  element,
  background = "#a5d798",
  colors = ["red", "violet", "magenta", "cyan", "orange"],
  speed = 1,
  opacity = 1,
  saturate = 1,
  invert = false,
  blur = 0,
  grain = { strength: 1, opacity: 0.5, blur: 0 },
}: {
  element: string;
  background?: string;
  colors?: string[];
  speed?: number;
  opacity?: number;
  saturate?: number;
  invert?: boolean;
  blur?: number;
  grain?: {
    strength?: number;
    opacity?: number;
    blur?: number;
  };
}) => {
  if (!element) return () => {};

  const store =
    (abb.store ||= {
      frames: {},
      sheets: {},
    });

  if (store.frames[element]) {
    cancelAnimationFrame(store.frames[element]);
  }

  removeSheet(store.sheets[element]);

  const stylesheet = new CSSStyleSheet();
  document.adoptedStyleSheets = [...document.adoptedStyleSheets, stylesheet];
  store.sheets[element] = stylesheet;

  let points: Point[] = colors.map((color) => ({
    x: Math.random() * 100,
    y: Math.random() * 100,
    vx: (Math.random() - 0.5) * speed,
    vy: (Math.random() - 0.5) * speed,
    color,
  }));

  const fps = 60;
  const interval = 1000 / fps;
  let then: number | undefined;

  function animate(timestamp: number) {
    store.frames[element] = requestAnimationFrame(animate);
    then ??= timestamp;
    const delta = timestamp - then;
    if (delta > interval) {
      then = timestamp - (delta % interval);
      const css = `${element}::before{opacity:${opacity};background-color:${background};background-image:${updateStyle(
        points
      )};filter:saturate(${saturate}) invert(${
        invert ? 1 : 0
      }) blur(${blur}px);}`;
      if (grain.opacity && grain.strength) {
        const { width, height } = document
          .querySelector(element)!
          .getBoundingClientRect();
        const makeNoise = loadNoise({
          width,
          height,
          opacity: grain.opacity,
          baseFrequency: 2 / grain.strength,
        });
        stylesheet.replaceSync(
          `${element}::after{background:url(${makeNoise});${
            grain.blur ? `filter:blur(${grain.blur}px);` : ""
          }}${css}`
        );
      } else {
        stylesheet.replaceSync(css);
      }
      points = updatePosition(points);
    }
  }

  store.frames[element] = requestAnimationFrame(animate);

  return () => {
    if (store.frames[element]) {
      cancelAnimationFrame(store.frames[element]);
      delete store.frames[element];
    }

    removeSheet(store.sheets[element]);
    delete store.sheets[element];
  };
};

export default abb;
