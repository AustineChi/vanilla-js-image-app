let articleData = {
  author: "Mr. Bruce Brad"
};
const articleId = new URLSearchParams(window.location.search).get("id");
const preview = document.querySelector("img");

onChange = e => {
  articleData[e.name] = e.value;
};

validate = () => {
  if (document.articleForm.title.value == "") {
    alert("Please enter article!");
    document.myForm.Name.focus();
    return false;
  }
  if (document.articleForm.url.value == "") {
    alert("Please enter url!");
    document.myForm.EMail.focus();
    return false;
  }
  return true;
};

updateArticle = () => {
  showPage(false);
  fetch(
    `http://5e0df4b536b80000143db9ca.mockapi.io/etranzact/v1/article/${articleId}`,
    {
      method: "PUT",
      body: JSON.stringify(articleData),
      headers: {
        "Content-Type": "application/json"
      }
    }
  )
    .then(response => response.json())
    .then(data => {
      showPage(true);
      alert("article updated successfully");
    })
    .catch(error => {
      alert(error);
      showPage(true);
    });
};

addNewArticle = () => {
  showPage(false);
  fetch(`http://5e0df4b536b80000143db9ca.mockapi.io/etranzact/v1/article/`, {
    method: "POST",
    body: JSON.stringify(articleData),
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(response => response.json())
    .then(data => {
      showPage(true);
      alert("new article created successfully");
      articleData = {};
      articleData.author = "Mr. Bruce Brad";
      document.getElementsByName("title")[0].value = "";
      document.getElementsByName("url")[0].value = "";
      preview.src = "";
    })
    .catch(error => {
      alert(error);
      showPage(true);
    });
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
    // articleData.avatar= file.name
    articleData.avatar =
      "https://s3.amazonaws.com/uifaces/faces/twitter/scott_riley/128.jpg";
  }
}

onSubmit = () => {
  validate();
  articleId ? updateArticle() : addNewArticle();
};

getData = () => {
  fetch(
    `http://5e0df4b536b80000143db9ca.mockapi.io/etranzact/v1/article/${articleId}`,
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
      articleData.title = resData.title;
      articleData.url = resData.url;
      articleData.avatar = resData.avatar;
      document.getElementsByName("title")[0].value = resData.title;
      document.getElementsByName("url")[0].value = resData.url;
      preview.src = resData.avatar;
    });
};

window.onload = () => {
  if (articleId)
    document.getElementsByClassName(
      "breadcrumb mt-30"
    )[0].innerHTML = `Update Article`;
  if (articleId) getData();
  showPage(true);
};
