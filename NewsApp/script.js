const API_KEY="911fe96a438a4f8780af3339a339c09e";
const url="https://newsapi.org/v2/everything?q=";

window.addEventListener('load', () => fetchNews("India"));

function reload(){
    window.location.reload();
}
async function fetchNews (query){
    const res=await fetch(`${url}${query}&apiKey=911fe96a438a4f8780af3339a339c09e`);
    const data = await res.json();
    console.log(data);
    bindData(data.articles);
}

function bindData(articles){
    const cardContainer=document.getElementById('cardContainer');
    const newsCardTemplate=document.getElementById('templateNewsCard')

    cardContainer.innerHTML="";

    articles.forEach((article)=>{
        if(article.urlToImage){
            const cardClone=newsCardTemplate.content.cloneNode(true);
            fillDataInCard(cardClone, article);
            cardContainer.appendChild(cardClone);
        }
    })
}


function fillDataInCard(cardClone, article){
    const newsImg=cardClone.querySelector("#newsImg");
    const newsTitle=cardClone.querySelector("#newTitle");
    const newsSource=cardClone.querySelector("#newsSource");
    const newsDesc=cardClone.querySelector("#newsDesc");

    newsImg.src=article.urlToImage;
    newsTitle.innerHTML=article.title;
    const date=new Date(article.publishedAt).toLocaleString("en-US",{
        timeZone:"Asia/Jakarta"
    });
    newsSource.innerHTML=`${article.source.name} • ${date}`
    newsDesc.innerHTML=article.description;

    cardClone.firstElementChild.addEventListener("click", ()=>{
        window.open(article.url, "_blank");
    })
}

let currSelectNav=null;
function onNavItemClick(id){
    fetchNews(id);
    const navItem=document.getElementById(id);
    currSelectNav?.classList.remove('active');
    currSelectNav=navItem;
    currSelectNav.classList.add('active');
}

const searchButton=document.getElementById("searchButton");
const searchText=document.getElementById("searchText");

searchButton.addEventListener("click", ()=>{
    const query=searchText.value;
    if(!query) return;
    fetchNews(query);
    currSelectNav?.classList.remove("active");
    currSelectNav=null;
})