<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php'; // Assure-toi que PHPMailer est installé

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Clé secrète reCAPTCHA
    $recaptchaSecretKey = "6Lf8EtUqAAAAAKfMgtnyQsqK6ux0sP3bY0BpD1R0"; // Remplace par ta clé secrète

    // Vérification si reCAPTCHA a été soumis
    if (!isset($_POST["g-recaptcha-response"]) || empty($_POST["g-recaptcha-response"])) {
        die("Erreur : Veuillez valider le reCAPTCHA.");
    }

    // Vérifier le reCAPTCHA avec Google
    $recaptchaResponse = $_POST["g-recaptcha-response"];
    $verifyURL = "https://www.google.com/recaptcha/api/siteverify?secret={$recaptchaSecretKey}&response={$recaptchaResponse}&remoteip={$_SERVER['REMOTE_ADDR']}";
    $response = file_get_contents($verifyURL);
    $responseData = json_decode($response);

    // Vérification du succès du reCAPTCHA
    if (!$responseData->success) {
        die("Erreur : reCAPTCHA non validé !");
    }

    // Récupérer et nettoyer les champs du formulaire
    $nom = htmlspecialchars(trim($_POST['nom'] ?? ''));
    $ville = htmlspecialchars(trim($_POST['senderVille'] ?? ''));
    $tel = htmlspecialchars(trim($_POST['senderTel'] ?? ''));
    $email = htmlspecialchars(trim($_POST['senderEmail'] ?? ''));
    $typeLocal = htmlspecialchars(trim($_POST['ProOrPar'] ?? ''));
    $message = htmlspecialchars(trim($_POST['senderMessage'] ?? ''));

    // Vérifier que tous les champs sont remplis
    if (empty($nom) || empty($ville) || empty($tel) || empty($email) || empty($typeLocal) || empty($message)) {
        die("Erreur : Veuillez remplir tous les champs obligatoires.");
    }

    // Vérifier l'adresse email
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        die("Erreur : Adresse email invalide.");
    }

    // Configuration de PHPMailer avec Gmail SMTP
    $mail = new PHPMailer(true);

    try {
        // Paramètres SMTP
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com';
        $mail->SMTPAuth = true;
        $mail->Username = 'simobog77@gmail.com'; // Remplace par ton email Gmail
        $mail->Password = 'idhm gkpw ueny sisc'; // ⚠️ Remplace par ton mot de passe d'application Gmail
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port = 587;

        // Expéditeur et destinataire
        $mail->setFrom($email, $nom);
        $mail->addAddress('simobog77@gmail.com'); // Remplace par ton email de réception

        // Contenu de l'email
        $mail->isHTML(false);
        $mail->Subject = "Demande de devis de $nom";
        $mail->Body = "Nom: $nom\nVille: $ville\nTel: $tel\nEmail: $email\nType de local: $typeLocal\nMessage: $message";

        // Envoyer l'email
        $mail->send();
        
        // Afficher le message de succès
        echo "Votre message a été envoyé avec succès.";

        // Ajouter un script JavaScript pour rediriger après un délai de 5 secondes
        echo '<script type="text/javascript">
                setTimeout(function(){
                    window.location.href = "html.html"; // Page d\'accueil
                }, 5000); // 5000ms = 5 secondes
              </script>';
    } catch (Exception $e) {
        echo "Erreur : L'envoi de l'email a échoué. Détail : {$mail->ErrorInfo}";
    }
} else {
    http_response_code(405);
    echo "Méthode non autorisée.";
}
?>
