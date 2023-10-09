"use client";
import React, { useEffect, useState } from "react";
import { ControlProps } from "@/app/interfaces/control.props";
import ReactTextTransition, { presets } from "react-text-transition";

const Controls: React.FC<ControlProps> = ({
                                              fetchData,
                                              points = 0,
                                              prize = 0,
                                              possible_bets = [1],
                                          }) => {
    const [selected_bet, setConfigData] = useState<number>();
    useEffect(() => {
        let _selected_bet = Number(localStorage?.getItem("selected_bet") || 1) || 1;
        setConfigData(_selected_bet);
    }, [selected_bet]);
    const handleClick = async () => {
        await fetchData(selected_bet || 1);
    };
    const change_bet = (selected: number) => {
        setConfigData(selected);
        localStorage.setItem("selected_bet", `${selected}`);
    };



    return (
        <>
      <div className="current third">
        <p>CURRENT POINTS</p>
        <ReactTextTransition delay={100} className="current-score" inline>
          {points}
        </ReactTextTransition>
        <p></p>
        <ReactTextTransition
            springConfig={presets.gentle}
            delay={100}
            className="current-score"
            inline
        >
          {prize}
        </ReactTextTransition>
      </div>
      <div className="buttons third">
        {possible_bets.map((el, index) => {
            return (
                <input
                    key={`bet_${index}`}
                    className={`bet-button ${selected_bet === el ? "selected" : ""}`}
                    onClick={() => change_bet(el)}
                    type="button"
                    value={`${el}x`}
                />
            );
        })}
      </div>
      <div className="buttons third">
        <input
            className="spin-button"
            onClick={handleClick}
            type="button"
            value="SPIN"
        />
      </div>
    </>
    );
};
export default Controls;
