// List of all community resources
const resources = [
    {
        name: "Baytown Area Food Bank",
        category: "Food Assistance",
        description: "Provides groceries and meals for families and individuals in need in the Baytown area",
        phone: "(281) 424-5752",
        email: "info@baytownareafoodbank.org",
        hours: "Mon–Fri 8 AM – 4 PM",
        availability: "Business Hours"
    },
    {
        name: "Lee College Counseling Services",
        category: "Mental Health",
        description: "Affordable counseling and mental health support for students and community members",
        phone: "(281) 425-6384",
        email: "counseling@lee.edu",
        hours: "Mon–Fri 8 AM – 5 PM",
        availability: "Business Hours"
    },
    {
        name: "Baytown Youth Advisory Council",
        category: "Youth Services",
        description: "Leadership development, volunteering, and community projects for teens",
        phone: "(281) 420-6597",
        email: "youth@baytown.org",
        hours: "After school hours and weekends",
        availability: "Weekends"
    },
    {
        name: "Houston Methodist Baytown Hospital",
        category: "Healthcare",
        description: "Full-service hospital providing emergency care and medical services",
        phone: "(281) 420-8600",
        email: "info@houstonmethodist.org",
        hours: "24/7 Emergency Services",
        availability: "24/7"
    },
    {
        name: "Sterling Municipal Library",
        category: "Education",
        description: "Public library offering books, tutoring programs, and free computer access",
        phone: "(281) 427-7331",
        email: "library@baytown.org",
        hours: "Mon–Sat 9 AM – 6 PM",
        availability: "Weekends"
    },
    {
        name: "Crisis Center of Harris & Galveston Counties",
        category: "Housing",
        description: "Emergency shelter and crisis support for families and individuals",
        phone: "(281) 286-2525",
        email: "info@crisiscenter.org",
        hours: "24/7 Hotline",
        availability: "24/7"
    },
    {
        name: "Baytown Senior Center",
        category: "Senior Services",
        description: "Meals, social activities, and wellness programs for seniors",
        phone: "(281) 420-6597",
        email: "seniors@baytown.org",
        hours: "Mon–Fri 8 AM – 4 PM",
        availability: "Business Hours"
    },
    {
        name: "Workforce Solutions – Baytown Office",
        category: "Employment",
        description: "Job search help, resume workshops, and career training resources",
        phone: "(281) 837-0070",
        email: "info@wrksolutions.com",
        hours: "Mon–Fri 8 AM – 5 PM",
        availability: "Business Hours"
    },
    {
        name: "Lone Star Legal Aid – Baytown",
        category: "Legal Aid",
        description: "Free civil legal help for low-income residents",
        phone: "(800) 733-8394",
        email: "intake@lonestarlegal.org",
        hours: "Mon–Fri 9 AM – 4 PM",
        availability: "Business Hours"
    },
    {
        name: "Baytown Community Center",
        category: "Recreation",
        description: "Fitness classes, youth sports, and community programs",
        phone: "(281) 420-6597",
        email: "parks@baytown.org",
        hours: "Mon–Fri 6 AM – 8 PM, Sat 8 AM – 2 PM",
        availability: "Weekends"
    },
    {
        name: "Baytown Fire Department",
        category: "Emergency Services",
        description: "Fire emergency response and community safety education",
        phone: "911 or (281) 422-0094",
        email: "fire@baytown.org",
        hours: "24/7 Emergency Response",
        availability: "24/7"
    },
    {
        name: "Baytown Farmers Market",
        category: "Community Events",
        description: "Weekly outdoor market featuring local vendors and fresh produce",
        phone: "(281) 420-6597",
        email: "events@baytown.org",
        hours: "Saturdays 9 AM – 1 PM",
        availability: "Weekends"
    }
];

// Track filtered resources
let filteredResources = [...resources];

