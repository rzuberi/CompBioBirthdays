document.addEventListener('DOMContentLoaded', function() {
    let calendarEl = document.getElementById('calendar');
    let form = document.getElementById('birthdayForm');
    let nameInput = document.getElementById('nameInput');
    let birthdayInput = document.getElementById('birthdayInput');
    let upcomingBirthdaysEl = document.getElementById('upcomingBirthdays');

    // Initialize the calendar
    let calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        eventMouseEnter: function(info) {
            // Show the name on hover
            info.el.setAttribute('title', info.event.title);
        }
    });
    calendar.render();

    // Load existing birthdays from localStorage
    let birthdays = JSON.parse(localStorage.getItem('birthdays')) || [];
    birthdays.forEach(function(birthday) {
        addBirthdayToCalendar(birthday);
        addBirthdayToList(birthday);
    });

    // Form submission handling
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        let name = nameInput.value.trim();
        let birthday = birthdayInput.value;
        if (!name || !birthday) return;

        let birthdayObj = { name, birthday };
        birthdays.push(birthdayObj);
        localStorage.setItem('birthdays', JSON.stringify(birthdays));

        addBirthdayToCalendar(birthdayObj);
        addBirthdayToList(birthdayObj);

        // Reset the form
        nameInput.value = '';
        birthdayInput.value = '';
    });

    function addBirthdayToCalendar(birthdayObj) {
        calendar.addEvent({
            title: birthdayObj.name,
            start: birthdayObj.birthday,
            allDay: true,
            backgroundColor: getUniqueColor(birthdayObj.name),
            borderColor: getUniqueColor(birthdayObj.name),
            classNames: ['birthday-event']
        });
    }

    function addBirthdayToList(birthdayObj) {
        let today = new Date();
        let birthdayDate = new Date(birthdayObj.birthday);
        if (birthdayDate < today && birthdayDate.getFullYear() !== today.getFullYear()) {
            // Skip birthdays that have already passed this year
            return;
        }
        let li = document.createElement('li');
        li.textContent = `${birthdayObj.name} - ${formatDate(birthdayDate)}`;
        li.classList.add('birthday-list-item');
        li.style.backgroundColor = getUniqueColor(birthdayObj.name);
        upcomingBirthdaysEl.appendChild(li);
    }

    function getUniqueColor(name) {
        // Simple hash function for generating a color from the name
        let hash = 0;
        for (let i = 0; i < name.length; i++) {
            hash = name.charCodeAt(i) + ((hash << 5) - hash);
        }
        let color = '#';
        for (let i = 0; i < 3; i++) {
            let value = (hash >> (i * 8)) & 0xFF;
            color += ('00' + value.toString(16)).substr(-2);
        }
        return color;
    }

    function formatDate(date) {
        return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
    }
});
