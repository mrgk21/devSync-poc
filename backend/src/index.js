import cors from "cors";
import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

var store = {}

const httpServer = createServer();
const io = new Server(httpServer, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});

io.on("connection", (socket) => {
    console.log("socket id: ", socket.id, "connected");

    socket.on("room-join", (id, fn) => {
        console.log("room-join", socket.id);
        if(socket.rooms.has(id)) {
            fn({exists: true, data: store[id]})
        }
        else {
            socket.join(id);
            fn({exists: false})
        }
    });
    
    socket.on("room-update", (data, fn) => {
        // const rooms = [];
        // socket.rooms.forEach((item) => {
        //     rooms.push(item);
        // })
        // console.log(socket.id, "@, rooms=", rooms);
        const {snip, id, startInd, endInd} = data;
        const buf = Buffer.from(snip);
        console.log(buf);
        console.log(data);
        if(store[id]) {
            // const first = store[id].slice(0,startInd);
            // const second = store[id].slice(startInd);
            // store[id] = first + snip + second;
        }
        else store[id] = snip
        console.log({store});
        socket.to(id).emit("room-update-sync", {data: snip})
        fn()
    })

});

httpServer.listen(4200, () => {
    console.log("websocket online on port 4200");
});

const app = express();
app.use(cors());


app.listen(4000, () => {
    console.log("server online on port 4000");
});
