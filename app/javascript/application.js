// Configure your import map in config/importmap.rb. Read more: https://github.com/rails/importmap-rails
import "@hotwired/turbo-rails"
import "controllers"

document.addEventListener("DOMContentLoaded", function() {
    const openModalBtns = document.querySelectorAll(".open-comment-modal");
    const modal = document.getElementById("modal");
    const modalContent = document.querySelector(".modal-content");
    const closeModalBtn = document.querySelector(".close");

    openModalBtns.forEach(function(btn) {
        btn.addEventListener("click", function() {
            const articleId = btn.dataset.articleId;
            // Use AJAX to fetch the comment form HTML
            fetch(`/articles/${articleId}/comments/new`, {
                method: "GET"
            })
            .then(response => response.text())
            .then(data => {
                // Create a temporary element
                const tempElement = document.createElement('div');
                // Set the fetched HTML as the content of the temporary element
                tempElement.innerHTML = data;
                // Find the <form> element within the temporary element
                const form = tempElement.querySelector('form');
                if (form) {
                    // Set the modal content to be the <form> element
                    modalContent.innerHTML = form.outerHTML;
                    // Display the modal
                    modal.style.display = "block";
                } else {
                    console.error('Form not found in fetched data');
                }
            })
            .catch(error => console.error("Error fetching comment form:", error));
        });
    });

    closeModalBtn.addEventListener("click", function() {
        modal.style.display = "none";
    });

    window.addEventListener("click", function(event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });
});