document.addEventListener("DOMContentLoaded", () => {
    const navToggle = document.querySelector("[data-nav-toggle]");
    const navCard = document.querySelector(".nav-card");
    const chatToggle = document.querySelector("[data-chat-toggle]");
    const chatPanel = document.querySelector("[data-chat-panel]");
    const chatClose = document.querySelector("[data-chat-close]");
    const faqItems = document.querySelectorAll(".faq-item");
    const waForm = document.querySelector("[data-wa-form]");
    const lightbox = document.querySelector("[data-lightbox]");
    const lightboxImage = document.querySelector("[data-lightbox-image]");
    const lightboxTriggers = document.querySelectorAll("[data-lightbox-trigger]");
    const closeLightboxButton = document.querySelector("[data-lightbox-close]");
    const yearNodes = document.querySelectorAll("[data-year]");

    yearNodes.forEach((node) => {
        node.textContent = new Date().getFullYear();
    });

    if (navToggle && navCard) {
        navToggle.addEventListener("click", () => {
            const isOpen = navCard.classList.toggle("menu-open");
            navToggle.setAttribute("aria-expanded", String(isOpen));
        });

        navCard.querySelectorAll(".nav-links a").forEach((link) => {
            link.addEventListener("click", () => {
                navCard.classList.remove("menu-open");
                navToggle.setAttribute("aria-expanded", "false");
            });
        });
    }

    if (chatToggle && chatPanel) {
        chatToggle.addEventListener("click", () => {
            const isOpen = chatPanel.classList.toggle("open");
            chatToggle.setAttribute("aria-expanded", String(isOpen));
        });
    }

    if (chatClose && chatPanel && chatToggle) {
        chatClose.addEventListener("click", () => {
            chatPanel.classList.remove("open");
            chatToggle.setAttribute("aria-expanded", "false");
        });
    }

    document.querySelectorAll("[data-chat-question]").forEach((button) => {
        button.addEventListener("click", () => {
            if (!chatPanel) {
                return;
            }

            const answer = button.getAttribute("data-chat-answer");
            if (!answer) {
                return;
            }

            const chatBody = chatPanel.querySelector(".chat-body");
            if (!chatBody) {
                return;
            }

            const existingResponse = chatBody.querySelector(".chat-response");
            if (existingResponse) {
                existingResponse.innerHTML = answer;
                return;
            }

            const msg = document.createElement("div");
            msg.className = "bot-msg chat-response";
            msg.innerHTML = answer;
            chatBody.appendChild(msg);
        });
    });

    faqItems.forEach((item) => {
        const trigger = item.querySelector(".faq-trigger");
        if (!trigger) {
            return;
        }

        trigger.addEventListener("click", () => {
            const isOpen = item.classList.toggle("active");
            trigger.setAttribute("aria-expanded", String(isOpen));
        });
    });

    if (waForm) {
        waForm.addEventListener("submit", (event) => {
            event.preventDefault();

            const name = document.querySelector("#name")?.value?.trim() || "Website Visitor";
            const userType = document.querySelector("#userType")?.value || "General Inquiry";
            const service = document.querySelector("#serviceType")?.value || "Website Development";
            const message = document.querySelector("#message")?.value?.trim() || "Need more information";

            const finalMessage = encodeURIComponent(
                `Hi, I am ${name} (${userType}). I need help with ${service}. Details: ${message}`
            );

            window.open(`https://wa.me/918522836109?text=${finalMessage}`, "_blank", "noopener");
        });
    }

    const closeLightbox = () => {
        if (!lightbox || !lightboxImage) {
            return;
        }

        lightbox.hidden = true;
        lightboxImage.src = "";
        lightboxImage.alt = "";
        document.body.style.overflow = "";
    };

    lightboxTriggers.forEach((trigger) => {
        trigger.addEventListener("click", () => {
            if (!lightbox || !lightboxImage) {
                return;
            }

            lightboxImage.src = trigger.getAttribute("src") || "";
            lightboxImage.alt = trigger.getAttribute("alt") || "Project preview";
            lightbox.hidden = false;
            document.body.style.overflow = "hidden";
        });
    });

    if (closeLightboxButton) {
        closeLightboxButton.addEventListener("click", closeLightbox);
    }

    if (lightbox) {
        lightbox.addEventListener("click", (event) => {
            if (event.target === lightbox) {
                closeLightbox();
            }
        });
    }

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            closeLightbox();
        }
    });
});
