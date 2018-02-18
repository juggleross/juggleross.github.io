(() => {

  class Article {
    constructor(articleContainer, jsonArticle) {
      this.articleContainer = articleContainer;
      this.article = document.createElement('div');
      this.article.className = "article";
      if(jsonArticle.urlToImage != null) this.articleContainer.appendChild(this.article);
      this.jsonArticle = jsonArticle;
    }

    addArticle() {
      this.addTitle();
      this.addSourceName();
      this.addDescription();
      this.addImage();
    }

    addTitle() {
      let title = document.createElement('a');
      title.textContent = this.jsonArticle.title;
      title.className = 'title';

      this.article.appendChild(title);
    }

    addSourceName() {
      let sourceName = document.createElement('h6');
      sourceName.textContent = this.jsonArticle.source.name;
      this.article.appendChild(sourceName);
    }

    addDescription() {
      let description = document.createElement('p');
      description.textContent = this.jsonArticle.description;
      this.article.appendChild(description);
    }

    addImage() {
      let imageLink = document.createElement('a');
      imageLink.href = this.jsonArticle.url;

      let urlToImage = document.createElement('img');
      urlToImage.src = this.jsonArticle.urlToImage;

      imageLink.appendChild(urlToImage);

      this.article.appendChild(imageLink);
    }
  }

  const url = 'https://newsapi.org/v2/top-headlines?' +
            'country=ru&' +
            'apiKey=2a563e8347f14a44b618e0501345f3ff';
  fetch(url)
    .then((resp) => resp.json())
    .then((data) => {
      const articleContainer = document.getElementById('article-container');

      return data.articles.map((jsonArticle) => {
        new Article(articleContainer, jsonArticle).addArticle();
      })
    })
})();
