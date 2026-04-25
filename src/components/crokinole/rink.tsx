type RinkProps = {
  className?: string;
  title?: string;
};

/**
 * Stylized top-down crokinole board: outer ring (5), middle ring (10), inner
 * ring (15) with eight pegs, and a 20-hole centre featuring a maple leaf.
 */
export default function Rink({ className, title }: RinkProps) {
  const pegs = Array.from({ length: 8 }, (_, i) => {
    const angle = (i / 8) * Math.PI * 2;
    return { x: 100 + Math.cos(angle) * 32, y: 100 + Math.sin(angle) * 32 };
  });

  return (
    <svg
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role={title ? "img" : "presentation"}
      aria-label={title}
      aria-hidden={title ? undefined : true}
    >
      {title ? <title>{title}</title> : null}
      <circle cx="100" cy="100" r="98" fill="#f5e7c5" stroke="#7c5d3a" strokeWidth="2" />
      <circle cx="100" cy="100" r="74" fill="none" stroke="#7c5d3a" strokeWidth="1.5" />
      <circle cx="100" cy="100" r="52" fill="none" stroke="#7c5d3a" strokeWidth="1.5" />
      <circle cx="100" cy="100" r="32" fill="#fff8ec" stroke="#7c5d3a" strokeWidth="1.5" />
      {pegs.map((peg, index) => (
        <circle
          key={index}
          cx={peg.x}
          cy={peg.y}
          r="2.2"
          fill="#3d2a18"
        />
      ))}
      <circle cx="100" cy="100" r="11" fill="#d52b1e" stroke="#7c5d3a" strokeWidth="1.5" />
      <g transform="translate(100 100) scale(0.16) translate(-50 -50)">
        <path
          fill="#ffffff"
          d="M50 6 L54 26 L60 22 L58 32 L70 26 L66 38 L80 36 L72 46 L92 50 L74 58 L78 66 L62 62 L66 78 L54 70 L52 92 L48 92 L46 70 L34 78 L38 62 L22 66 L26 58 L8 50 L28 46 L20 36 L34 38 L30 26 L42 32 L40 22 L46 26 Z"
        />
      </g>
    </svg>
  );
}
