
const Loader = () => {
  return (
    <>
      <style>
        {`
          .square {
            width: 10px;
            height: 40px;
            border-radius: 3px;
            background-color: rgb(111, 163, 240);
            transform-origin: center;
          }

          .square-1 {
            animation: bounce-scale 1200ms cubic-bezier(0.445, 0.05, 0.55, 0.95) 0ms infinite;
          }

          .square-2 {
            animation: bounce-scale 1200ms cubic-bezier(0.445, 0.05, 0.55, 0.95) 200ms infinite;
          }

          .square-3 {
            animation: bounce-scale 1200ms cubic-bezier(0.445, 0.05, 0.55, 0.95) 400ms infinite;
          }

          @keyframes bounce-scale {
            0%, 100% {
              transform: scaleY(1);
              background-color: rgb(111, 163, 240);
            }
            50% {
              transform: scaleY(1.6);
              background-color: rgb(111, 200, 240);
            }
          }
        `}
      </style>

      <div className="w-full h-screen flex justify-center items-center">
        <div className="flex w-[50px] h-[60px] items-center justify-between gap-1">
          <div className="square square-1"></div>
          <div className="square square-2"></div>
          <div className="square square-3"></div>
        </div>
      </div>
    </>
  );
};

export default Loader;
