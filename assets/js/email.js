/* jshint esversion: 8 */

function sendMail(contactForm) {
    emailjs.send("gmail", "ms2", {
        "from_name": contactForm.name.value,
        "from_email": contactForm.email.value,
        "from_phone": contactForm.phone.value,
        "message": contactForm.description.value
    })
    .then(
        function() {
            document.getElementById("submit-notification").innerHTML = "Thank you for getting in touch! I'll get back to you shortly.";
        },
        function(error) {
        console.log('FAILED...', error);
        document.getElementById("submit-notification").innerHTML = "There was an error with your message. Please try again.";
        }
    );
    return false;  // To block from loading a new page
}
