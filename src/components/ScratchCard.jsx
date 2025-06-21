import React, { useRef, useEffect, useState } from "react";

const ScratchCard = () => {
  const canvasRef = useRef();
  const [isDrawing, setIsDrawing] = useState(false);

  const canvasWidth = 1200;
  const canvasHeight = 800;

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    ctx.fillStyle = "gray";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const stopDraw = () => setIsDrawing(false);
    window.addEventListener("mouseup", stopDraw);
    window.addEventListener("touchend", stopDraw);

    return () => {
      window.removeEventListener("mouseup", stopDraw);
      window.removeEventListener("touchend", stopDraw);
    };
  }, []);

  const startDrawing = () => setIsDrawing(true);

  const handleMove = (e) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX || e.touches?.[0]?.clientX) - rect.left;
    const y = (e.clientY || e.touches?.[0]?.clientY) - rect.top;

    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x, y, 30, 0, 2 * Math.PI); // Slightly larger brush
    ctx.fill();
  };

  return (
    <div
      style={{
        fontFamily: "Arial",
        maxWidth: 1260,
        margin: "60px auto",
        padding: 30
      }}
    >
      <div
        style={{
          backgroundColor: "#f06292",
          borderRadius: 30,
          padding: 30,
          color: "white",
          fontSize: 20,
          lineHeight: 1.5
        }}
      >
        <h1 style={{ fontSize: "36px", marginBottom: 20 }}>Scratch to Reveal</h1>
        <p style={{ marginBottom: 30 }}>
          Temp text<br />
          <strong>temp signature</strong>
        </p>

        <div
          style={{
            position: "relative",
            width: canvasWidth,
            height: canvasHeight,
            userSelect: "none",
            WebkitUserSelect: "none",
            MozUserSelect: "none",
            msUserSelect: "none"
          }}
        >
          <img
            src="/sakura.jpg"
            alt="hidden surprise"
            style={{
              width: "100%",
              height: "100%",
              borderRadius: 20,
              objectFit: "cover",
              position: "absolute",
              top: 0,
              left: 0,
              zIndex: 1,
              pointerEvents: "none",
              userSelect: "none"
            }}
          />
          <canvas
            ref={canvasRef}
            onMouseDown={startDrawing}
            onMouseMove={handleMove}
            onTouchStart={startDrawing}
            onTouchMove={handleMove}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              borderRadius: 20,
              zIndex: 2,
              width: "100%",
              height: "100%",
              touchAction: "none",
              cursor: isDrawing ? "grabbing" : "pointer"
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ScratchCard;
