
const dataFile = "./Cv.json";

const personalInfo = (info) => {

    return `
    <header class="personal-info">

        <img
            class="profile-img"
            src="${info.img}"
            alt="${info.name}"
        >

        <div class="info">

            <h1>${info.name}</h1>

            <p class="job-title">
                ${info.title}
            </p>

            <div class="contact-info">

                <div class="contact-item">
                    <i class="fas fa-envelope"></i>
                    <span>${info.email}</span>
                </div>

                <div class="contact-item">
                    <i class="fas fa-phone"></i>
                    <span>${info.phone}</span>
                </div>

                <div class="contact-item">
                    <i class="fas fa-location-dot"></i>
                    <span>${info.location}</span>
                </div>

            </div>

            <div class="social-links">

                <a href="${info.github}">
                    <i class="fab fa-github"></i>
                </a>

                <a href="${info.linkedin}">
                    <i class="fab fa-linkedin"></i>
                </a>

                <a href="${info.whatsapp}">
                    <i class="fab fa-whatsapp"></i>
                </a>

            </div>

        </div>

    </header>
    `;
}

const summary = (summary) => {

    summary = summary.toLowerCase();
    summary = summary.replace("backend development", "<span>backend development</span>");
    summary = summary.replace("node.js", "<span>Node.js</span>");
    summary = summary.replace("nestjs", "<span>NestJS</span>");
    summary = summary.replace("express.js", "<span>Express.js</span>");
    summary = summary.replace("react", "<span>React</span>");
    summary = summary.replace("sql/nosql", "<span>SQL/NoSQL</span>");

    const summaryElement = `
    <section class="summary">
    <h2>Summary</h2>
    <p>${summary}</p>
    </section>
    `;
    
    return summaryElement;
};

const projects = (projects) => {
    
    const projectsList = projects.map(project => {
        return `
        <div class="project">
        
            <h3>${project.name}</h3>
            
            <div class="project-header">

                
                <p class="description">${project.description}</p>
                
                <span class="date">
                    ${project.duration}
                </span>

            </div>

            <p class="role">
                ${project.role}
            </p>

            <div class="links">
                ${project.github ? `
                <a href="${project.github}" target="_blank">
                    <i class="fab fa-github"></i>
                </a>
                ` : ''}
                

                ${project.demo ? `
                <a href="${project.demo}" target="_blank">
                    <i class="fas fa-globe"></i>
                </a>
                ` : ''}
            </div>

            <ul>
                ${project.highlights.map(resp => `<li>${resp}</li>`).join('')}
            </ul>

            <div class="tech-stack">

                ${project.tech_stack
                    .map(tech => `<span class="tech-chip">${tech}</span>`)
                    .join('')
                }

            </div>            
        </div>
        `;
    });

    const projectsSection = `
    <section class="projects">
        ${projectsList.join('')}
    </section>
    `;
    
    return projectsSection;
};

const education = (education) => {
        const educationElement = `
        <section class="education">
            <h2>Education</h2>
            
            <div class="education-item">
                <h3>${education.degree}</h3>

                <p class="university">${education.university}</p>

                <p class="faculty">
                    Faculty of Computer Science & Artificial Intelligence
                </p>
                
                <span class="date">${education.duration}</span>

            </div>
        </section>
        `;
    
    return educationElement;
};

const skills = (skills) => {


    const skillsList = Object.entries(skills).map(([key, value]) => {
        return `
            <div class="skill-category">
                <h3>${key}</h3>
                <div class="skills-list">

                    ${value.map(skill => `<span class="chip">${skill}</span>`).join('')}

                </div>
            </div>
        `;
    }).join('<hr>');
    
    const skillsElement = `
    <section class="skills">
        <h2>Skills</h2>

        ${skillsList}

        </section>
        `;
    
    return skillsElement;
};

const languages = (languages) => {
    const languageList = languages.map(
        (language) => {
            return `
            <div class="language">
                <span>${language.name}</span>
                <span>${language.level}</span>
            </div>
            `;
        }
    ).join('');
    
    return `
    <section class="languages">
        <h2>Languages</h2>
        ${languageList}
    </section>`;
};

const certifications = (certifications) => {
    const certificationList = certifications.map(
        (certification) => {
            return `<li>${certification}</li>`;
        }
    ).join('');
    
    return `
    <section class="certifications">
        <h2>Certifications</h2>
        <ul>${certificationList}</ul>
    </section>`;
};

function loadProfile() {
    const body = document.body;

    const resume = document.createElement("div");
    resume.id = "resume";

    fetch(dataFile)
        .then(response => response.json())
        .then(data => {
            // you can use the data here

            resume.innerHTML = `
                ${personalInfo(data.personal_info)}

                <main id="resume-content">

                    <aside id="left-column">

                        ${summary(data.summary)}

                        ${skills(data.skills)}

                        ${languages(data.languages)}

                    </aside>

                    <section id="right-column">

                        ${projects(data.work_experience)}

                        ${education(data.education)}

                    </section>

                </main>
            `;

            body.appendChild(resume);

            // console.log(body.innerHTML);

        })
        .catch(error => {
            console.error('Error reading JSON file:', error);
        });
    
}