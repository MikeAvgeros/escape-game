/* jshint esversion: 8 */

function sendMail(contactForm) {
    emailjs.send("gmail", "ms2", {
        "from_name": contactForm.name.value,
        "from_email": contactForm.email.value,
        "message": contactForm.message.value
    })
    .then(
        function() {
            alert("Thank you for getting in touch! I'll get back to you shortly.");
        },
        function(error) {
        console.log('FAILED...', error);
        alert("There was an error with your message. Please try again.");
        }
    );
    return false;  // To block from loading a new page
}
