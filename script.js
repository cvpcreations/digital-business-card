async function loadData() {
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
        img.src = data.profileImage;
        img.style.display = "block";
    }

    // Call
    if (data.phone) {
        const btn = document.getElementById("callBtn");
        btn.href = "tel:" + data.phone;
        btn.style.display = "flex";
    }

    // WhatsApp
    if (data.whatsapp) {
        const btn = document.getElementById("whatsappBtn");
        btn.href = "https://wa.me/" + data.whatsapp;
        btn.style.display = "flex";
    }

    // Email
    if (data.email) {
        const btn = document.getElementById("emailBtn");
        btn.href = "mailto:" + data.email;
        btn.style.display = "flex";
    }

    // Website
    if (data.website) {
        const btn = document.getElementById("websiteBtn");
        btn.href = data.website;
        btn.target = "_blank";
        btn.style.display = "flex";
    }

    // Directions
    if (data.googleMaps) {
        const btn = document.getElementById("directionBtn");
        btn.href = data.googleMaps;
        btn.target = "_blank";
        btn.style.display = "flex";
    }

    // About
    if (data.about) {
        document.getElementById("about").textContent = data.about;
        document.getElementById("aboutSection").style.display = "block";
    }

    // Address
    if (data.address) {
        document.getElementById("address").textContent = data.address;
        document.getElementById("addressSection").style.display = "block";
    }

    // Share Button
    document.getElementById("shareBtn").addEventListener("click", async () => {
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

loadData();
