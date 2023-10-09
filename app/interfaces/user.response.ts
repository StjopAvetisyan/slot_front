export interface UserResponseProps {
    uid: string,
    current_points: number,
}

export interface UserResponse extends BaseResponse<UserResponseProps> {
}
