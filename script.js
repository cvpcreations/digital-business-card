async function loadData() {
    try {

        const response = await fetch("data.json");
        const data = await response.json();

        // Profile
        document.getElementById("name").textContent = data.name || "";
        document.getElementById("designation").textContent = data.designation || "";
        document.getElementById("company").textContent = data.company || "";
        document.getElementById("tagline").textContent = data.tagline || "";

        // Profile Image
        if (data.profileImage) {
            const img = document.getElementById("profileImage");
            if (img) {
                img.src = data.profileImage;
                img.style.display = "block";
            }
        }

        // Call
        if (data.phone) {
            const btn = document.getElementById("callBtn");
            if (btn) {
                btn.href = "tel:" + data.phone;
                btn.style.display = "flex";
            }
        }

        // WhatsApp
        if (data.whatsapp) {
            const btn = document.getElementById("whatsappBtn");
            if (btn) {
                btn.href = "https://wa.me/" + data.whatsapp;
                btn.style.display = "flex";
            }
        }

        // Email
        if (data.email) {
            const btn = document.getElementById("emailBtn");
            if (btn) {
                btn.href = "mailto:" + data.email;
                btn.style.display = "flex";
            }
        }

        // Website
        if (data.website) {
            const btn = document.getElementById("websiteBtn");
            if (btn) {
                btn.href = data.website;
                btn.target = "_blank";
                btn.style.display = "flex";
            }
        }

        // Directions
        if (data.googleMaps) {
            const btn = document.getElementById("directionBtn");
            if (btn) {
                btn.href = data.googleMaps;
                btn.target = "_blank";
                btn.style.display = "flex";
            }
        }

        // About
        if (data.about) {
            const about = document.getElementById("about");
            const aboutSection = document.getElementById("aboutSection");

            if (about && aboutSection) {
                about.textContent = data.about;
                aboutSection.style.display = "block";
            }
        }

        // Address
        if (data.address) {
            const address = document.getElementById("address");
            const addressSection = document.getElementById("addressSection");

            if (address && addressSection) {
                address.textContent = data.address;
                addressSection.style.display = "block";
            }
        }

        // Save Contact
        const saveBtn = document.getElementById("saveBtn");

        if (saveBtn) {
            saveBtn.href = "contact.vcf";
            saveBtn.setAttribute("download", (data.name || "Contact") + ".vcf");
            saveBtn.style.display = "flex";
        }

        // Share
        const shareBtn = document.getElementById("shareBtn");

        if (shareBtn) {
            shareBtn.addEventListener("click", async () => {
                if (navigator.share) {
                    await navigator.share({
                        title: data.name,
                        text: data.company,
                        url: window.location.href
                    });
                } else {
                    alert("Sharing is not supported on this device.");
                }
            });
        }

    } catch (err) {
        console.error("SCRIPT ERROR:", err);
    }
}

loadData();
