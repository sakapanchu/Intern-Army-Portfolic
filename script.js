document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const skillBars = document.querySelectorAll('.skill-bar-fill');
    skillBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0';
        setTimeout(() => {
            bar.style.width = width;
        }, 500);
    });
});



document.addEventListener('DOMContentLoaded', () => {
    const portfolioBoxes = document.querySelectorAll('.portfolio-box');

    portfolioBoxes.forEach(box => {
        box.addEventListener('mouseenter', () => {
            const title = box.getAttribute('data-title');
            const details = box.getAttribute('data-details');
            const iconClass = box.getAttribute('data-icon');
            box.innerHTML = `
                <i class="fa-solid ${iconClass}"></i>
                <h2>${title}</h2>
                <p class="project-details">${details}</p>
            `;
        });

        box.addEventListener('mouseleave', () => {
            const originalIcon = box.querySelector('i').classList[1];
            const originalTitle = box.querySelector('h2').textContent;
            box.innerHTML = `
                <i class="fa-solid ${originalIcon}"></i>
                <h2>${originalTitle}</h2>
            `;
        });
    });
});


const form = document.getElementById('form');
const result = document.getElementById('result');

form.addEventListener('submit', function(e) {
    const formData = new FormData(form);
    e.preventDefault();

    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    result.innerHTML = "Please wait..."

    fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: json
        })
        .then(async (response) => {
            let json = await response.json();
            if (response.status == 200) {
                result.innerHTML = json.message;
            } else {
                console.log(response);
                result.innerHTML = json.message;
            }
        })
        .catch(error => {
            console.log(error);
            result.innerHTML = "Something went wrong!";
        })
        .then(function() {
            form.reset();
            setTimeout(() => {
                result.style.display = "none";
            }, 3000);
        });
});