// Get the correct badge class for each category
function getBadgeClass(category) {
    if (category === "Healthcare") return "badge-healthcare";
    if (category === "Education") return "badge-education";
    if (category === "Food Assistance") return "badge-food";
    if (category === "Housing") return "badge-housing";
    if (category === "Mental Health") return "badge-mental";
    if (category === "Youth Services") return "badge-youth";
    if (category === "Senior Services") return "badge-senior";
    if (category === "Employment") return "badge-employment";
    if (category === "Legal Aid") return "badge-legal";
    if (category === "Recreation") return "badge-recreation";
    if (category === "Emergency Services") return "badge-emergency";
    if (category === "Community Events") return "badge-events";
    
    return "badge-secondary";
}

// Display resources on the page
function displayResources(resourcesToShow) {
    const grid = document.getElementById("resourceGrid");
    
    // Show message if no results
    if (resourcesToShow.length === 0) {
        grid.innerHTML = `
            <div class="no-results">
                <p>No resources found matching your search.</p>
                <p>Try adjusting your filters or search term.</p>
            </div>
        `;
        return;
    }

    // Build HTML for each resource card
    let htmlContent = "";
    for (let i = 0; i < resourcesToShow.length; i++) {
        const resource = resourcesToShow[i];
        
        htmlContent += `
            <div class="card">
                <span class="category-badge ${getBadgeClass(resource.category)}">
                    ${resource.category}
                </span>
                <h3>${resource.name}</h3>
                <p>${resource.description}</p>
                <p><strong>Phone:</strong> ${resource.phone}</p>
                <p><strong>Email:</strong> ${resource.email}</p>
                <p><strong>Hours:</strong> ${resource.hours}</p>
            </div>
        `;
    }
    
    grid.innerHTML = htmlContent;

    // Update the result
    const countElement = document.getElementById("resultCount");
    if (countElement) {
        countElement.textContent = resourcesToShow.length;
    }
}


// Apply search and filter criteria
function applyFilters() {
    const searchText = document.getElementById("searchInput").value.toLowerCase();
    const selectedCategory = document.getElementById("categoryFilter").value;
    const selectedAvailability = document.getElementById("availabilityFilter").value;

    // Filter
    filteredResources = [];
    for (let i = 0; i < resources.length; i++) {
        const resource = resources[i];
        
        // Check search text
        const matchesSearch = 
            resource.name.toLowerCase().includes(searchText) ||
            resource.description.toLowerCase().includes(searchText);
        
        // Check if category matches
        const matchesCategory = 
            selectedCategory === "" || resource.category === selectedCategory;
        
        // Check if availability matches
        const matchesAvailability = 
            selectedAvailability === "" || resource.availability === selectedAvailability;

        // Add to results if all filters match
        if (matchesSearch && matchesCategory && matchesAvailability) {
            filteredResources.push(resource);
        }
    }


    displayResources(filteredResources);
}

// Live filtering event listeners
const searchBox = document.getElementById("searchInput");
if (searchBox) {
    searchBox.addEventListener("input", applyFilters);
}

const categoryDropdown = document.getElementById("categoryFilter");
if (categoryDropdown) {
    categoryDropdown.addEventListener("change", applyFilters);
}

const availabilityDropdown = document.getElementById("availabilityFilter");
if (availabilityDropdown) {
    availabilityDropdown.addEventListener("change", applyFilters);
}


// Handle form submission
const submitForm = document.getElementById("submitForm");
if (submitForm) {
    submitForm.addEventListener("submit", function(event) {
        event.preventDefault();
        
        // Show success message
        const successMessage = document.getElementById("successMessage");
        successMessage.style.display = "block";
        
        // Clear form
        submitForm.reset();
        
        // Scroll to success message
        successMessage.scrollIntoView({ behavior: "smooth" });
        
        // Hide message after 5 seconds
        setTimeout(function() {
            successMessage.style.display = "none";
        }, 5000);
    });
}


// Display all resources when page loads
displayResources(resources);

// Emergency panel toggle
function toggleEmergency() {
    const content = document.getElementById('emergencyContent');
    content.classList.toggle('show');
}

// Close emergency panel when clicking outside
document.addEventListener('click', function(event) {
    const panel = document.getElementById('emergencyPanel');
    const content = document.getElementById('emergencyContent');
    
    if (panel && content.classList.contains('show')) {
        if (!panel.contains(event.target)) {
            content.classList.remove('show');
        }
    }
});