const express = require("express");
//import express from 'express'; 랑 똑같음
// 실행은 node app.js
const todosRouter = require("./routes/todos");

const app = express();
// 위는 익스프레스 컨벤션임 필수는 아님

const port = 3010;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// 요것이 바디파서
app.use("/todos", todosRouter);
// todos 로 왔을때 todosRouter로 보내겠다.
// 노드몬으로 실시간업뎃 가능한데 팩.제이슨에 스타트 명령어 만들어놔야됨

app.get("/", (req, res) => {
  return res.send("Hello, Express!");
});

app.post("/todos");
app.get("/todos");
app.get("/todos/:todoId");
app.put("/todos/:todoId");
app.delete("/todos/:todoId");
app.put("/todos/:todoId/done");

app.listen(port, () => {
  console.log(`🚀 Server is listening on port : ${port}`);
});
