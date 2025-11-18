export type CellValue = number | string | null;

export type Position = {
  x: number;
  y: number;
};

export type Cell = {
  position: Position;
  value: CellValue;
};

export class Sheet {
  private cells = new Map<string, Cell>();

  private key(x: number, y: number): string {
    return `${x},${y}`;
  }

  private validatePosition(x: number, y: number): void {
    if (x < 0 || y < 0) {
      throw new Error(`Cell position cannot be negative: (${x}, ${y})`);
    }
  }

  get(x: number, y: number): Cell | undefined {
    this.validatePosition(x, y);
    return this.cells.get(this.key(x, y));
  }

  set(x: number, y: number, value: CellValue): void {
    this.validatePosition(x, y);
    this.cells.set(this.key(x, y), { position: { x, y }, value });
  }

  delete(x: number, y: number): boolean {
    this.validatePosition(x, y);
    return this.cells.delete(this.key(x, y));
  }

  getCells(): Cell[] {
    return Array.from(this.cells.values());
  }

  getBounds(): Position {
    if (this.cells.size === 0) return { x: -1, y: -1 };

    let maxX = -1,
      maxY = -1;
    for (const cell of this.cells.values()) {
      maxX = Math.max(maxX, cell.position.x);
      maxY = Math.max(maxY, cell.position.y);
    }
    return { x: maxX, y: maxY };
  }

  clone(): Sheet {
    const next = new Sheet();
    for (const cell of this.cells.values()) {
      next.set(cell.position.x, cell.position.y, cell.value);
    }
    return next;
  }
}
