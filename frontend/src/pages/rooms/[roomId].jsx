import { useRouter } from "next/router";
import { useEffect } from "react";
import { useRef } from "react";
import { useLayoutEffect } from "react";
import { useState } from "react";
import { useMemo } from "react";
import { socket } from "src/services/socket";

const Room = () => {
    const router = useRouter();
    const roomId = useMemo(() => router.query.roomId, [router]);
    const [val, setVal] = useState("");
    const [snipInd, setSnipInd] = useState(0);
    const [socketId, setSocketId] = useState(0)
    const timer = useRef({start: false, val: 1000});

    const handleCodeChange = (e) => {
        const _val = e.target.value;
        const cursorInd = e.target.selectionStart;
        setSnipInd(cursorInd);
        setVal(_val);

        emitUpdate(_val)
        
        // if(!timer.current.start) {
        //     timer.current.start = true;
        //     setTimeout(() => {
        //         emitUpdate()
        //     }, timer.current.val)
        // }
    }

    function emitUpdate(_val) {
        socket.emit("room-update", {snip: _val.substring(snipInd), id: roomId}, () => {

            // const c = codeSnip; 
            setSnipInd(0);
            timer.current.start = false
        })
    }

    console.log({snipInd, val});

    useEffect(() => {
        if(!roomId) return;
        console.log("roomId", roomId);
        socket.emit("room-join", roomId, (obj) => {
            const {exists, data} = obj;
            if(exists) {
                console.log({obj});
                console.log("joining old room", roomId);
                setVal(data)
            }
            else console.log("joining existing room", roomId);
        })
    }, [roomId]);

    useEffect(() => {
        socket.on("room-update-sync", (obj) => {
            console.log("inside update sync");
            const {data} = obj;
            setVal(data);
        })
    }, []);

    useEffect(() => {
        setSocketId(socket.id)
    }, [])

    console.log({roomId});
    
    return ( 
        <div suppressHydrationWarning={true}>
            {socketId}
            <div className="p-2 bg-orange-200 flex w-full">
                <textarea name="data" id="data" value={val} onChange={handleCodeChange} className="w-full h-[200px] p-1"/>
            </div>
        </div>
    );
}
 //  
export default Room;