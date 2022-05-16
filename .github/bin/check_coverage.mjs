// @ts-check
import { readFileSync } from 'fs'
import { resolve } from 'path';

/**
 * @typedef {{
 *   total: number,
 *   covered: number,
 *   skipped:number,
 *   pct: number,
 * }} CoverageUnit
 * 
 * @typedef {{
 *   lines: CoverageUnit,
 *   statements: CoverageUnit,
 *   functions:CoverageUnit,
 *   branches: CoverageUnit,
 *   branchesTrue?: CoverageUnit
 * }} CoverageSummary
 */

(async () => {
  /** @type {{ total: CoverageSummary, [K: string]: CoverageSummary }} */
  const data = JSON.parse(readFileSync(resolve('.', 'coverage', 'coverage-summary.json'), { encoding: 'utf-8'}))

  // 一旦出力するだけ
  console.log(data.total)
})();
