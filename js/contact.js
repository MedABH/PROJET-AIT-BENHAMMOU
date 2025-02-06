$(document).ready(function () { $("#Part").hide(); $("#Prof").hide(); $("#atre").hide(); });

let sltplc = document.querySelector('#TypeLocal');
sltplc.addEventListener('change', function () {

    if (this.value == '2') {
        $("#Prof").show();
        $("#atre").hide();
        $('#atr').val('');
        $("#Part").hide();
        $("#pr")[0].selectedIndex = 0;

        let slpf = document.querySelector("#pf");
        slpf.addEventListener('change', function () {
            if (this.value == 10) {
                $("#atre").show();
            }
            else {
                $("#atre").hide();
                $('#atr').val('');
            }
        });
    }
    else
        if (this.value == '1') {
            $("#Part").show();
            $("#atre").hide();
            $('#atr').val('');
            $("#Prof").hide();
            $("#pf")[0].selectedIndex = 0;

            let slpr = document.querySelector("#pr");
            slpr.addEventListener('change', function () {
                if (this.value == 5) {
                    $("#atre").show();
                }
                else {
                    $("#atre").hide();
                    $('#atr').val('');
                }
            });
        }
});

function onlyNumberKey(evt) {
    // Only ASCII character in that range allowed
    var ASCIICode = (evt.which) ? evt.which : evt.keyCode
    if (ASCIICode > 31 && (ASCIICode < 48 || ASCIICode > 57))
        return false;
    return true;
}

var nav = document.getElementById("nav");

window.addEventListener("scroll", function () {
    if (window.scrollY >= (nav.offsetTop)) {
        nav.style.cssText = 'position: fixed ; width: 100vw';
    }
    if (window.scrollY < (nav.offsetTop + 100)) {
        nav.style.cssText = 'position: relative ; width: 100vw';
    }

});

// Fonction pour générer un CAPTCHA
function generateCaptcha() {
    const num1 = Math.floor(Math.random() * 10);
    const num2 = Math.floor(Math.random() * 10);
    return { question: `Quel est la somme de ${num1} + ${num2} ?`, answer: num1 + num2 };
}

// Génération initiale du CAPTCHA
let captcha = generateCaptcha();
document.getElementById('captchaQuestion').innerText = captcha.question;

// Gestion de l'événement de soumission
document.getElementById('devisForm').addEventListener('submit', function (event) {
    const userAnswer = parseInt(document.getElementById('captchaAnswer').value);
    const errorMessage = document.getElementById('errorMessage');

    if (userAnswer === captcha.answer) {
        // Si la réponse est correcte, laisser le formulaire s'envoyer
        errorMessage.innerText = ''; // Supprime le message d'erreur
    } else {
        // Si la réponse est incorrecte, empêcher l'envoi et afficher un message
        event.preventDefault(); // Bloque l'envoi du formulaire
        errorMessage.innerText = 'Le nombre est incorrect. Veuillez réessayer.';
        // Générer un nouveau CAPTCHA
        captcha = generateCaptcha();
        document.getElementById('captchaQuestion').innerText = captcha.question;
        document.getElementById('captchaAnswer').value = ''; // Réinitialiser le champ de réponse
    }
});