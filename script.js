// Basic interactivity for the website

document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Triangle visualization logic - Interactive Triangle with Technology-Community-Environment
    const triangleViz = document.getElementById('triangle-viz');
    if (triangleViz) {
        // Create SVG triangle visualization (300px × 260px as per PRD)
        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute("width", "300");
        svg.setAttribute("height", "260");
        svg.setAttribute("viewBox", "0 0 300 260");
        
        // Create gradient definitions
        const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
        
        // Technology gradient (bottom right)
        const techGradient = document.createElementNS("http://www.w3.org/2000/svg", "linearGradient");
        techGradient.setAttribute("id", "techGradient");
        techGradient.innerHTML = `
            <stop offset="0%" style="stop-color:#63b3ed;stop-opacity:0.8" />
            <stop offset="100%" style="stop-color:#3182ce;stop-opacity:0.6" />
        `;
        
        // Community gradient (top)
        const communityGradient = document.createElementNS("http://www.w3.org/2000/svg", "linearGradient");
        communityGradient.setAttribute("id", "communityGradient");
        communityGradient.innerHTML = `
            <stop offset="0%" style="stop-color:#f6e05e;stop-opacity:0.8" />
            <stop offset="100%" style="stop-color:#d69e2e;stop-opacity:0.6" />
        `;
        
        // Environment gradient (bottom left)
        const envGradient = document.createElementNS("http://www.w3.org/2000/svg", "linearGradient");
        envGradient.setAttribute("id", "envGradient");
        envGradient.innerHTML = `
            <stop offset="0%" style="stop-color:#76e495;stop-opacity:0.8" />
            <stop offset="100%" style="stop-color:#38a169;stop-opacity:0.6" />
        `;
        
        defs.appendChild(techGradient);
        defs.appendChild(communityGradient);
        defs.appendChild(envGradient);
        svg.appendChild(defs);
        
        // Triangle coordinates
        const centerX = 150, centerY = 130;
        const radius = 80;
        const communityX = centerX, communityY = centerY - radius;  // Top
        const techX = centerX + radius * Math.cos(Math.PI/6), techY = centerY + radius * Math.sin(Math.PI/6);  // Bottom right
        const envX = centerX - radius * Math.cos(Math.PI/6), envY = centerY + radius * Math.sin(Math.PI/6);   // Bottom left
        
        // Create triangle paths
        const triangle = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
        triangle.setAttribute("points", `${communityX},${communityY} ${techX},${techY} ${envX},${envY}`);
        triangle.setAttribute("fill", "url(#communityGradient)");
        triangle.setAttribute("stroke", "#ffffff");
        triangle.setAttribute("stroke-width", "2");
        triangle.setAttribute("opacity", "0.3");
        triangle.classList.add("triangle-base");
        
        // Create connection lines
        const line1 = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line1.setAttribute("x1", communityX); line1.setAttribute("y1", communityY);
        line1.setAttribute("x2", techX); line1.setAttribute("y2", techY);
        line1.setAttribute("stroke", "url(#techGradient)");
        line1.setAttribute("stroke-width", "3");
        line1.classList.add("connection-line");
        
        const line2 = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line2.setAttribute("x1", techX); line2.setAttribute("y1", techY);
        line2.setAttribute("x2", envX); line2.setAttribute("y2", envY);
        line2.setAttribute("stroke", "url(#envGradient)");
        line2.setAttribute("stroke-width", "3");
        line2.classList.add("connection-line");
        
        const line3 = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line3.setAttribute("x1", envX); line3.setAttribute("y1", envY);
        line3.setAttribute("x2", communityX); line3.setAttribute("y2", communityY);
        line3.setAttribute("stroke", "url(#communityGradient)");
        line3.setAttribute("stroke-width", "3");
        line3.classList.add("connection-line");
        
        // Create interactive circles at vertices
        const communityCircle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        communityCircle.setAttribute("cx", communityX);
        communityCircle.setAttribute("cy", communityY);
        communityCircle.setAttribute("r", "12");
        communityCircle.setAttribute("fill", "url(#communityGradient)");
        communityCircle.setAttribute("stroke", "#ffffff");
        communityCircle.setAttribute("stroke-width", "2");
        communityCircle.classList.add("vertex-circle", "community");
        
        const techCircle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        techCircle.setAttribute("cx", techX);
        techCircle.setAttribute("cy", techY);
        techCircle.setAttribute("r", "12");
        techCircle.setAttribute("fill", "url(#techGradient)");
        techCircle.setAttribute("stroke", "#ffffff");
        techCircle.setAttribute("stroke-width", "2");
        techCircle.classList.add("vertex-circle", "technology");
        
        const envCircle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        envCircle.setAttribute("cx", envX);
        envCircle.setAttribute("cy", envY);
        envCircle.setAttribute("r", "12");
        envCircle.setAttribute("fill", "url(#envGradient)");
        envCircle.setAttribute("stroke", "#ffffff");
        envCircle.setAttribute("stroke-width", "2");
        envCircle.classList.add("vertex-circle", "environment");
        
        // Append elements to SVG
        svg.appendChild(triangle);
        svg.appendChild(line1);
        svg.appendChild(line2);
        svg.appendChild(line3);
        svg.appendChild(communityCircle);
        svg.appendChild(techCircle);
        svg.appendChild(envCircle);
        
        // Add to container
        triangleViz.appendChild(svg);
        
        // Add hover interactions
        const circles = svg.querySelectorAll('.vertex-circle');
        circles.forEach(circle => {
            circle.addEventListener('mouseenter', function() {
                this.setAttribute('r', '16');
                triangle.style.opacity = '0.6';
                const lines = svg.querySelectorAll('.connection-line');
                lines.forEach(line => line.style.opacity = '0.8');
            });
            
            circle.addEventListener('mouseleave', function() {
                this.setAttribute('r', '12');
                triangle.style.opacity = '0.3';
                const lines = svg.querySelectorAll('.connection-line');
                lines.forEach(line => line.style.opacity = '1');
            });
        });
        
        console.log("Interactive triangle visualization created successfully.");
    }

    // Placeholder for carousel functionality (logos, blogs)
    // This would typically involve libraries or custom JS for sliding/swiping.
    // For now, the static layout is displayed.
    console.log("Carousel placeholders are ready.");

    // Placeholder for Blog/LinkedIn integration
    // In a real implementation, this would fetch data from external APIs
    // and dynamically populate the blog cards.
    // Example:
    // fetch('https://api.example.com/blogs')
    //   .then(response => response.json())
    //   .then(data => {
    //     // Populate blog cards with fetched data
    //   });
    console.log("Blog/LinkedIn integration placeholder.");

    // Placeholder for Contact Integration (Calendar, LinkedIn, Email)
    // This would involve integrating with calendar booking widgets, LinkedIn profile links, and email functionality.
    // Example for LinkedIn:
    // document.querySelector('.contact-card.linkedin a').href = 'https://www.linkedin.com/in/yourprofile';
    console.log("Contact integration placeholders are ready.");

    // Analytics Tracking Placeholder
    // Typically, you would add a script here for Google Analytics or other tracking services.
    // Example:
    // (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    // (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    // m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    // })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
    // ga('create', 'UA-XXXXX-Y', 'auto');
    // ga('send', 'pageview');
    console.log("Analytics tracking placeholder.");

});

// Function to potentially handle background animation (if not purely CSS)
// The CSS animation is already set up for gentleMove.
// function animateBackground() {
//     // Logic for moving background animation
// }
// animateBackground();
