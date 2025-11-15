class Spreadsheet {}

class CellData {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}

const cell = new CellData(0, 0);
