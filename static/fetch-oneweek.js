//-----------------member page-------------------------------//
$(document).ready(function () {
  fetch("/member")
    .then((res) => res.json())
    .then((data) => {
      let rows = data["result"];
      let members = document.querySelectorAll(".members>img");

      for (i = 0; i < rows.length; i++) {
        let imageSrc = rows[i].image;

        members[i].setAttribute("src", imageSrc);
      }
    });
});
function show_member(x) {
  $("#memberContents2").empty();
  let tab_click = document.querySelectorAll("#tabMember li");

  /* get 요청 확인 fetch 코드 */
  fetch("/member")
    .then((res) => res.json())
    .then((data) => {
      let rows = data["result"];
      let a = rows[x];

      let temp_html = `<div id="selfiBox">
          <img src="${a["image"]}" id="slefi" />
        </div>

        <div id="memberInfor">
          <table>
            <tbody>
              <tr>
                <td>이름</td>
                <td id="name">${a["name"]}</td>
              </tr>
              <tr>
                <td>나이</td>
                <td id="age">${a["age"]}</td>
              </tr>
              <tr>
                <td>MBTI</td>
                <td id="mbti">${a["mbti"]}</td>
              </tr>
              <tr>
                <td>혈액형</td>
                <td id="blood">${a["blood"]}</td>
              </tr>
              <tr>
                <td>거주지</td>
                <td id="address">${a["address"]}</td>
              </tr>
              <tr>
                <td>취미</td>
                <td id="hobby">${a["hobby"]}</td>
              </tr>
              <tr>
                <td>블로그</td>
                <td>
                  <a href="${a["blog"]}" target="_blank" id="blog">
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
                  <li>${a["say"]}</li>
                </ul>
              </li>
              <li>
                각오
                <ul>
                  <li>${a["mind"]}</li>
                </ul>
              </li>
            </ul>
          </div>
      </div>`;

      $("#memberContents2").append(temp_html);
      tab_click[x].click();
    });
}

//-------------------------------comment page-------------------------//
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

function show_comment1() {
  $("#commentsArea").empty();

  num = 1;

  fetch("/hanbyul")
    .then((res) => res.json())
    .then((data) => {
      let rows = data["result"];

      rows.forEach((a) => {
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
                    <td><button onclick="deleteComment() ">삭제</button></td>
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
                    <td><button onclick="deleteComment()">삭제</button></td>
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
                    <td><button onclick="deleteComment()">삭제</button></td>
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
