// src/offscreen-canvas.d.ts
declare interface OffscreenCanvasRenderingContext2D extends CanvasRenderingContext2D { }
declare class OffscreenCanvas {
  constructor(width: number, height: number);
  getContext(contextId: "2d"): OffscreenCanvasRenderingContext2D | null;
  // Add more methods and properties if needed
}
