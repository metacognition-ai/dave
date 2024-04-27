import React, { useEffect } from 'react';
import Sketch from 'react-p5';
import p5Types, { Color } from 'p5'; // Import this for typechecking and intellisense

const Perlin = (props) => {
  useEffect(() => {
    // Cleanup function to remove the canvas
    return function cleanup() {
      let canvas = document.querySelector('canvas');
      if (canvas) {
        canvas.remove();
      }
    };
  }, []);

  let particles = [];

  // Setup function
  const setup = (p5, canvasParentRef) => {
    let canvasWidth = document.body.clientWidth;
    let canvasHeight = document.body.clientHeight;

    p5.createCanvas(canvasWidth, canvasHeight).parent(canvasParentRef);

    p5.background(0);
    p5.colorMode(p5.HSB);
    for (var i = 0; i < p5.windowWidth; i += 10) {
      for (var o = 0; o < p5.windowHeight; o += 10) {
        particles.push({
          x: i,
          y: o,
          clr: p5.color(p5.random(178, 255) + p5.frameCount, 100, 100),
        });
      }
    }
  };

  // Draw function
  const draw = (p5) => {
    p5.colorMode(p5.HSB);
    p5.background(243, 78, 28, 0.01);
    p5.noStroke();
    for (var i = 0; i < particles.length; i++) {
      let p = particles[i];
      p5.fill(p.clr);
      p5.ellipse(p.x + 30, p.y + 30, 1);
      p.x += (p5.noise(p.x / 200, p.y / 200, 3000) - 0.6) * 3;
      p.y += (p5.noise(p.x / 200, p.y / 200, 30000) - 0.5) * 3;
    }
  };

  //@ts-ignore
  return (
    <Sketch
      setup={setup}
      draw={draw}
    />
  );
};

export default Perlin;
