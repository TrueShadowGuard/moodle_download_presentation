(() => {
    window.require = null;
    window.define = null;

    const script = document.createElement("script");
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.4.0/jspdf.umd.min.js";
    script.async = false;
    document.head.appendChild(script);

    script.onload = (async () => {
        const res = await fetch(window.location.href);
        const htmlText = await res.text();

        const _document = document.createElement("div");
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
                doc.addPage([w, h], "l")
                doc.addImage(base64img, null, 0, 0, w, h);
                return doc;
            }, doc);
        doc.save();
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
})();