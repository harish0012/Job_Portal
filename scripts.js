let currentCategory = "finance";
const appliedJobs = new Set();

const jobsData = {
  finance: [
    {
      role: "Financial Analyst",
      company: "ABC Corp",
      location: "NY",
      ctc: "50k-60k",
      description:
        "Analyze financial data to help improve company strategies and decisions.",
      skills: "Excel, Data Analysis, Accounting Knowledge",
    },
    {
      role: "Investment Banker",
      company: "XYZ Inc",
      location: "London",
      ctc: "70k-90k",
      description:
        "Assist clients with mergers, acquisitions, and financial strategies.",
      skills: "Financial Modeling, Communication, Analytical Thinking",
    },
    {
      role: "Risk Manager",
      company: "Trust Financial",
      location: "Dallas, TX",
      ctc: "70k-80k",
      description:
        "Identify and mitigate financial risks, assess market conditions, and develop risk management strategies.",
      skills:
        "Risk Assessment, Data Analysis, Financial Modeling, Strategic Planning",
    },
    {
      role: "Corporate Treasurer",
      company: "Global Enterprises",
      location: "Boston, MA",
      ctc: "85k-100k",
      description:
        "Oversee the company’s financial operations, including cash management, funding, and investments.",
      skills:
        "Cash Flow Management, Financial Strategy, Accounting, Regulatory Compliance",
    },
    {
      role: "Credit Analyst",
      company: "Capital Bank",
      location: "Miami, FL",
      ctc: "50k-60k",
      description:
        "Analyze the creditworthiness of individuals or companies and provide recommendations on lending decisions.",
      skills:
        "Credit Risk Assessment, Excel, Financial Reporting, Debt Analysis",
    },
  ],
  marketing: [
    {
      role: "Marketing Specialist",
      company: "Marketing Co",
      location: "Remote",
      ctc: "45k-60k",
      description:
        "Plan, implement and optimize marketing strategies for various campaigns.",
      skills: "SEO, Content Writing, Social Media Management",
    },
    {
      role: "Content Marketing Specialist",
      company: "Creative Solutions",
      location: "San Francisco, CA",
      ctc: "55k-65k",
      description:
        "Create and manage content across various platforms to engage customers and drive website traffic.",
      skills: "Copywriting, SEO, Content Strategy, Social Media Management",
    },
    {
      role: "SEO Specialist",
      company: "Web Marketing Inc.",
      location: "Los Angeles, CA",
      ctc: "55k-65k",
      description:
        "Optimize website content and structure to improve search engine rankings and drive organic traffic.",
      skills: "SEO, Google Analytics, Keyword Research, On-Page Optimization",
    },
    {
      role: "Product Marketing Manager",
      company: "Tech Gadgets Co.",
      location: "Austin, TX",
      ctc: "80k-90k",
      description:
        "Lead product launches, create positioning strategies, and communicate product benefits to the market.",
      skills:
        "Market Research, Product Positioning, Campaign Management, Communication",
    },
    {
      role: "Brand Strategist",
      company: "NextGen Marketing",
      location: "Chicago, IL",
      ctc: "75k-85k",
      description:
        "Develop and execute brand strategies to build brand recognition and loyalty.",
      skills:
        "Brand Management, Market Research, Consumer Insights, Strategic Planning",
    },
  ],
  tech: [
    {
      role: "Software Developer",
      company: "Tech Solutions",
      location: "Remote",
      ctc: "60k-80k",
      description: "Develop software solutions and maintain technical systems.",
      skills: "JavaScript, Python, Problem-Solving",
    },
    {
      role: "Data Scientist",
      company: "Tech Innovations",
      location: "San Jose, CA",
      ctc: "90k-110k",
      description:
        "Analyze and interpret complex data sets to drive business insights and decision-making.",
      skills: "Python, Machine Learning, Data Analysis, SQL",
    },
    {
      role: "UI/UX Designer",
      company: "Creative Digital",
      location: "Denver, CO",
      ctc: "70k-85k",
      description:
        "Design intuitive user interfaces and experiences that enhance customer satisfaction.",
      skills: "Adobe XD, Sketch, User Testing, Wireframing",
    },
    {
      role: "Cloud Architect",
      company: "CloudTech Inc.",
      location: "Dallas, TX",
      ctc: "110k-130k",
      description:
        "Design cloud infrastructure and ensure efficient cloud adoption for the business.",
      skills: "AWS, Cloud Architecture, Kubernetes, Infrastructure as Code",
    },
    {
      role: "Cybersecurity Analyst",
      company: "SecureTech Solutions",
      location: "Washington, DC",
      ctc: "75k-95k",
      description:
        "Monitor and protect the company’s network from cyber threats and security breaches.",
      skills: "Network Security, Firewalls, Risk Management, Ethical Hacking",
    },
  ],
};

