(() => {
  function componentFactory() {
    this.createComponent = function(type, jsonArticle, shortArticle) {
      let component;

      if(type === 'title') {
        component = new AddTitle(jsonArticle, shortArticle);
      } else if(type === 'description') {
        component = new AddShortDescription(jsonArticle, shortArticle);
      } else if(type === 'publishedAt') {
        component = new AddPublishedAt(jsonArticle, shortArticle);
      } else if(type === 'underscore') {
        component = new AddUnderscore(jsonArticle, shortArticle);
      }

      return component;
    }
  }

  let AddTitle = function(jsonArticle, shortArticle) {
    let title = document.createElement('a');
    title.textContent = jsonArticle.title;
    title.className = 'title';

    return title;
  };

  let AddShortDescription = function(jsonArticle, shortArticle) {
    let shortDescription = document.createElement('p');
    shortDescription.textContent = jsonArticle.description.substring(0, 100) + '...';

    return shortDescription;
  }

  let AddPublishedAt = function(jsonArticle, shortArticle) {
    let publishedAt = document.createElement('label');
    publishedAt.textContent = jsonArticle.publishedAt;

    return publishedAt;
  }

  let AddUnderscore = function(jsonArticle, shortArticle) {
    let underscore = document.createElement('span');

    return underscore;
  }

  class DecoratedShortArticle {
    constructor(popularAsideBlock, jsonArticle) {
      this.popularAsideBlock = popularAsideBlock;
      this.jsonArticle = jsonArticle;
    }

    createStructureFor(componentNames) {
      let shortArticle = new AddShortArticle(this.popularAsideBlock, this.jsonArticle);
      let factory = new componentFactory();

      componentNames.forEach((componentName) => {
        shortArticle.appendChild(new factory.createComponent(componentName, this.jsonArticle, shortArticle));
      })

      return shortArticle;
    }

    createOnlyTitle() {
      this.createStructureFor(['title','underscore']);
    }

    createOnlyDescription() {
      this.createStructureFor(['description','underscore']);
    }

    createOnlyPublishedAt() {
      this.createStructureFor(['publishedAt','underscore']);
    }

    createDoubleUnderscore() {
      this.createStructureFor(['underscore','underscore']);
    }

    createFullShortArticle() {
      this.createStructureFor(['title', 'description', 'publishedAt', 'underscore']);
    }

    createArticleInAnotherOrder() {
      this.createStructureFor(['underscore', 'publishedAt', 'description', 'title']);
    }

  }

  let AddShortArticle = function(popularAsideBlock, jsonArticle) {
    let shortArticle = document.createElement('a');
    shortArticle.className = "editor text-center";
    shortArticle.href = jsonArticle.url;

    popularAsideBlock.appendChild(shortArticle);

    return shortArticle;
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
        let shortArticle = new DecoratedShortArticle(popularAsideBlock, jsonArticle);

        shortArticle.createOnlyTitle();
        shortArticle.createOnlyDescription();
        shortArticle.createOnlyPublishedAt();
        shortArticle.createDoubleUnderscore();
        shortArticle.createFullShortArticle();
        shortArticle.createArticleInAnotherOrder();
      })
    })

})();
