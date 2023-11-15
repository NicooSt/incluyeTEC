window.onload = () => {
    let main = document.getElementById('indexMain');

    function showWord() {
        let mainWidth = main.clientWidth;
        let mainHeight = main.clientHeight;
        // console.log('X: ' + e.clientX);
        // console.log('Y: ' + e.clientY);

        let randomWidth = Math.floor(Math.random() * mainWidth);
        let randomHeigth = Math.floor(Math.random() * mainHeight);
        // Math random recibe un numero entre 0 y 1
        // Multiplico por 15 obtengo un numero entre 0 y 15
        // Le sumo 10 obtengo un numero entre 10 y 25
        let randomFont = Math.floor(Math.random() * 15) + 20;
        let randomWord = Math.floor(Math.random() * 17);
        let randomWeight = Math.floor(Math.random() * 2) + 1;
        let randomStyle = Math.floor(Math.random() * 2) + 1;

        let p = document.createElement('p');
        if (randomWeight == 1) {
            p.style.fontWeight = 'bold';
        }
        if (randomStyle == 1) {
            p.style.fontStyle = 'italic';
        }
        p.style.left = randomWidth + 'px';
        p.style.top = (randomHeigth - 50) + 'px';
        p.style.fontSize = randomFont + 'px';
        p.textContent = tecnoWords[randomWord];
        // p.classList.add('visible');
        main.appendChild(p);
    }

    setInterval(showWord, 2000);
    setInterval(removeWord, 2000);

    function removeWord() {
        setTimeout(() => {
            main.firstElementChild.remove();
        }, 2000);
    }

    const tecnoWords = [
        'Accesibilidad',
        'Diversidad',
        'Integración',
        'Innovación',
        'Equidad',
        'Colaboración',
        'Conectividad',
        'Programación',
        'Redes',
        'Tecnología',
        'Desarrollo web',
        'Computación'
    ];
}