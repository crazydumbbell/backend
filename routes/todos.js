const express = require("express");

const router = express.Router();
// 익스프레스 안의 "라우터"를 몽땅 가져오자

let todoId = 1;
let todos = [{ od: 1, title: "청소", isDone: false }];

router.post("/", (req, res) => {
  const { title } = req.body;
  //   구조분해로 꺼내다 쓰자.
  //   브라우저 주소로는 get요청인데 post라서 안뜰거임
  //   이거 안하면 쓸때마다 req.body.title로 계속 써야됨
  if (!title) {
    return res.status(400).json({
      message: "Not exist title.",
    });
  }
  //   에러일때 대답해주는게 status

  //   에러를 여기서 잡아야됨 여기todoId++되기 전에 에러 잡아줌
  todoId++; //todoId = todoId + 1; todoId += 1 ; 다 같다!
  const newTodo = { id: todoId, title: title, isDone: false };
  //   const newTodo = { id: todoId,title, isDone: false };
  //   js문법에는 key값과 value값이 같으면 생략이 가능하다.

  todos = [...todos, newTodo];
  //   기존todos에 newTodo를 추가로담자(배열로)
  // 혹은 todo.push(newTodo);
  console.log(todos);

  return res.json({ todo: newTodo });
  //   postman에서 응답 하면 터미널에 undefined라고 뜸
  // 제이슨이라 그런거임 json통력 하려면 파디파서 해주면됨
});

module.exports = router;
