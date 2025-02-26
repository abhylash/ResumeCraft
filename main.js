// Form validation
(() => {
    'use strict';
    const forms = document.querySelectorAll('.needs-validation');
    
    Array.from(forms).forEach(form => {
        form.addEventListener('submit', event => {
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            }
            form.classList.add('was-validated');
        }, false);
    });
})();

// Form handling
const resumeForm = document.getElementById('resumeForm');

// Add Education Field
function addEducation() {
    const educationFields = document.getElementById('educationFields');
    const newEducation = document.createElement('div');
    newEducation.className = 'education-entry mb-3';
    newEducation.innerHTML = `
        <div class="row g-3">
            <div class="col-md-6">
                <input type="text" class="form-control degree" placeholder="Degree" required>
            </div>
            <div class="col-md-6">
                <input type="text" class="form-control college" placeholder="College/University" required>
            </div>
            <div class="col-md-6">
                <input type="number" class="form-control year" placeholder="Year of Passing" required>
            </div>
            <div class="col-md-6">
                <input type="number" class="form-control grade" step="0.01" placeholder="CGPA/Percentage" required>
            </div>
            <div class="col-12">
                <button type="button" class="btn btn-danger btn-sm" onclick="this.closest('.education-entry').remove()">Remove</button>
            </div>
        </div>
    `;
    educationFields.appendChild(newEducation);
}

// Add Experience Field
function addExperience() {
    const experienceFields = document.getElementById('experienceFields');
    const newExperience = document.createElement('div');
    newExperience.className = 'experience-entry mb-3';
    newExperience.innerHTML = `
        <div class="row g-3">
            <div class="col-md-6">
                <input type="text" class="form-control company" placeholder="Company Name" required>
            </div>
            <div class="col-md-6">
                <input type="text" class="form-control position" placeholder="Position" required>
            </div>
            <div class="col-md-6">
                <label class="form-label">Start Date</label>
                <input type="date" class="form-control start-date" required>
            </div>
            <div class="col-md-6">
                <label class="form-label">End Date</label>
                <input type="date" class="form-control end-date">
            </div>
            <div class="col-12">
                <textarea class="form-control description" placeholder="Job Description" rows="3" required></textarea>
            </div>
            <div class="col-12">
                <button type="button" class="btn btn-danger btn-sm" onclick="this.closest('.experience-entry').remove()">Remove</button>
            </div>
        </div>
    `;
    experienceFields.appendChild(newExperience);
}

// Add Project Field
function addProject() {
    const projectFields = document.getElementById('projectFields');
    const newProject = document.createElement('div');
    newProject.className = 'project-entry mb-3';
    newProject.innerHTML = `
        <div class="row g-3">
            <div class="col-12">
                <input type="text" class="form-control title" placeholder="Project Title" required>
            </div>
            <div class="col-12">
                <textarea class="form-control description" placeholder="Project Description" rows="3" required></textarea>
            </div>
            <div class="col-md-6">
                <input type="text" class="form-control technologies" placeholder="Technologies Used" required>
            </div>
            <div class="col-md-6">
                <input type="url" class="form-control github" placeholder="GitHub Link">
            </div>
            <div class="col-12">
                <button type="button" class="btn btn-danger btn-sm" onclick="this.closest('.project-entry').remove()">Remove</button>
            </div>
        </div>
    `;
    projectFields.appendChild(newProject);
}

// Form Submission
resumeForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (resumeForm.checkValidity()) {
        const resumeData = generateResumeData();
        localStorage.setItem('resumeData', JSON.stringify(resumeData));
        window.location.href = '/preview.html';
    }
});

// Generate Resume Data
function generateResumeData() {
    return {
        personal: {
            name: document.getElementById('fullName').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            address: document.getElementById('address').value,
            linkedin: document.getElementById('linkedin').value,
            github: document.getElementById('github').value
        },
        objective: document.getElementById('objective').value,
        education: Array.from(document.querySelectorAll('.education-entry')).map(entry => ({
            degree: entry.querySelector('.degree').value,
            college: entry.querySelector('.college').value,
            year: entry.querySelector('.year').value,
            grade: entry.querySelector('.grade').value
        })),
        skills: {
            technical: document.getElementById('technicalSkills').value.split(',').map(skill => skill.trim()),
            soft: document.getElementById('softSkills').value.split(',').map(skill => skill.trim())
        },
        experience: Array.from(document.querySelectorAll('.experience-entry')).map(entry => ({
            company: entry.querySelector('.company').value,
            position: entry.querySelector('.position').value,
            startDate: entry.querySelector('.start-date').value,
            endDate: entry.querySelector('.end-date').value || 'Present',
            description: entry.querySelector('.description').value
        })),
        projects: Array.from(document.querySelectorAll('.project-entry')).map(entry => ({
            title: entry.querySelector('.title').value,
            description: entry.querySelector('.description').value,
            technologies: entry.querySelector('.technologies').value,
            github: entry.querySelector('.github').value
        })),
        certifications: document.getElementById('certifications').value,
        hobbies: document.getElementById('hobbies').value,
        references: document.getElementById('references').value
    };
}