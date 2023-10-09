export interface SpinResponseProps {
    positions: number[];
    win: boolean
    prize: number;
    current_points: number;
    possible_bets: number[]
}

export interface SpinResponse extends BaseResponse<SpinResponseProps> {
}
