import { useEffect, useState } from "react";
import { socket } from "src/services/socket";

const isSocketConnected = () => {
    const [connected, setConnected] = useState(false);

    useEffect(() => {
        socket.on("connect", () => {
            console.log("connected");
            setConnected(true)
        });
        socket.on("disconnect", () => {
            console.log("disconnected");
            setConnected(false)
        });        
    })

    return connected;
}
 
export default isSocketConnected;