function showJobs(category) {
  currentCategory = category;
  document.getElementById("category-title").innerText =
    category.charAt(0).toUpperCase() + category.slice(1) + " Jobs";
  const jobList = document.getElementById("job-list");
  jobList.innerHTML = "";

  jobsData[category].forEach((job, index) => {
    const isApplied = appliedJobs.has(`${category}-${index}`);
    jobList.innerHTML += `
      <div class="job-card" id="job-${index}">
        <h5>${job.role}</h5>
        <p><i class="fa fa-building"></i> Company: ${job.company}</p>
        <p><i class="fa fa-map-marker-alt"></i> Location: ${job.location}</p>
        <p><i class="fa fa-money-bill-wave"></i> CTC: ${job.ctc}</p>
        <a href="#" class="view-more-link" data-index="${index}" data-category="${category}">View More</a>
        <div class="extra-details d-none" id="details-${index}">
          <p><strong>Description:</strong> ${job.description}</p>
          <p><strong>Required Skills:</strong> ${job.skills}</p>
        </div>
        <button class="btn btn-primary apply-btn ${
          isApplied ? "applied" : ""
        }" data-index="${index}" data-category="${category}">
          ${isApplied ? "Applied" : "Apply"}
        </button>
      </div>
    `;
  });

  document.querySelectorAll(".view-more-link").forEach((link) => {
    link.addEventListener("click", (e) => toggleDetails(e));
  });

  document.querySelectorAll(".apply-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => openApplyForm(e.target.dataset.index));
  });
}

function toggleDetails(event) {
  event.preventDefault();
  const index = event.target.dataset.index;
  const details = document.getElementById(`details-${index}`);
  details.classList.toggle("d-none");
}

function openApplyForm(index) {
  document.getElementById("form-modal").classList.add("active");

  document.getElementById("applyForm").onsubmit = (e) => {
    e.preventDefault();
    appliedJobs.add(`${currentCategory}-${index}`);
    document.querySelectorAll(".apply-btn")[index].innerText = "Applied";
    document.querySelectorAll(".apply-btn")[index].classList.add("applied");
    document.getElementById("form-modal").classList.remove("active");
    alert("Application Submitted!");
  };
}

document.getElementById("cancelForm").addEventListener("click", () => {
  document.getElementById("form-modal").classList.remove("active");
});

document.querySelectorAll(".category-btn").forEach((btn) => {
  btn.addEventListener("click", () => showJobs(btn.dataset.category));
});

// Search functionality
document.getElementById("search-bar").addEventListener("input", (e) => {
  const query = e.target.value.toLowerCase();
  const jobCards = document.querySelectorAll(".job-card");
  jobCards.forEach((card) => {
    const role = card.querySelector("h5").innerText.toLowerCase();
    const company = card.querySelector("p").innerText.toLowerCase();
    if (role.includes(query) || company.includes(query)) {
      card.style.display = "block"; // Show job card
    } else {
      card.style.display = "none"; // Hide job card
    }
  });
});

showJobs(currentCategory);
