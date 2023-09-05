import type { LTWHP } from "../types.js";

const getBoundingRect = (clientRects: Array<LTWHP>): any => {
  const rects = Array.from(clientRects).map((rect) => {
    const { left, top, width, height, pageNumber } = rect;

    const x1 = left;
    const x2 = left + width;

    const y1 = top;
    const y2 = top + height;


    return { x1, x2, y1, y2, pageNumber}; // height and width need to be correct
  });

  let firstPageNumber = Number.MAX_SAFE_INTEGER;

  rects.forEach((rect) => {

    firstPageNumber = Math.min(
      firstPageNumber,
      rect.pageNumber ?? firstPageNumber
    );
  });
  console.log('rects:', rects)

  const rectsWithSizeOnFirstPage = rects.filter(
    (rect) =>
      (rect.x1 > 0 || rect.x2 > 0 || rect.y1 > 0 || rect.y2 > 0) &&
      rect.pageNumber === firstPageNumber
  );

  const optimal = rectsWithSizeOnFirstPage.reduce((res, rect) => {
    return {
      x1: Math.min(res.x1, rect.x1),
      x2: Math.max(res.x2, rect.x2),

      y1: Math.min(res.y1, rect.y1),
      y2: Math.max(res.y2, rect.y2),

      pageNumber: firstPageNumber,
    };
  }, rectsWithSizeOnFirstPage[0]);
  console.log(optimal)
  const { x1, x2, y1, y2, pageNumber } = optimal;


  return {
    left: x1,
    top: y1,
    width: x2 - x1,
    height: y2 - y1,
    pageNumber,
    rects,
    x1,
    y1,
    x2,
    y2
  };
};

export default getBoundingRect;
