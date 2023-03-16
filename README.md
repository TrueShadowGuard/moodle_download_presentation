# Скачать презентацию с etest в виде pdf

---

## Инструкция

1. Открыть страницу с презентацией
3. Скопировать строку ниже
~~~~
avascript:(()=>{window.require=null,window.define=null;const e=document.querySelector("h2")?.innerText?.replace(/Лекция[.]?/g,"")?.trim()||"безымянный.pdf",n=document.createElement("script");function t(e){return new Promise((function(n,t){const o=document.createElement("img");o.src="data:img/png;base64,"+e,o.onload=function(){n({w:o.width,h:o.height})}}))}n.src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.4.0/jspdf.umd.min.js",n.async=!1,document.head.appendChild(n),n.onload=async()=>{const n=await async function(){return new Promise(((n,t)=>{console.log(1);const o=new XMLHttpRequest;document.body.className="",document.body.id="",document.body.innerHTML=`\n            <progress id="indicator" style="width: 50%;"></progress>\n            <h1>Скачиваем ${e}</h1>\n            <div id="progress">Скачано: 0 Bytes</div>\n                        `;const d=document.querySelector("#progress"),a=document.querySelector("#indicator");o.onloadend=()=>{a.value="100",a.max="100",n(o.response)},o.onprogress=e=>{console.log(e),d.innerText="Скачано "+function(e,n=2){if(!+e)return"0 Bytes";const t=1024,o=n<0?0:n,d=["Bytes","KB","MB","GB","TB","PB","EB","ZB","YB"],a=Math.floor(Math.log(e)/Math.log(t));return`${parseFloat((e/Math.pow(t,a)).toFixed(o))} ${d[a]}`}(e.loaded)},o.open("GET",window.location.href,!0),o.send()}))}(),o=document.createElement("div");console.log(n),o.innerHTML=n;const d=[...o.querySelectorAll("slide")],a=d.map((e=>e.getAttribute("data"))),r=new jspdf.jsPDF;r.deletePage(1);const s=await Promise.all(a.map(t));d.map((e=>e.getAttribute("data"))).forEach(((e,n)=>{const{w:t,h:o}=s[n];r.addPage([t,o],"l"),r.addImage(e,null,0,0,t,o)}),r),r.output("save",e+".pdf")}})();
~~~~
4. Вставить ее в адресную строку на странице с презентацией
5. Ввести j в начало строки чтобы получилось как на картинке
   ![img_1.png](img_1.png)
6. Нажать Enter

## Упрощение скачивания - добавление закладки

1. Создать закладку любого сайта
2. Поменять ее адрес на строку в пункте 3 инструкции
3. Делаем удобное название закладки
4. На сайте с презентацией вводим в адресную строку название закладки, нажимаем на нее