# Скачать презентацию с etest в виде pdf

---

## [На скачанные pdf можно наложить текст тут](https://agile-garden-12289.herokuapp.com/)


## Инструкция

1. Открыть страницу с презентацией
3. Скопировать строку ниже
~~~~
avascript:(()=>{window.require=null,window.define=null;const e=document.createElement("script");function t(e){return new Promise(function(t,n){const a=document.createElement("img");a.src="data:img/png;base64,"+e,a.onload=function(){t({w:a.width,h:a.height})}})}e.src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.4.0/jspdf.umd.min.js",e.async=!1,document.head.appendChild(e),e.onload=(async()=>{const e=await fetch(window.location.href),n=await e.text(),a=document.createElement("div");a.innerHTML=n;const c=[...a.querySelectorAll("slide")],d=c.map(e=>e.getAttribute("data")),o=new jspdf.jsPDF;o.deletePage(1);const i=await Promise.all(d.map(t));c.map(e=>e.getAttribute("data")).forEach((e,t)=>{const{w:n,h:a}=i[t];o.addPage([n,a],"l"),o.addImage(e,null,0,0,n,a)},o);const l=document.querySelector("h2").innerText.replace(/Лекция[.]?/g,"").trim();o.output("save",l+".pdf")})})();
~~~~
4. Вставить ее в адресную строку на странице с презентацией
5. Ввести j в начало строки чтобы получилось как на картинке
   ![img_1.png](img_1.png)
6. Нажать Enter и ждать. Презентация скачается без индикатора загрузки
