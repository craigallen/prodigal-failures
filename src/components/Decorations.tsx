// Decorative Memphis-style geometric shapes used to sprinkle 90s confetti
// around the layout. Purely visual — always aria-hidden, never essential to
// content. Each accepts a className so callers can size/position/rotate them.

type ShapeProps = { className?: string };

export function Squiggle({ className = "" }: ShapeProps) {
  return (
    <svg
      viewBox="0 0 120 28"
      className={className}
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M2 14C12 2 22 2 32 14s20 12 30 0 20-12 30 0 20 12 26 6"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function ZigZag({ className = "" }: ShapeProps) {
  return (
    <svg viewBox="0 0 120 24" className={className} fill="none" aria-hidden="true">
      <path
        d="M2 22 14 4l12 18L38 4l12 18L62 4l12 18L86 4l12 18L110 4l8 12"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Dots({ className = "" }: ShapeProps) {
  return (
    <svg viewBox="0 0 80 80" className={className} aria-hidden="true">
      {[10, 30, 50, 70].map((y) =>
        [10, 30, 50, 70].map((x) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r="5" fill="currentColor" />
        ))
      )}
    </svg>
  );
}

export function Triangle({ className = "" }: ShapeProps) {
  return (
    <svg viewBox="0 0 60 54" className={className} aria-hidden="true">
      <path
        d="M30 2 58 52H2z"
        fill="currentColor"
        stroke="#181527"
        strokeWidth="3"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Star({ className = "" }: ShapeProps) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <path
        d="M32 3 39 24h22l-18 13 7 21-18-13-18 13 7-21L4 24h22z"
        fill="currentColor"
        stroke="#181527"
        strokeWidth="3"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Blob({ className = "" }: ShapeProps) {
  return (
    <svg viewBox="0 0 80 80" className={className} aria-hidden="true">
      <path
        d="M40 4c14 0 30 7 33 22s-8 28-21 35-33 9-43-3S2 30 13 18 26 4 40 4z"
        fill="currentColor"
        stroke="#181527"
        strokeWidth="3"
      />
    </svg>
  );
}
