document.addEventListener("DOMContentLoaded", function() {
    // Form Validation
    function validateForm(form) {
        let isValid = true;
        form.querySelectorAll("input, textarea").forEach(function(input) {
            if (!input.checkValidity()) {
                isValid = false;
                input.classList.add("invalid");
            } else {
                input.classList.remove("invalid");
            }
        });
        return isValid;
    }

    // Show Loading Spinner
    function showLoadingSpinner() {
        const spinner = document.createElement("div");
        spinner.classList.add("spinner");
        document.body.appendChild(spinner);
    }

    // Hide Loading Spinner
    function hideLoadingSpinner() {
        const spinner = document.querySelector(".spinner");
        if (spinner) {
            document.body.removeChild(spinner);
        }
    }

    // Show Success Message
    function showSuccessMessage(message) {
        const successMessage = document.createElement("div");
        successMessage.classList.add("success-message");
        successMessage.innerText = message;
        document.body.appendChild(successMessage);
        setTimeout(() => {
            document.body.removeChild(successMessage);
        }, 3000);
    }

    // Show Error Message
    function showErrorMessage(message) {
        const errorMessage = document.createElement("div");
        errorMessage.classList.add("error-message");
        errorMessage.innerText = message;
        document.body.appendChild(errorMessage);
        setTimeout(() => {
            document.body.removeChild(errorMessage);
        }, 3000);
    }

    // Search Artwork
    function searchArtwork() {
        const query = document.getElementById('search-input').value.toLowerCase();
        const gallery = document.getElementById('art-gallery');
        const artworks = gallery.getElementsByClassName('artwork');

        for (let i = 0; i < artworks.length; i++) {
            const artwork = artworks[i];
            const title = artwork.getElementsByTagName('h4')[0].innerText.toLowerCase();
            if (title.includes(query)) {
                artwork.style.display = 'block';
            } else {
                artwork.style.display = 'none';
            }
        }
    }

    // Event Listener for Search Artwork
    document.getElementById('search-input').addEventListener('input', searchArtwork);

    // Rating and Comment Form Submission
    document.getElementById('rating-form').addEventListener('submit', function(event) {
        event.preventDefault();
        if (validateForm(this)) {
            const rating = document.getElementById('rating').value;
            const comment = document.getElementById('comment').value;
            const commentsSection = document.getElementById('comments-section');

            const newComment = document.createElement('div');
            newComment.innerHTML = `<strong>Rating:</strong> ${rating}/5 <br> <strong>Comment:</strong> ${comment}`;
            commentsSection.appendChild(newComment);

            // Clear form
            this.reset();
            showSuccessMessage("Thank you for your feedback!");
        } else {
            showErrorMessage("Please fill out all required fields.");
        }
    });

    // Contact Form Submission via AJAX
    document.querySelector('#contact-form form').addEventListener('submit', function(event) {
        event.preventDefault();
        if (validateForm(this)) {
            showLoadingSpinner();
            const formData = new FormData(this);
            fetch(this.action, {
                method: 'POST',
                body: formData
            })
            .then(response => response.text())
            .then(data => {
                hideLoadingSpinner();
                showSuccessMessage("Thank you for your message! We will get back to you soon.");
                this.reset();
            })
            .catch(error => {
                hideLoadingSpinner();
                showErrorMessage("There was an error submitting your message. Please try again later.");
            });
        } else {
            showErrorMessage("Please fill out all required fields.");
        }
    });
});
