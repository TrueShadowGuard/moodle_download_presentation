(() => {
    window.require = null;
    window.define = null;

    const filename = document.querySelector("h2")?.innerText?.replace(/Лекция[.]?/g, "")?.trim() || "безымянный.pdf";

    const script = document.createElement("script");
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.4.0/jspdf.umd.min.js";
    script.async = false;
    document.head.appendChild(script);

    script.onload = (async () => {
        const htmlText = await downloadHtml();

        const _document = document.createElement("div");
        console.log(htmlText);
        _document.innerHTML = htmlText;

        const slides = [..._document.querySelectorAll("slide")];
        const images = slides.map($slide => $slide.getAttribute("data"));

        const doc = new jspdf.jsPDF();
        doc.deletePage(1);

        const imageSizes = await Promise.all(images.map(getImageDimensions));

        slides
            .map($slide => $slide.getAttribute("data"))
            .forEach((base64img, i) => {
                const {w, h} = imageSizes[i];
                const pageW = 480;
                const pageH = 480 * h / w;
                doc.addPage([pageW, pageH], "l")
                doc.addImage(base64img, null, 0, 0, pageW, pageH);
            }, doc);
        doc.output('save', filename + '.pdf');
    });

    function getImageDimensions(base64) {
        return new Promise(function (resolve, rejected) {
            const img = document.createElement("img");
            img.src = "data:img/png;base64," + base64;
            img.onload = function () {
                resolve({w: img.width, h: img.height})
            };
        })
    }

    async function downloadHtml() {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            document.body.className = "";
            document.body.id = "";
            document.body.innerHTML = `
            <progress id="indicator" style="width: 50%;"></progress>
            <h1>Скачиваем ${filename}</h1>
            <div id="progress">Скачано: 0 Bytes</div>      
            <p>Делаю сайты любой сложности, также могу автоматизировать вашу всякую рутину за компом: </p><a href="https://vk.com/vadimpopkov2003">https://vk.com/vadimpopkov2003</a>    
            `;
            const $progress = document.querySelector("#progress");
            const $indicator = document.querySelector("#indicator");

            xhr.onloadend = () => {
                $indicator.value = "100";
                $indicator.max = "100";
                resolve(xhr.response);
            }
            xhr.onprogress = e => {
                $progress.innerText = "Скачано " + formatBytes(e.loaded);
            }
            xhr.open("GET", window.location.href, true);
            xhr.send();
        });
    }

    function formatBytes(bytes, decimals = 2) {
        if (!+bytes) return '0 Bytes'

        const k = 1024
        const dm = decimals < 0 ? 0 : decimals
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

        const i = Math.floor(Math.log(bytes) / Math.log(k))

        return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
    }
})();
