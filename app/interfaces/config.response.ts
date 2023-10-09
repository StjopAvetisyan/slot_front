import {FigureProps} from "@/app/interfaces/prizes.props";


export interface ConfigResponseProps {
    prizes: FigureProps[],
    possible_bets: number[],
    slot_count: number
}

export interface ConfigResponse extends BaseResponse<ConfigResponseProps> {
}
