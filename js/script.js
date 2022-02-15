'use strict';

function titleClickHandler(event) {
  event.preventDefault();

  const clickedElement = this;
  console.log('Link was clicked!');
  console.log(event);

  /* [DONE] remove class 'active' from all article links  */
  const activeLinks = document.querySelectorAll('.titles a.active');

  for (let activeLink of activeLinks) {
    activeLink.classList.remove('active');
  }
  //
  /* [DONE] add class 'active' to the clicked link */
  clickedElement.classList.add('active');

  // console.log('clickedElement:', clickedElement);
  console.log('clickedElement:', clickedElement);

  /* [DONE] remove class 'active' from all articles */
  const activeArticles = document.querySelectorAll('.posts article.active');
  for (let activeArticle of activeArticles) {
    activeArticle.classList.remove('active');
  }

  /* [DONE] get 'href' attribute from the clicked link */
  const articleSelector = clickedElement.getAttribute('href');
  console.log('articleSelector', articleSelector);

  /* [DONE] find the correct article using the selector (value of 'href' attribute) */
  const targetArticle = document.querySelector(articleSelector);

  /*[DONE] add class 'active' to the correct article */
  targetArticle.classList.add('active');
  console.log('targetArticle:', targetArticle);
}

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list',
  optArticleAuthorSelector = '.post-author',
  optTagsListSelector = '.tags.list';

function generateTitleLinks(customSelector = '') {
  /* [DONE] remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';
  /*console.log(customSelector);*/

  const articles = document.querySelectorAll(optArticleSelector + customSelector);
  let html = '';

  for (let article of articles) {
    /* [DONE] get the article id */
    const articleId = article.getAttribute('id');

    /*  [DONE]find the title element */
    /* [DONE]get the title from the title element */
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;

    /* [DONE] create HTML of the link */
    const linkHTML =
            '<li><a href="#' +
            articleId +
            '"><span>' +
            articleTitle +
            '</span></a></li>';
    // console.log(linkHTML);

    /*  [DONE] insert link into titleList */
    html = html + linkHTML;
  }
  /* insert link into html variable */
  titleList.innerHTML = html;

  const links = document.querySelectorAll('.titles a');
  for (let link of links) {
    link.addEventListener('click', titleClickHandler);
  }
}
generateTitleLinks();

function generateTags() {
  let allTags = [];
  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  // console.log('art', articles);
  /* START LOOP: for every article: */
  for (let article of articles){
  /* find tags wrapper */
    const titleList = article.querySelector(optArticleTagsSelector);
  
    /* make html variable with empty string */
    let html = '';
   
    /* get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags');
    // console.log('articleTags', articleTags);
    
    /* split tags into array */
    const articleTagsArray = articleTags.split(' ');
    // console.log(articleTagsArray);
    /* START LOOP: for each tag */
    for (let tag of articleTagsArray) {
      /* generate HTML of the link */
      console.log(tag);
      /* add generated code to html variable */
      const linkHTML ='<li><a href="#tag-' + tag + '"><span>' + tag + '</span></a></li>';
      console.log(linkHTML);
      /* [NEW] check if this link is NOT already in allTags */
      if(allTags.indexOf(linkHTML) == -1){
        /* [NEW] add generated code to allTags array */
        allTags.push(linkHTML);
      }
      /* insert link into html variable */
      html = html + linkHTML;
    }
    /* [NEW] find list of tags in right column */
    const tagList = document.querySelector(optTagsListSelector);
    /* [NEW] add html from allTags to tagList */
    tagList.innerHTML = allTags.join(' ');
    /* END LOOP: for each tag */
    /* insert HTML of all the links into the tags wrapper */
    titleList.innerHTML = html;
    /* END LOOP: for every article: */
  }
}
generateTags();

function tagClickHandler(event){
  /* prevent default action for this event */
  event.preventDefault(); 
  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  
  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '' );
  /* find all tag links with class active */
  const activeTagLinks = document.querySelectorAll('a.active[href^="#tag-"]');
  /* START LOOP: for each active tag link */
  for (let activeTagLink of activeTagLinks) {
  /* remove class active */
    activeTagLink.classList.remove('active');
  /* END LOOP: for each active tag link */
  }
  /* find all tag links with "href" attribute equal to the "href" constant */
  const equalTags = document.querySelectorAll('a[href="' + href + '"]');
  /* START LOOP: for each found tag link */
  for (let equalTag of equalTags) {
  /* add class active */
    equalTag.classList.add('active');
  /* END LOOP: for each found tag link */
  }
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
}


function addClickListenersToTags(){
  /* find all links to tags */
  const tagLinks = document.querySelectorAll('a[href^="#tag-"]');
  /* START LOOP: for each link */
  for (let tagLink of tagLinks) {
  /* add tagClickHandler as event listener for that link */
    tagLink.addEventListener('click', tagClickHandler); 
  }
  /* END LOOP: for each link */
}
addClickListenersToTags();

function generateAuthors(){

  const articles = document.querySelectorAll(optArticleSelector);
  
  for (let article of articles){
 
    const authorName = article.querySelector(optArticleAuthorSelector);
    
    let html = '';

    const authorHrefTags = article.getAttribute('data-author');

    const authorLinkHTML = '<li><a href="#author-' + authorHrefTags + '"><span>' + authorHrefTags + '</span></a></li>';

    html = html + authorLinkHTML;
    
    authorName.innerHTML = html;
  }
}
generateAuthors();

function authorClickHandler(event){

  event.preventDefault(); 
 
  const clickedElement = this;
 
  const href = clickedElement.getAttribute('href');
  
  const authorHrefTags = href.replace('#author-', '' );

  const authorTagLinks = document.querySelectorAll('a.active[href^="#author-"]');
  console.log(authorTagLinks);
 
  for (let authorTagLink of authorTagLinks) {

    authorTagLink.classList.remove('active');
  }
  const authorLinks = document.querySelectorAll('a[href="' + href + '"]');
  
  for (let authorLink of authorLinks) {
  
    authorLink.classList.add('active');
  }
  generateTitleLinks('[data-author="' + authorHrefTags + '"]');

}


function addClickListenersToAuthors(){
  
  const authorLinks = document.querySelectorAll('a[href^="#author-"]');
 
  for (let authorLink of authorLinks) {
 
    authorLink.addEventListener('click', authorClickHandler); 
  }
}
addClickListenersToAuthors();