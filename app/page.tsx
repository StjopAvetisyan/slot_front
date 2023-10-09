"use client";
import Slot from "@/app/components/slot";
import Prizes from "@/app/components/prizes";
import Controls from "@/app/components/control";
import { useEffect, useState } from "react";
import {
    SpinResponse,
    SpinResponseProps,
} from "@/app/interfaces/spin.response";
import { fetchData } from "@/app/utils/api";
import {
    ConfigResponse,
    ConfigResponseProps,
} from "@/app/interfaces/config.response";
import {
    UserResponse,
    UserResponseProps,
} from "@/app/interfaces/user.response";

export default function Home() {
    const [error, setError] = useState<string | null>(null);
    const [config, setConfigData] = useState<ConfigResponseProps>();
    const [user_data, setUserdata] = useState<UserResponseProps>();
    const [spin_data, setSpinData] = useState<SpinResponseProps>();

    useEffect(() => {
        fetchData<ConfigResponse>("/game/config").then((response) => {
            setError(response.error ? response.error.message : null);
            setConfigData(response.data);
        }).catch(error=>{
            setError(error.message ? error.message : 'Unexpected error');
        }) ;
        const current_user = localStorage.getItem("user");
        fetchData<UserResponse>(
            `/user/me${current_user ? "?uid=" + current_user : ""}`,
        ).then((response) => {
            setError(response.error ? response.error.message : null);
            setUserdata(response.data);
            if (!current_user) {
                localStorage.setItem("user", response.data.uid);
            }
        }).catch(error=>{
            setError(error.message ? error.message : 'Unexpected error');
        }) ;
    }, []);

    const fetchSpinData = async (selected_bet: number) => {
        const endpoint = `/game/spin?bet_count=${selected_bet}&id=${localStorage.getItem(
            "user",
        )}`;
        await fetchData<SpinResponse>(endpoint).then((response) => {
            setError(response.error ? response.error.message : null);
            setSpinData(response.data);
        }).catch(error=>{
            setError(error.message ? error.message : 'Unexpected error');
        }) ;
    };
    const def: ConfigResponseProps = {
        slot_count: 3,
        prizes: [
            { id: 1, figure: "❓", prizes_count: 0 },
            { id: 2, figure: "❓", prizes_count: 0},
            {
                id: 3,
                figure: "❓",
                prizes_count: 1,
            },
        ],
        possible_bets: [],
    };

    return (
        <>
      <div
          className={`${spin_data?.win ? "win-text" : ""}`}
          style={{ display: "none" }}
      >
        YOU WIN !
      </div>
      <div className="page-container">
        <div className="top">
          <Slot
              slot_config={config || def}
              positions={
                  spin_data?.positions || config?.prizes.map((el) => el.id) || []
              }
              win={spin_data?.win || false}
          />
          <div className="info">
            <Prizes
                prizes={config?.prizes ?? []}
                slot_count={config?.slot_count}
            />
          </div>
        </div>
        <div className="bottom">
          <div className="controls">
            <Controls
                fetchData={fetchSpinData}
                points={spin_data?.current_points || user_data?.current_points}
                prize={spin_data?.prize}
                possible_bets={config?.possible_bets}
            />
          </div>
        </div>
      </div>
            {error && (
                <div className="error">
          <p>{error}</p>
        </div>
            )}
    </>
    );
}
