const donations = [];
let editIndex = -1;

function validateContactNumber(input) {
    // Remove any non-numeric characters
    input.value = input.value.replace(/[^0-9]/g, '');
    
    // Limit input to 10 digits
    if (input.value.length > 10) {
        input.value = input.value.slice(0, 10);
    }
}

function addDonation() {
    const name = document.getElementById("name").value;
    const bloodGroup = document.getElementById("bloodGroup").value;
    const hemoglobin = document.getElementById("hemoglobin").value;
    const token = document.getElementById("token").value;
    const dob = document.getElementById("dob").value;
    const contact = document.getElementById("contact").value;
    const city = document.getElementById("city").value;

    if (hemoglobin < 1.0 || hemoglobin > 25.0) {
        alert("Hemoglobin level must be between 1.0 and 25.0");
        return;
    }

    if (contact.length !== 10) {
        alert("Please enter a valid 10-digit contact number.");
        return;
    }

    if (name && bloodGroup && hemoglobin && token && dob && contact && city) {
        const donation = { name, bloodGroup, hemoglobin, token, dob, contact, city };
        
        if (editIndex === -1) {
            donations.push(donation);
        } else {
            donations[editIndex] = donation;
            editIndex = -1;
        }

        document.getElementById("donationForm").reset();
        displayDonations();
    } else {
        alert("Please fill out all fields.");
    }
}

function displayDonations() {
    const donationList = document.getElementById("donationList");
    donationList.innerHTML = "";

    donations.forEach((donation, index) => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `
            <div>
                <strong>${donation.name}</strong> - ${donation.bloodGroup}
                <br>Token: ${donation.token} | Hemoglobin: ${donation.hemoglobin} | DOB: ${donation.dob}
                <br>Contact: ${donation.contact} | City: ${donation.city}
            </div>
            <div>
                <button onclick="editDonation(${index})">Edit</button>
                <button onclick="deleteDonation(${index})">Delete</button>
            </div>
        `;
        donationList.appendChild(listItem);
    });
}

function editDonation(index) {
    const donation = donations[index];
    document.getElementById("name").value = donation.name;
    document.getElementById("bloodGroup").value = donation.bloodGroup;
    document.getElementById("hemoglobin").value = donation.hemoglobin;
    document.getElementById("token").value = donation.token;
    document.getElementById("dob").value = donation.dob;
    document.getElementById("contact").value = donation.contact;
    document.getElementById("city").value = donation.city;

    editIndex = index;
}

function deleteDonation(index) {
    donations.splice(index, 1);
    displayDonations();
}
