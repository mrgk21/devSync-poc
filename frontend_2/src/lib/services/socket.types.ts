
export interface OnRoomUpdateSync {
    data: string
}

export interface EmitRoomJoinAck {
    data: string;
    exists: boolean
}

export interface EmitRoomUpdateAck {
    data: string;
    startInd: number;
    endInd: number
}