document.addEventListener('DOMContentLoaded', function() {
    const birthdays = [
        { name: "Alice", birthday: "2023-01-01", color: "red" },
        { name: "Bob", birthday: "2023-01-15", color: "blue" },
        // Add more birthdays here
    ];

    // Initialize calendar to current month and year
    const currentDate = new Date();
    let currentMonth = currentDate.getMonth();
    let currentYear = currentDate.getFullYear();

    updateCalendar(currentMonth, currentYear, birthdays);

    function updateCalendar(month, year, birthdays) {
        const calendarDiv = document.getElementById('calendar');
        calendarDiv.innerHTML = ''; // Clear previous content

        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"];
        
        // Create and append the month label
        const monthLabel = document.createElement('div');
        monthLabel.textContent = `${monthNames[month]} ${year}`;
        calendarDiv.appendChild(monthLabel);

        // Create and append days of the week
        const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const weekRow = document.createElement('div');
        daysOfWeek.forEach(day => {
            const dayElement = document.createElement('div');
            dayElement.textContent = day;
            weekRow.appendChild(dayElement);
        });
        calendarDiv.appendChild(weekRow);

        // Create calendar days
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);

        let date = 1;
        for (let i = 0; i < 6; i++) { // Calendar rows
            const row = document.createElement('div');

            for (let j = 0; j < 7; j++) { // Calendar columns
                if (i === 0 && j < firstDay.getDay() || date > lastDay.getDate()) {
                    const emptyCell = document.createElement('div');
                    row.appendChild(emptyCell);
                } else {
                    const dayCell = document.createElement('div');
                    dayCell.textContent = date;

                    // Check if this day has a birthday
                    const formattedDate = `${year}-${String(month + 1).padStart(2, '0')}-${String(date).padStart(2, '0')}`;
                    birthdays.forEach(birthday => {
                        if (birthday.birthday === formattedDate) {
                            dayCell.style.backgroundColor = birthday.color;
                            dayCell.title = birthday.name; // Tooltip with the person's name
                        }
                    });

                    row.appendChild(dayCell);
                    date++;
                }
            }
            calendarDiv.appendChild(row);
            if (date > lastDay.getDate()) {
                break;
            }
        }
    }
});
