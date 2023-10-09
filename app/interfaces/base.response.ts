interface BaseResponse<T> {
    status: string;
    error: null | ErrorProps;
    data: T;
}
interface ErrorProps{
    code:number
    message:string

}
