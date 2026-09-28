declare module "roughjs/bundled/rough.esm.js" {
  type Op = { op: string; data: number[] };
  type OpSet = { type: string; ops: Op[] };

  export type RoughShape = {
    shape: string;
    sets: OpSet[];
    options: Record<string, unknown>;
  };

  export type RoughOptions = Record<string, unknown>;

  export type RoughGenerator = {
    rectangle(x: number, y: number, width: number, height: number, options?: RoughOptions): RoughShape;
    ellipse(cx: number, cy: number, width: number, height: number, options?: RoughOptions): RoughShape;
    circle(cx: number, cy: number, radius: number, options?: RoughOptions): RoughShape;
    line(x1: number, y1: number, x2: number, y2: number, options?: RoughOptions): RoughShape;
    linearPath(points: number[][], options?: RoughOptions): RoughShape;
    curve(points: number[][], options?: RoughOptions): RoughShape;
    polygon(points: number[][], options?: RoughOptions): RoughShape;
    arc(
      cx: number,
      cy: number,
      radius: number,
      start: number,
      stop: number,
      closed?: boolean,
      options?: RoughOptions
    ): RoughShape;
    hachureFill(path: number[][], options?: RoughOptions): RoughShape;
  };

  const rough: {
    generator(): RoughGenerator;
    svg(el: unknown, options?: RoughOptions): unknown;
  };

  export default rough;
}
