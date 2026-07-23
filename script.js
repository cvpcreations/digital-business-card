async function loadData() {

    try {

        const response = await fetch("data.json");
        const data = await response.json();

        /* ==========================
           PROFILE
        ========================== */

        document.getElementById("name").textContent = data.name || "";
        document.getElementById("designation").textContent = data.designation || "";
        document.getElementById("company").textContent = data.company || "";
        document.getElementById("tagline").textContent = data.tagline || "";

        const profileImage = document.getElementById("profileImage");
        const profileInitials = document.getElementById("profileInitials");

        if (data.profileImage && data.profileImage.trim() !== "") {

            profileImage.src = data.profileImage;
            profileImage.style.display = "block";
            profileInitials.style.display = "none";

        } else {

            const words = (data.name || "")
                .trim()
                .split(/\s+/)
                .filter(word => word.length > 0);

            let initials = "";

            if (words.length >= 2) {
                initials =
                    words[0][0].toUpperCase() +
                    words[1][0].toUpperCase();
            }
            else if (words.length === 1) {
                initials = words[0].substring(0, 2).toUpperCase();
            }

            profileInitials.textContent = initials;
            profileInitials.style.display = "flex";
            profileImage.style.display = "none";
        }

        /* ==========================
           CALL
        ========================== */

        if (data.phone) {

            const btn = document.getElementById("callBtn");

            btn.href = "tel:" + data.phone;
            btn.style.display = "flex";

        }

        /* ==========================
           WHATSAPP
        ========================== */

        if (data.whatsapp) {

            const btn = document.getElementById("whatsappBtn");

            btn.href = "https://wa.me/" + data.whatsapp;
            btn.target = "_blank";
            btn.style.display = "flex";

        }

        /* ==========================
           ABOUT
        ========================== */

        if (data.about) {

            document.getElementById("about").textContent = data.about;
            document.getElementById("aboutSection").style.display = "block";

        }

        /* ==========================
           ADDRESS
        ========================== */

        if (data.address) {

            document.getElementById("address").textContent = data.address;
            document.getElementById("addressSection").style.display = "block";

        }

        /* ==========================
           SAVE CONTACT
        ========================== */

        const saveBtn = document.getElementById("saveBtn");

        saveBtn.href = "contact.vcf";
        saveBtn.download = (data.name || "Contact") + ".vcf";
        saveBtn.style.display = "flex";

        /* ==========================
           SHARE
        ========================== */

        document.getElementById("shareBtn").addEventListener("click", async () => {

            if (navigator.share) {

                try {

                    await navigator.share({
                        title: data.name,
                        text: data.company,
                        url: window.location.href
                    });

                } catch (e) {}

            } else {

                await navigator.clipboard.writeText(window.location.href);

                alert("Link copied to clipboard.");

            }

        });

    }

    catch (error) {

        console.error(error);

    }

}

loadData();
