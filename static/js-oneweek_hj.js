// 누구 클릭했는지 구별을 위한 변수
let num = 0;

$(document).ready(function () {
  show_comment1();
});
$("#memberBtns")
  .children()
  .click(function () {
    // $(this).remove();

    alert(this);
  });

$("#team2").click(function () {
  show_member(x);
});

function show_member(x) {
  $("#member").empty();

  fetch("/member")
    .then((res) => res.json())
    .then((data) => {
      let rows = data["result"];

      let a = rows[x];

      let name = a["name"];
      let age = a["age"];
      let address = a["address"];
      let blood = a["blood"];
      let hobby = a["hobby"];
      let mbti = a["mbti"];
      let blog = a["blog"];
      let mind = a["mind"];
      let say = a["say"];
      let image = a["image"];

      let temp_html = `
          <div id="logoBox">
            <img src="./static/image/logo.png" alt="logo" id="logoImage" />
          </div>

          <div id="memberContents">
          <div id="selfiBox">
            <img src="${image}" id="slefi" />
          </div>
  
          <div id="memberInfor">
            <!-- 어떤 구조로 짜야할지 고민중.. -->
            <table>
              <tbody>
                <tr>
                  <td>이름</td>
                  <td id="name">${name}</td>
                </tr>
                <tr>
                  <td>나이</td>
                  <td id="age">${age}</td>
                </tr>
                <tr>
                  <td>MBTI</td>
                  <td id="mbti">${mbti}</td>
                </tr>
                <tr>
                  <td>혈액형</td>
                  <td id="blood">${blood}</td>
                </tr>
                <tr>
                  <td>거주지</td>
                  <td id="address">${address}</td>
                </tr>
                <tr>
                  <td>취미</td>
                  <td id="hobby">${hobby}</td>
                </tr>
                <tr>
                  <td>블로그</td>
                  <td>
                    <a href="${blog}" target="_blank" id="blog">
                      <img
                        src="https://nitter.net/pic/pbs.twimg.com%2Fprofile_images%2F1228368893321736193%2FOv0og7E8.jpg"
                        alt="velog" width="20px" /></a>
                  </td>
                </tr>
              </tbody>
            </table>
  
            <div id="makeUpMyMind">
              <ul>
                <li>
                  하고싶은 말
                  <ul>
                    <li>${say}</li>
                  </ul>
                </li>
                <li>
                  각오
                  <ul>
                    <li>${mind}</li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
  
          <div id="memberBtns">
            <ul>
              <li class="memberOn" id="team1" onclick="show_member(0)">이한별</li>
              <li id="team2" onclick="show_member(1)">임호진</li>
              <li id="team3">서경모</li>
            </ul>
          </div>   
        </div>
  
                                `;
      $("#member").append(temp_html);
    });
}

function show_comment1() {
  $("#commentsArea").empty();

  num = 1;

  fetch("/hanbyul")
    .then((res) => res.json())
    .then((data) => {
      let rows = data["result"];

      rows.forEach((a) => {
        let id = a["id"];

        let from = a["from"];
        let comment = a["comment"];

        let temp_html = `
              <table>
                <thead>
                  <tr>
                    <th>작성자</th>
                    <th>남기는 말</th>
                  </tr>
                </thead>
                <tbody id="real_commentsArea">
                  <tr>
                    <td>${from}</td>
                    <td>${comment}</td>
                    <td><button onclick="editComment()">수정</button></td>
                    <td><button onclick="deleteComment1('${id}')">삭제</button></td>
                  </tr>
                </tbody>
              </table>
                                    `;
        $("#commentsArea").append(temp_html);
      });
    });
}
function show_comment2() {
  $("#commentsArea").empty();
  num = 2;

  fetch("/hojin")
    .then((res) => res.json())
    .then((data) => {
      let rows = data["result"];

      rows.forEach((a) => {
        let id = a["id"];

        let from = a["from"];
        let comment = a["comment"];

        let temp_html = `
              <table>
                <thead>
                  <tr>
                    <th>작성자</th>
                    <th>남기는 말</th>
                  </tr>
                </thead>
                <tbody id="real_commentsArea">
                  <tr>
                    <td>${from}</td>
                    <td>${comment}</td>
                    <td><button onclick="editComment()">수정</button></td>
                    <td><button onclick="deleteComment2('${id}')">삭제</button></td>
                  </tr>
                </tbody>
              </table>
        
                                    `;
        $("#commentsArea").append(temp_html);
      });
    });
}
function show_comment3() {
  $("#commentsArea").empty();

  num = 3;

  fetch("/kyungmo")
    .then((res) => res.json())
    .then((data) => {
      let rows = data["result"];

      rows.forEach((a) => {
        let id = a["id"];

        let from = a["from"];
        let comment = a["comment"];

        let temp_html = `
              
              <table>
                <thead>
                  <tr>
                    <th>작성자</th>
                    <th>남기는 말</th>
                  </tr>
                </thead>
                <tbody id="real_commentsArea">
                  <tr>
                    <td>${from}</td>
                    <td>${comment}</td>
                    <td><button onclick="editComment()">수정</button></td>
                    <td><button onclick="deleteComment3('${id}')">삭제</button></td>
                  </tr>
                </tbody>
              </table>
                                    `;
        $("#commentsArea").append(temp_html);
      });
    });
}

function saveComment() {
  let name = $("#selectWriter option:selected").val();
  let message = $("#comment").val();

  let formData = new FormData();
  formData.append("send_message", message);
  formData.append("name_from", name);

  switch (num) {
    case 1:
      fetch("/hanbyul", { method: "POST", body: formData })
        .then((response) => response.json())
        .then((data) => {
          alert(data["msg"]);
          window.location.reload();
        });

      break;
    case 2:
      fetch("/hojin", { method: "POST", body: formData })
        .then((response) => response.json())
        .then((data) => {
          alert(data["msg"]);
          window.location.reload();
        });

      break;
    case 3:
      fetch("/kyungmo", { method: "POST", body: formData })
        .then((response) => response.json())
        .then((data) => {
          alert(data["msg"]);
          window.location.reload();
        });

      break;

    default:
  }
}

function deleteComment1(id) {
  let formData = new FormData();
  formData.append("id", id);

  fetch("/delComment1", { method: "POST", body: formData })
    .then((response) => response.json())
    .then((data) => {
      alert(data["msg"]);
      window.location.reload();
    });
}
function deleteComment2(id) {
  let formData = new FormData();
  formData.append("id", id);

  fetch("/delComment2", { method: "POST", body: formData })
    .then((response) => response.json())
    .then((data) => {
      alert(data["msg"]);
      window.location.reload();
    });
}

function deleteComment3(id) {
  let formData = new FormData();
  formData.append("id", id);

  fetch("/delComment3", { method: "POST", body: formData })
    .then((response) => response.json())
    .then((data) => {
      alert(data["msg"]);
      window.location.reload();
    });
}
