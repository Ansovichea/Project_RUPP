document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const courseId = urlParams.get('id');

    fetch('courses.json')
        .then(response => response.json())
        .then(data => {
            const course = data.courses.find(c => c.id === parseInt(courseId));
            if (course) {
                document.getElementById('course-title').textContent = course.title;
                document.getElementById('course-description').textContent = course.description;

                const videoContainer = document.getElementById('course-video');
                videoContainer.innerHTML = `<iframe width="560" height="315" src="${course.videoUrl}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>`;

                const reviewsContainer = document.getElementById('course-reviews');
                course.reviews.forEach(review => {
                    const reviewElement = document.createElement('div');
                    reviewElement.className = 'review';
                    reviewElement.innerHTML = `
                        <img src="https://via.placeholder.com/60" alt="${review.name}">
                        <div>
                            <strong>${review.name}</strong>
                            <p>Rating: ${'★'.repeat(review.rating)}${'☆'.repeat(5 - review.rating)}</p>
                            <p>${review.comment}</p>
                        </div>
                    `;
                    reviewsContainer.appendChild(reviewElement);
                });
            } else {
                document.getElementById('course-details').innerHTML = '<p>Course not found.</p>';
            }
        })
        .catch(error => {
            console.error('Error fetching course data:', error);
            document.getElementById('course-details').innerHTML = '<p>Error loading course data.</p>';
        });
});