const WifiLoader = () => {
  return (
    <div
      id="wifi-loader"
      className="relative flex items-center justify-center w-16 h-16 rounded-full"
    >
      {/* Outer circle */}
      <svg className="absolute w-[86px] h-[86px]" viewBox="0 0 86 86">
        <circle className="back" cx="43" cy="43" r="40" />
        <circle className="front" cx="43" cy="43" r="40" />
        <circle className="new" cx="43" cy="43" r="40" />
      </svg>

      {/* Middle circle */}
      <svg className="absolute w-[60px] h-[60px]" viewBox="0 0 60 60">
        <circle className="back" cx="30" cy="30" r="27" />
        <circle className="front" cx="30" cy="30" r="27" />
      </svg>

      {/* Inner circle */}
      <svg className="absolute w-[34px] h-[34px]" viewBox="0 0 34 34">
        <circle className="back" cx="17" cy="17" r="14" />
        <circle className="front" cx="17" cy="17" r="14" />
      </svg>

      {/* Text */}
      <div
        className="absolute -bottom-10 text-sm font-medium lowercase tracking-wide"
        data-text="Searching"
      />
    </div>
  );
};

export default WifiLoader;
