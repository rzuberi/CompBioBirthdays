document.addEventListener('DOMContentLoaded', function() {
    // Example data
    const birthdays = [
        { name: "Alice", birthday: "2023-01-01", color: "red" },
        { name: "Bob", birthday: "2023-02-15", color: "blue" },
        // Add more birthdays here
    ];

    // Populate calendar and birthday list
    updateCalendar(new Date());
    updateBirthdayList(birthdays);

    // Function to update the calendar based on the current month
    function updateCalendar(currentDate) {
        const calendarDiv = document.getElementById('calendar');
        calendarDiv.innerHTML = ''; // Clear previous content
        // Add calendar generation logic here
    }

    // Function to update the birthday list
    function updateBirthdayList(birthdays) {
        const listDiv = document.getElementById('birthday-list');
        listDiv.innerHTML = ''; // Clear previous content
        birthdays.forEach(birthday => {
            const item = document.createElement('div');
            item.textContent = `${birthday.name} - ${birthday.birthday}`;
            item.style.color = birthday.color;
            listDiv.appendChild(item);
        });
    }
});
