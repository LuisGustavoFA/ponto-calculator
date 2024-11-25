const form = document.getElementById("form");

function getHour(input, position) {
    return parseInt(input.target[position].value.split(":")[0]);
}

function getMin(input, position) {
    return parseInt(input.target[position].value.split(":")[1]);
}

function calcLimit(hFimIntervalo, mFimIntervalo, totalMinutosTrabalhados) {
    const totalMinPossivel = 560;
    const minutosRestantes = totalMinPossivel - totalMinutosTrabalhados;

    let minutosTotaisFim = hFimIntervalo * 60 + mFimIntervalo + minutosRestantes;
    let horaLimite = Math.floor(minutosTotaisFim / 60);
    let minutoLimite = minutosTotaisFim % 60;

    document.getElementById("finalTime").innerHTML = horaLimite + ":" + (minutoLimite < 10 ? "0" : "") + minutoLimite;
}


form.onsubmit = (event) => {
    event.preventDefault();
    
    let hEntrada = getHour(event, 0);
    let hIntervalo = getHour(event, 1);
    let hFimIntervalo = getHour(event, 2);

    let mEntrada = getMin(event, 0);
    let mIntervalo = getMin(event, 1);
    let mFimIntervalo = getMin(event, 2);
    
    let minutosAntesIntervalo = ((hIntervalo * 60 + mIntervalo) - (hEntrada * 60 + mEntrada));
    let minutosAposIntervalo = ((hFimIntervalo * 60 + mFimIntervalo) - (hIntervalo * 60 + mIntervalo));

    let totalMinutosTrabalhados = minutosAntesIntervalo;
    let totalMinutosTrabalhadosComIntervalo = minutosAntesIntervalo + minutosAposIntervalo;

    let totalIntervalo = totalMinutosTrabalhadosComIntervalo - totalMinutosTrabalhados;

    calcLimit(hFimIntervalo, mFimIntervalo, totalMinutosTrabalhados);
    document.getElementById("finalTimeIntervalo").innerHTML = Math.floor(totalIntervalo / 60) + ":" +  (totalIntervalo % 60 < 10 ? "0" : "") + totalIntervalo % 60;

}
