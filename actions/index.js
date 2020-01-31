let page = 1;
let limit = 10;

getData = () => {
  showPage(false);
  fetch(
    `http://5e0df4b536b80000143db9ca.mockapi.io/etranzact/v1/article?page=${page}&limit=${limit}`,
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
      buttonState(page);
      let output = "";
      for (let i in resData) {
        output += `<article class="single-item "><div class="image-wrap">
          <img src="${resData[i].avatar}" alt="Smiley face" width="100%">
          </div><div class="header"><h4 class="title">
                  <a href="./views/view-article.html?id=${resData[i].id}"> ${resData[i].title}</a>
              </h4></div>
          <div class="footer">
              <a class="button view" href="./views/view-article.html?id=${resData[i].id}">view</a>
              <a class="button update" href="./views/post-article.html?id=${resData[i].id}">update</a>
              <a class="button delete" onclick="deleteArticle(${resData[i].id})">delete</a>
          </div></article>`;
      }
      document.getElementById("article-section").innerHTML = output;
    });
};


deleteArticle = id => {
  let r = confirm(`Are you sure you want to delete article with Id: "${id}"?`);
  if (r == true) {
    showPage(false);
    fetch(
      `http://5e0df4b536b80000143db9ca.mockapi.io/etranzact/v1/article/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        }
      }
    )
      .then(response => response.json())
      .then(data => {
        showPage(true);
        alert(`(${data.title}) has been successfully deleted!`);
        this.getData();
      })
      .catch(error => {
        showPage(true);
        alert(error);
      });
  }
};

document.getElementById("next").addEventListener("click", function() {
  page += 1;
  getData();
});
document.getElementById("previous").addEventListener("click", function() {
  page -= 1;
  getData();
});

window.onload = () => {
  this.getData();
};