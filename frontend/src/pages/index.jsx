import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { httpInstance } from "src/services/axios";
import { socket } from "src/services/socket";

export default function Home() {
    const router = useRouter();
    const [connected, setConnected] = useState(null);
    const [count, setCount] = useState(0);


    useEffect(() => {
        socket.on("count-sync", (x) => {
            console.log("inside sync service");
            setCount(x);
        });
    }, [])

    useEffect(() => {
        setConnected(socket.connected);
        console.log("socket connected to", socket.id);
    }, [])

    useEffect(() => {
        socket.on("connect", () => {
            setConnected(true)
        });
        socket.on("disconnect", () => {
            setConnected(false)
        });        
    }, [])

    const handleJoinRoom = async (e) => {
        e.preventDefault();
        const _val = String(e.currentTarget.room.value).trim();
        router.push(`/rooms/${_val}`).then(() => {
            console.log("entered room:", _val);
        })
        e.currentTarget.reset();
    }

    return (
        <div className="bg-orange-200 flex flex-col gap-2 p-5">
            <p>
                {
                    connected !== null ? 
                        connected ? 
                            <span className="text-green-500">Connected!</span> : 
                            <span className="text-red-500">Disconnected!</span> : 
                        <span className="text-orange-500">Connecting...</span>
                }
            </p>
            <form onSubmit={handleJoinRoom}>
                <label htmlFor="room">
                    Room id:
                    <input type="text" id="room" name="roomId" />
                </label>
            </form>
            {/* <textarea value={val} onChange={handleCodeChange} /> */}
        </div>
    );
}