import { createSignal, For, Index } from "solid-js";
import { Sheet, Cell } from "./sheet";

export default function App() {
  const [sheet] = createSignal(new Sheet());
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
  const grid = gridMaker(sheet());
  console.log(grid);

  function handleFocusOut(data: FocusEvent) {
    console.log(data);
    console.log(data.srcElement);
  }
  return (
    <div class="m-auto min-w-fit container">
      <table class="border-collapse table-fixed m-auto">
        <tbody>
          <For each={grid}>
            {(row) => (
              <tr>
                <For each={row}>
                  {(cell) => (
                    <td class="border border-gray-400 p-2 text-sm">
                      <input
                        onFocusOut={handleFocusOut}
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
