import CLI from "clui";
import clc from "cli-color";
import { renderTable } from "./clui.table.js";
import { renderLine } from "./clui.line.js";
import { renderGauge } from "./clui.gauge.js";
import { renderSparkline } from "./clui.sparkline.js";
import { renderProgress } from "./clui.progress.js";
import { renderSpinner } from "./clui.spinner.js";

// Uncomment this to get buffered line table 
// const outputBuffer = renderTable(CLI, clc);
// outputBuffer.output();

// Uncomment this to show chained output call
// renderLine(CLI, clc);

// Uncomment this to show gauge element
// renderGauge(CLI);

// Uncomment this to show sparkline
// renderSparkline(CLI);

// Uncomment this to show progress
// renderProgress(CLI);

// Uncomment this to show spinner
// renderSpinner(CLI);