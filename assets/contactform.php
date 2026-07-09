<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require __DIR__ . '/vendor/autoload.php';

// Show errors for debugging
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

if(isset($_POST['submit'])){
    $name = htmlspecialchars($_POST['name']);
    $contact = filter_var($_POST['contact'], FILTER_SANITIZE_EMAIL);
    $message = htmlspecialchars($_POST['message']);

    $mail = new PHPMailer(true);

    try {
        // Server settings
        $mail->isSMTP();
        $mail->Host       = 'smtp.gmail.com';      // Gmail SMTP server
        $mail->SMTPAuth   = true;
        $mail->Username   = 'manu@manupessoalima.com'; // your Gmail
        $mail->Password   = 'jhurknzyoghtzbvm';           // the 16-character App Password
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port       = 587;

        // Recipients
        $mail->setFrom('info@albumfactory.com', 'Album Factory'); // sender info
        $mail->addAddress('manu@manupessoalima.com');               // where the emails go
        $mail->addReplyTo($contact, $name);
                                   

        // Content
        $mail->isHTML(false);
        $mail->Subject = "New contact form submission";
        $mail->Body    = "You have received an e-mail from $name ($contact):\n\n$message";

        $mail->send();
        echo "Success";  // message shown on page
    } catch (Exception $e) {
        echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
    }
}