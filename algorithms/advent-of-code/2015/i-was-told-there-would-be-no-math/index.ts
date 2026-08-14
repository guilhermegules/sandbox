import fs from "node:fs";
import { Transform, TransformCallback } from "node:stream";

const rightRectangularPrismCalculation = (
  left: number,
  width: number,
  height: number
) => {
  const side1 = left * width;
  const side2 = width * height;
  const side3 = height * left;
  const surfaceArea = 2 * side1 + 2 * side2 + 2 * side3;
  const slack = Math.min(side1, side2, side3);
  return surfaceArea + slack;
};

const readStream = fs.createReadStream("./data.txt", { encoding: "utf8" });

class GroupByThree extends Transform {
  private buffer: Map<number, number[]> = new Map();

  constructor() {
    super({ readableObjectMode: true, writableObjectMode: true });
  }

  _transform(
    chunk: any,
    _encoding: BufferEncoding,
    callback: TransformCallback
  ): void {
    const chunkSplited = chunk.toString().split(/x|\n/g) as any[];

    let index = 0;

    chunkSplited.forEach((c) => {
      const value = Array.from(this.buffer.get(index)?.values() ?? []);

      this.buffer.set(index, [...value, c]);

      if (this.buffer.get(index)?.length === 3) {
        this.push([...this.buffer]);
        index++;
      }
    });

    callback();
  }

  _flush(callback: TransformCallback): void {
    if (this.buffer.size > 0) {
      this.push([...this.buffer]);
    }
    callback();
  }
}

const groupByThree = new GroupByThree();

readStream.pipe(groupByThree).on("data", (chunk) => {
  const values = Array.from(new Map(chunk).values()) as string[][];
  const total = values
    .map(([left, width, height]: string[]) =>
      rightRectangularPrismCalculation(
        Number(left),
        Number(width),
        Number(height)
      )
    )
    .reduce((total, value) => total + value, 0);
  console.log(total);
});
