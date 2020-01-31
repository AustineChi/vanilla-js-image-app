let articleId = new URLSearchParams(window.location.search).get("id");
let comments = [];
let commentData = {
  articleId: articleId,
  name: "Dr. Jessie Gislason",
  avatar: "https://s3.amazonaws.com/uifaces/faces/twitter/hjartstrorn/128.jpg"
};

onChange = e => {
  commentData[e.name] = e.value;
};

function openForm() {
  document.getElementById("myForm").style.display = "block";
}

function closeForm() {
  document.getElementById("myForm").style.display = "none";
  document.getElementsByName("comment")[0].value = "";
  delete commentData.id;
  delete commentData.comment;
}

getData = () => {
  showPage(false);
  fetch(
    `https://5e0df4b536b80000143db9ca.mockapi.io/etranzact/v1/article/${articleId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    }
  )
    .then(res => {
      return res.json();
    })
    .then(resData => {
      showPage(true);
      let output = "";
      output += `
       <div>
       <img src="${resData.avatar}" alt="Smiley face" width="70px">
       </div>
          <div class="text-box"> <span> Author: </span> ${resData.author}</div>
          <div class="text-box"> <span>Created:</span>  ${resData.createdAt}</div>
         `;
      document.getElementById("article-name").innerHTML = resData.title;
      document.getElementById("section-one").innerHTML = output;
      document
        .getElementById("manage-image-tag")
        .setAttribute(
          "href",
          `./manage-single-article-images.html?id=${articleId}`
        );
    });
};

getImages = () => {
  showPage(false);
  fetch(
    `https://5e0df4b536b80000143db9ca.mockapi.io/etranzact/v1/article/${articleId}/images`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    }
  )
    .then(res => {
      return res.json();
    })
    .then(resData => {
      showPage(true);
      let image = "";
      let dots = "";
      for (let i in resData) {
        let k = i;
        image += `<input type="radio" name="radio-buttons" id="img-${i}" ${
          i == 0 ? "checked" : ""
        }  />
       <li class="slide-container">
           <div class="slide-image">
             <img src="${resData[i].avatar}">
           </div>
       </li>`;
        dots += `<label for="img-${i}" class="carousel-dot" id="img-dot-${i}"></label>`;
      }
      document.getElementById("slides").innerHTML =
        image + `<div class="carousel-dots" id="dots">`;
      document.getElementById("dots").innerHTML = dots;
    });
};

updateComment = id => {
  fetch(
    `https://5e0df4b536b80000143db9ca.mockapi.io/etranzact/v1/article/${articleId}/comments/${commentData.id}`,
    {
      method: "PUT",
      body: JSON.stringify(commentData),
      headers: {
        "Content-Type": "application/json"
      }
    }
  )
    .then(response => response.json())
    .then(() => {
      this.getComments();
      closeForm()
    })
    .catch(error => {
      alert(error);
    });
};

addComment = () => {
  fetch(
    `https://5e0df4b536b80000143db9ca.mockapi.io/etranzact/v1/article/${articleId}/comments`,
    {
      method: "POST",
      body: JSON.stringify(commentData),
      headers: {
        "Content-Type": "application/json"
      }
    }
  )
    .then(response => {
      if (response.status >= 400) alert(response.statusText);
    })
    .catch(error => {
      alert(error);
    });
};

deleteComment = id => {
  fetch(
    `https://5e0df4b536b80000143db9ca.mockapi.io/etranzact/v1/article/${articleId}/comments/${id}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    }
  )
    .then(response => response.json())
    .then(() => {
      this.getComments();
    })
    .catch(error => {
      alert(error);
    });
};

selectUpdate = i => {
  // document.getElementById("myForm")
  openForm();
  commentData = comments[i];
  document.getElementsByName("comment")[0].value = commentData.comment;
};

getComments = () => {
  showPage(false);
  fetch(
    `https://5e0df4b536b80000143db9ca.mockapi.io/etranzact/v1/article/${articleId}/comments`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    }
  )
    .then(res => {
      return res.json();
    })
    .then(resData => {
      showPage(true);
      comments = resData;
      let comment = "";
      for (let i in resData) {
        comment += `<div class="comment-container ${
          i % 2 === 0 ? "" : "darker"
        } ">
            <span>${resData[i].name}</span>
              <img src="${resData[i].avatar}" alt="Avatar" class=${
          i % 2 === 0 ? "" : "right"
        } style="width:100%;" >
          <p>${resData[i].comment}</p>
             <div class=${i % 2 === 0 ? "time-right" : "time-left"}>${
          resData[i].createdAt
        }</div>
          <div class="footer">
             <button class="update" onclick="selectUpdate(${i})">update</button>
              <button class="delete" onclick="deleteComment(${
                resData[i].id
              })">delete</button>
      </div>
    </div>`;
      }
      document.getElementById("comments").innerHTML = comment;
    });
};

submitComment = () => {
  commentData.id ? updateComment() : addComment();
};

window.onload = () => {
  this.getData();
  this.getImages();
  this.getComments();
};
