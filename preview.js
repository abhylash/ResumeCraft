// Load resume data from localStorage
const resumeData = JSON.parse(localStorage.getItem('resumeData'));
const resumePreview = document.getElementById('resumePreview');

// Update Resume Preview
function updateResumePreview(resume) {
    resumePreview.innerHTML = `
        <div class="resume">
            <h1>${resume.personal.name}</h1>
            <div class="contact-info mb-4">
                <p>
                    ${resume.personal.email} | ${resume.personal.phone}<br>
                    ${resume.personal.address}<br>
                    ${resume.personal.linkedin ? `<a href="${resume.personal.linkedin}" target="_blank">LinkedIn</a>` : ''}
                    ${resume.personal.github ? ` | <a href="${resume.personal.github}" target="_blank">GitHub</a>` : ''}
                </p>
            </div>

            <div class="section">
                <h2>Career Objective</h2>
                <p>${resume.objective}</p>
            </div>

            <div class="section">
                <h2>Education</h2>
                ${resume.education.map(edu => `
                    <div class="education">
                        <h3>${edu.degree}</h3>
                        <p>${edu.college}</p>
                        <p>Year of Passing: ${edu.year} | CGPA/Percentage: ${edu.grade}</p>
                    </div>
                `).join('')}
            </div>

            <div class="section">
                <h2>Skills</h2>
                <div class="skills-section">
                    <div>
                        <h3>Technical Skills</h3>
                        <p>${resume.skills.technical.join(', ')}</p>
                    </div>
                    <div>
                        <h3>Soft Skills</h3>
                        <p>${resume.skills.soft.join(', ')}</p>
                    </div>
                </div>
            </div>

            ${resume.experience.length ? `
                <div class="section">
                    <h2>Work Experience</h2>
                    ${resume.experience.map(exp => `
                        <div class="experience">
                            <h3>${exp.position} at ${exp.company}</h3>
                            <p>${exp.startDate} - ${exp.endDate}</p>
                            <p>${exp.description}</p>
                        </div>
                    `).join('')}
                </div>
            ` : ''}

            <div class="section">
                <h2>Projects</h2>
                ${resume.projects.map(project => `
                    <div class="project">
                        <h3>${project.title}</h3>
                        <p>${project.description}</p>
                        <p><strong>Technologies:</strong> ${project.technologies}</p>
                        ${project.github ? `<p><a href="${project.github}" target="_blank">GitHub Repository</a></p>` : ''}
                    </div>
                `).join('')}
            </div>

            ${resume.certifications ? `
                <div class="section">
                    <h2>Certifications & Achievements</h2>
                    <p>${resume.certifications}</p>
                </div>
            ` : ''}

            ${resume.hobbies ? `
                <div class="section">
                    <h2>Hobbies & Interests</h2>
                    <p>${resume.hobbies}</p>
                </div>
            ` : ''}

            ${resume.references ? `
                <div class="section">
                    <h2>References</h2>
                    <p>${resume.references}</p>
                </div>
            ` : ''}
        </div>
    `;
}

// Initialize preview if resume data exists
if (resumeData) {
    updateResumePreview(resumeData);
} else {
    window.location.href = '/';
}