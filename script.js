//resource list
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

// keep track of which resources are currently being shown
// this changes when people use the search or filters
let filteredResources = [...resources];

// figure out which colored badge to use for each category
// each category has its own color to make them easier to tell apart
function getBadgeClass(category) {
    // match the category name to a CSS class
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
    
    // Default color if something doesn't match
    return "badge-secondary";
}

// show the resources on the page
// takes a list of resources and turns them into cards
function displayResources(resourcesToShow) {
    const grid = document.getElementById("resourceGrid");
    
    // if there are no results then show a message instead
    if (resourcesToShow.length === 0) {
        grid.innerHTML = `
            <div class="no-results">
                <p>No resources found matching your search.</p>
                <p>Try adjusting your filters or search term.</p>
            </div>
        `;
        return;
    }

    
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

    // update count
    const countElement = document.getElementById("resultCount");
    if (countElement) {
        countElement.textContent = resourcesToShow.length;
    }
}

// run the search and filter
function applyFilters() {
    // get what the user typed or selected
    const searchText = document.getElementById("searchInput").value.toLowerCase();
    const selectedCategory = document.getElementById("categoryFilter").value;
    const selectedAvailability = document.getElementById("availabilityFilter").value;

    // go through all resources and see which ones match
    filteredResources = [];
    for (let i = 0; i < resources.length; i++) {
        const resource = resources[i];
        
        // check if the search text appears in the name or description
        const matchesSearch = 
            resource.name.toLowerCase().includes(searchText) ||
            resource.description.toLowerCase().includes(searchText);
        
        // check if the category matches
        const matchesCategory = 
            selectedCategory === "" || resource.category === selectedCategory;
        
        // check if the availability matches
        const matchesAvailability = 
            selectedAvailability === "" || resource.availability === selectedAvailability;

        // if all filters match, then add this resource to the results
        if (matchesSearch && matchesCategory && matchesAvailability) {
            filteredResources.push(resource);
        }
    }

    // show the filtered results on the page
    displayResources(filteredResources);
}

// update results as the user types in the search box
const searchBox = document.getElementById("searchInput");
if (searchBox) {
    searchBox.addEventListener("input", applyFilters);
}

// update results when category filter changes
const categoryDropdown = document.getElementById("categoryFilter");
if (categoryDropdown) {
    categoryDropdown.addEventListener("change", applyFilters);
}

// update results when availability filter changes
const availabilityDropdown = document.getElementById("availabilityFilter");
if (availabilityDropdown) {
    availabilityDropdown.addEventListener("change", applyFilters);
}

// handle the form submission on the submit page
const submitForm = document.getElementById("submitForm");
if (submitForm) {
    submitForm.addEventListener("submit", function(event) {
        event.preventDefault(); // stop reloads
        
        // show success message
        const successMessage = document.getElementById("successMessage");
        successMessage.style.display = "block";
        
        // clear all the form fields
        submitForm.reset();
        
        // scroll to the success message so the user can see it
        successMessage.scrollIntoView({ behavior: "smooth" });
        
        // hide message after 5 seconds
        setTimeout(function() {
            successMessage.style.display = "none";
        }, 5000);
    });
}

// when page first loads, show all the resources
displayResources(resources);
// ==========================================
// EMERGENCY PANEL FUNCTIONALITY
// ==========================================

function toggleEmergency() {
    const content = document.getElementById('emergencyContent');
    content.classList.toggle('show');
}

// close emergency panel when clicking outside
document.addEventListener('click', function(event) {
    const panel = document.getElementById('emergencyPanel');
    const content = document.getElementById('emergencyContent');
    
    if (panel && content.classList.contains('show')) {
        if (!panel.contains(event.target)) {
            content.classList.remove('show');
        }
    }
});

