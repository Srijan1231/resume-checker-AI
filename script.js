const form = document.getElementById('resume-form');
const rating = document.getElementById('rating');
const suggestions = document.getElementById('suggestions');
const submitBtn = document.getElementById('submit-btn');

form.addEventListener('submit', async event => {
	event.preventDefault();

	const formData = new FormData(form);
	submitBtn.disabled = true;
	submitBtn.textContent = 'Checking...';

	const response = await fetch('https://api.example.com/check-resume', {
		method: 'POST',
		body: formData
	});

	if (!response.ok) {
		console.error(response.status, response.statusText);
		alert('An error occurred while checking your resume.');
		return;
	}

	const result = await response.json();

	rating.textContent = `Rating: ${result.rating}`;

	suggestions.innerHTML = '';
	result.suggestions.forEach(suggestion => {
		const li = document.createElement('li');
		li.textContent = suggestion;
		suggestions.appendChild(li);
	});

	submitBtn.disabled = false;
	submitBtn.textContent = 'Check my resume';
});
