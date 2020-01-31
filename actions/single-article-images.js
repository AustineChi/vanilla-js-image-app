let articleId = new URLSearchParams(window.location.search).get("id");
let data = {};
let modal = document.getElementById("myModal");
let btn = document.getElementById("switchModal");
let span = document.getElementsByClassName("close")[0];
const preview = document.getElementById("preview");

btn.onclick = function() {
  modal.style.display = "block";
};

span.onclick = function() {
  modal.style.display = "none";
  preview.src = "";
};

previewFile = () => {
  const file = document.querySelector("input[type=file]").files[0];
  const reader = new FileReader();

  reader.addEventListener(
    "load",
    function() {
      preview.src = reader.result;
    },
    false
  );

  if (file) {
    reader.readAsDataURL(file);
    //   data.image = file.name
    data.image =
      "https://s3.amazonaws.com/uifaces/faces/twitter/scott_riley/128.jpg";
  }
};

getImages = () => {
  showPage(false);
  fetch(
    `http://5e0df4b536b80000143db9ca.mockapi.io/etranzact/v1/article/${articleId}/images`,
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
      for (let i in resData) {
        output += `<article class="single-item ">
            <div class="image-wrap">
            <img src="${resData[i].avatar}" alt="Smiley face" width="100%">
            </div>
                <a class="button delete" onclick="deleteImage(${resData[i].id})">delete</a>
            </div></article>`;
      }
      document.getElementById("article-section").innerHTML = output;
    });
};

addImage = () => {
  data.articleId = articleId;
  fetch(
    `http://5e0df4b536b80000143db9ca.mockapi.io/etranzact/v1/article/${articleId}/images`,
    {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    }
  )
    .then(response => {
      if (response.status >= 400) alert(response.statusText);
      getImages();
    })
    .catch(error => {
      alert(error);
    });
};

deleteImage = id => {
  let r = confirm(`Are you sure you want to delete this image?`);
  if (r == true) {
    showPage(false);
    fetch(
      `http://5e0df4b536b80000143db9ca.mockapi.io/etranzact/v1/article/${articleId}/images/${id}`,
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
        alert(`Image deleted successfully!`);
        this.getImages();
      })
      .catch(error => {
        showPage(true);
        alert(error);
      });
  }
};

onSubmit = () => {
  addImage();
  modal.style.display = "none";
  preview.src = "";
};

window.onload = () => {
  getImages();
};

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
