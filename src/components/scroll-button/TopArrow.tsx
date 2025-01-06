interface TopArrowProps {
  className?: string;
}

export function TopArrow({ className }: TopArrowProps) {
  return (
    <svg 
      width="40" 
      height="40" 
      viewBox="0 0 40 40" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path 
        d="M28.8889 24.4446L20 15.5557L11.1111 24.4446" 
        stroke="currentColor" 
        strokeWidth="5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </svg>
  );
}