"use client";
import React from "react";
import { FigureProps } from "@/app/interfaces/prizes.props";

const Prizes: React.FC<{
    prizes: FigureProps[],
    slot_count: number | undefined,
}> = ({ prizes, slot_count = 0 }) => {
    const slotCount: number[] = [];
    for (let i = 0; i < slot_count; i++) {
        slotCount.push(i);
    }

    return (
        <>
      <h1 className="prize_text">PRIZES</h1>
      <div className="info-table-container">
        <table className="info-table">
          <thead>
            <tr>
              <th colSpan={slot_count}>Combination</th>
              <th>Prize</th>
            </tr>
          </thead>
          <tbody>
            {prizes.map((row, index) => (
                <tr key={index}>
                {slotCount.map((element, index) => {
                    return <td key={`prize_${index}`}>{row.figure}</td>;
                })}
                    <td>{`${row.prizes_count}x bet`}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
    );
};
export default Prizes;
