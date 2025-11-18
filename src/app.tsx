import { createSignal, For, Index } from "solid-js";
import { Sheet, Cell } from "./sheet";
import { createMemo } from "solid-js";

export default function App() {
  const [sheet, setSheet] = createSignal(new Sheet());
  const message = "Hi, these values have been programmatically set";
  message.split(" ").forEach((word, i) => {
    sheet().set(i, i, word);
  });

  function TwoDArray(m: number, n: number) {
    return Array.from({ length: m + 1 }, () =>
      Array.from({ length: n + 1 }, () => 0),
    );
  }

  const gridMaker = (sheet: Sheet) => {
    const cells = sheet.getCells();
    const maxRows = sheet.getBounds().y;
    const maxCols = sheet.getBounds().x;

    const grid = TwoDArray(maxRows, maxCols);

    const newGrid = grid.map((row, r) =>
      row.map((_, c) => sheet.get(r, c)?.value),
    );

    return newGrid;
  };
  const grid = createMemo(() => gridMaker(sheet()));
  console.table(grid);

  function handleFocusOut(e: FocusEvent, r: number, c: number) {
    const value = (e.currentTarget as HTMLInputElement).value;

    const next = sheet().clone();

    next.set(r, c, value);
    setSheet(next);
    console.table(grid());
  }
  return (
    <div class="m-auto min-w-fit container">
      <table class="border-collapse table-fixed m-auto">
        <tbody>
          <For each={grid()}>
            {(row, r) => (
              <tr>
                <For each={row}>
                  {(cell, c) => (
                    <td class="border border-gray-400 p-2 text-sm">
                      <input
                        onFocusOut={(e) => handleFocusOut(e, r(), c())}
                        value={cell?.toString()}
                      ></input>
                    </td>
                  )}
                </For>
              </tr>
            )}
          </For>
        </tbody>
      </table>
    </div>
  );
}
