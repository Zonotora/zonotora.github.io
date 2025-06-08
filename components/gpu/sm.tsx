import React from "react";

const fp32Cols = 4;
const int32Rows = 8;

function ComputeTable() {
  return (
    <div className="compute-table">
      <div className="compute-table-left">
        {[...Array(int32Rows)].map((_, i) => (
          <div className="compute-row" key={i}>
            <div className="cell int32">INT32</div>
            {[...Array(fp32Cols)].map((_, j) => (
              <div className="cell fp32" key={j}>
                FP32
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="compute-table-mid">
        {[...Array(int32Rows)].map((_, i) => (
          <div className="cell fp64" key={i}>
            FP64
          </div>
        ))}
      </div>
      <div className="compute-table-right">
        <div className="tensor-core">
          TENSOR CORE
          <br />
          4TH GENERATION
        </div>
      </div>
    </div>
  );
}

function LdstSfuRow() {
  return (
    <div className="ldst-sfu-row">
      {[...Array(8)].map((_, i) => (
        <div className="ldst" key={i}>
          LD / ST
        </div>
      ))}
      <div className="sfu">SFU</div>
    </div>
  );
}

function SmCore() {
  return (
    <div className="sm-core">
      <div className="section l0">L0 Instruction Cache</div>
      <div className="section ws">Warp Scheduler (32 thread/clk)</div>
      <div className="section du">Dispatch Unit (32 thread/clk)</div>
      <div className="section rf">Register File (16,384 × 32-bit)</div>
      <ComputeTable />
      <LdstSfuRow />
    </div>
  );
}

function SmBlockDiagram() {
  return (
    <div className="sm-container">
      <style>
        {`
        .sm-container {
          color: #b7c7b0;
          font-family: "Fira Code", monospace;
          font-size: 6pt;
          width: 100%;
        }
        .sm-title {
          font-size: 1.6em;
          font-weight: bold;
          margin-bottom: 8px;
        }
        .l1-cache {
          border: 1px solid #6fa29c;
          background: none;
          color: #8ecfc7;
          padding: 8px 0;
          text-align: center;
          margin-bottom: 18px;
          font-size: 1.1em;
          letter-spacing: 1px;
        }
        .sm-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-template-rows: 1fr 1fr;
          gap: 18px;
          margin-bottom: 18px;
        }
        .sm-core {
          border: 1px solid #6fa29c;
          padding: 12px 8px 8px 8px;
          background: none;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .section {
          border: 1px solid #6fa29c;
          padding: 3px 8px;
          margin-bottom: 2px;
          font-size: 1em;
          background: none;
        }
        .section.ws, .section.du {
          background: #3d3c2b;
          color: #d5d1a3;
          border-color: #b8a96b;
        }
        .section.l0, .section.rf {
          background: none;
          color: #8ecfc7;
        }
        .compute-table {
          display: flex;
          flex-direction: row;
          margin: 8px 0 6px 0;
        }
        .compute-table-left {
          display: flex;
          flex-direction: column;
        }
        .compute-row {
          display: flex;
          flex-direction: row;
        }
        .cell {
          border: 1px solid #6fa29c;
          padding: 2px 10px;
          text-align: center;
          font-size: 0.97em;
        }
        .cell.int32 {
          background: none;
          color: #b7c7b0;
        }
        .cell.fp32 {
          background: none;
          color: #b7c7b0;
        }
        .compute-table-mid {
          display: flex;
          flex-direction: column;
        }
        .cell.fp64 {
          background: #2e4639;
          color: #b7c7b0;
          border: 1px solid #6fa29c;
        }
        .compute-table-right {
          display: flex;
          flex-direction: column;
          margin-left: 8px;
        }
        .tensor-core {
          border: 1px solid #6fa29c;
          background: none;
          color: #b7c7b0;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          font-size: 1em;
        }
        .ldst-sfu-row {
          display: flex;
          flex-direction: row;
          margin-top: 6px;
        }
        .ldst {
          border: 1px solid #b27b7b;
          background: none;
          color: #b27b7b;
          padding: 2px 8px;
          font-size: 0.98em;
          text-align: center;
        }
        .sfu {
          border: 1px solid #b27b7b;
          background: none;
          color: #b27b7b;
          padding: 2px 8px;
          font-size: 0.98em;
          text-align: center;
          margin-left: 8px;
        }
        .tensor-mem-accel {
          color: #b7c7b0;
          text-align: center;
          margin-bottom: 8px;
          font-size: 1.08em;
        }
        .l1-shared {
          border: 1px solid #6fa29c;
          background: none;
          color: #8ecfc7;
          text-align: center;
          margin-bottom: 12px;
          font-size: 1.05em;
          padding: 8px 0;
        }
        .tex-row {
          display: flex;
          gap: 16px;
          margin-top: 8px;
        }
        .tex-block {
          border: 1px solid #6fa29c;
          background: none;
          color: #b7c7b0;
          text-align: center;
          flex: 1;
          padding: 8px 0;
          font-size: 1.1em;
        }
        `}
      </style>
      <div className="sm-title">SM</div>
      <div className="l1-cache">L1 Instruction Cache</div>
      <div className="sm-grid">
        <SmCore />
        <SmCore />
        <SmCore />
        <SmCore />
      </div>
      <div className="tensor-mem-accel">Tensor Memory Accelerator</div>
      <div className="l1-shared">256 KB L1 Data Cache / Shared Memory</div>
      <div className="tex-row">
        <div className="tex-block">Tex</div>
        <div className="tex-block">Tex</div>
        <div className="tex-block">Tex</div>
        <div className="tex-block">Tex</div>
      </div>
    </div>
  );
}

export default SmBlockDiagram;
