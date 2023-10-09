export interface ControlProps {
    fetchData: (selected_bet: number) => Promise<void>;
    points?: number
    prize?: number
    possible_bets?: number[]
}
