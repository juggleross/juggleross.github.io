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

(() => {

  class ShortArticle {
    constructor(popularAsideBlock, jsonArticle) {
      this.popularAsideBlock = popularAsideBlock;

      this.shortArticle = document.createElement('a');
      this.shortArticle.className = "editor text-center";
      this.shortArticle.href = jsonArticle.url;

      if(jsonArticle.urlToImage != null) this.popularAsideBlock.appendChild(this.shortArticle);
      this.jsonArticle = jsonArticle;
    }

    addShortArticle() {
      this.addTitle();
      this.addShortDescription();
      this.addPublishedAt();
      this.addUnderscore();
    }

    addTitle() {
      let title = document.createElement('a');
      title.textContent = this.jsonArticle.title;
      title.className = 'title';

      this.shortArticle.appendChild(title);
    }

    addShortDescription() {
      let shortDescription = document.createElement('p');
      shortDescription.textContent = this.jsonArticle.description.substring(0, 100) + '...';

      this.shortArticle.appendChild(shortDescription);
    }

    addPublishedAt() {
      let publishedAt = document.createElement('label');
      publishedAt.textContent = this.jsonArticle.publishedAt;
      this.shortArticle.appendChild(publishedAt);
    }

    addUnderscore() {
      let underscore = document.createElement('span');
      this.shortArticle.appendChild(underscore);
    }
  }

  const url = 'https://newsapi.org/v2/everything?' +
          'q=Russia&' +
          'language=ru&' +
          'from=2018-02-04&' +
          'sortBy=popularity&' +
          'apiKey=2a563e8347f14a44b618e0501345f3ff';

  fetch(url)
    .then((resp) => resp.json())
    .then((data) => {
      const popularAsideBlock = document.getElementById('popular-aside-block');

      return data.articles.map((jsonArticle) => {
        new ShortArticle(popularAsideBlock, jsonArticle).addShortArticle();
      })
    })

})();
