const express = require("express");

const router = express.Router();
// 익스프레스 안의 "라우터"를 몽땅 가져오자

let todoId = 1;
let todos = [{ id: 1, title: "청소", isDone: false }];

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
  // 제이슨이라 그런거임 json통력 하려면 바디파서 해주면됨

  // 암튼 만든 todo를 던져준다! ==> 슬라이스에서 받아서 쓴다!
});
// post요청은 postman에서...
router.get("/", (req, res) => {
  return res.json({ todos });
});
// get요청은 브라우저로도 확인가능

router.get("/:todoId", (req, res) => {
  const { todoId } = req.params;
  //   구조분해
  //   params를 통해 데이터를 가져온것
  if (isNaN(todoId)) {
    return res.status(400).json({
      message: "todoId is not a number",
    });
  }
  // isNaN 문자면 true 숫자면 false

  let existTodo;

  todos.map((v) => {
    if (v.id === +todoId) {
      // +는 형변환
      existTodo = v;
    }
  });

  if (!existTodo) {
    return res.status(400).json({
      message: "Not exist todo.",
    });
  }

  return res.json({ todo: existTodo });
});

router.put("/:todoId/done", (req, res) => {
  const { todoId } = req.params;

  if (isNaN(todoId)) {
    return res.status(400).json({
      message: "todoId is not a number.",
    });
  }

  let updateTodo;

  todos = todos.map((v) => {
    if (v.id === +todoId) {
      updateTodo = { id: v.id, title: v.title, isDone: !v.isDone };

      return updateTodo;
    } else {
      return v;
    }
  });

  if (!updateTodo) {
    return res.status(400).json({
      message: "Not exist todo.",
    });
  }

  return res.json({ todo: updateTodo });
});

router.put("/:todoId", (req, res) => {
  const { todoId } = req.params;
  const { title } = req.body;

  if (isNaN(todoId) || !title) {
    return res.status(400).json({
      message: "Not exist data.",
    });
  }

  let updateTodo;

  todos = todos.map((v) => {
    if (v.id === +todoId) {
      updateTodo = { id: v.id, title, isDone: v.isDone };
      //   타이틀만 수정 나머지는 그대로라 v.~~로 입력하면됨

      return updateTodo;
    } else {
      return v;
    }
  });

  console.log(todos);

  return res.json({ todo: updateTodo });
  // 여기서 todo로 보내는것은 불필요한 데이터를 네트워크에 태우게됨(비효율적)
});

router.delete("/:todoId", (req, res) => {
  const { todoId } = req.params;

  if (isNaN(todoId)) {
    return res.status(400).json({
      message: "Not exist data.",
    });
  }
  todos = todos.filter((v) => {
    if (v.id !== +todoId) {
      return v;
    }
  });

  console.log(todos);
  return res.json({ message: "Deleted todo." });
});

module.exports = router;

// https://to-do-list-backend-8fd2514d2a96.herokuapp.com/api#/ 여기링크 한거//
