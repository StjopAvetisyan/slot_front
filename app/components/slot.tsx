"use client";
import React from "react";
import { ConfigResponseProps } from "@/app/interfaces/config.response";
import ReactTextTransition, { presets } from "react-text-transition";
const Slot: React.FC<{
    positions: number[],
    win: boolean,
    slot_config: ConfigResponseProps,
}> = ({ positions, win, slot_config }) => {
    const slotCount = [];
    for (let i = 0; i < slot_config.slot_count; i++) {
        slotCount.push(i + 1);
    }

    return (
        <div className="slot">
      <div className="slot-wrapper">
        {slotCount.map((position, index) => {
            return (
                <div
                    key={`slot_${index}`}
                    className={`slot-column  ${win ? "win-border" : ""}`}
                >
              <ReactTextTransition
                  springConfig={presets.gentle}
                  delay={100}
                  className="slot-item"
                  inline
              >
                {slot_config.prizes[positions[index] - 1]?.figure ||
                    slot_config.prizes[1].figure}
              </ReactTextTransition>
            </div>
            );
        })}
      </div>
    </div>
    );
};

export default Slot;
