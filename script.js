document.addEventListener('DOMContentLoaded', function() {
    const calendarBody = document.getElementById('calendar-body');
    const monthYear = document.getElementById('month-year');
    const prevMonthBtn = document.getElementById('prev-month');
    const nextMonthBtn = document.getElementById('next-month');

    let currentDate = new Date();

    function renderCalendar(date) {
        const year = date.getFullYear();
        const month = date.getMonth();
        const firstDay = new Date(year, month, 1).getDay();
        const lastDate = new Date(year, month + 1, 0).getDate();
        const prevLastDate = new Date(year, month, 0).getDate();

        monthYear.textContent = `${date.toLocaleString('default', { month: 'long' })} ${year}`;

        calendarBody.innerHTML = '';
        let dayCount = 1;
        let nextMonthDay = 1;

        for (let i = 0; i < 6; i++) {
            const row = document.createElement('tr');

            for (let j = 0; j < 7; j++) {
                const cell = document.createElement('td');

                if (i === 0 && j < firstDay) {
                    cell.textContent = prevLastDate - firstDay + j + 1;
                    cell.classList.add('prev-month');
                } else if (dayCount > lastDate) {
                    cell.textContent = nextMonthDay++;
                    cell.classList.add('next-month');
                } else {
                    cell.textContent = dayCount++;
                    if (
                        dayCount - 1 === new Date().getDate() &&
                        month === new Date().getMonth() &&
                        year === new Date().getFullYear()
                    ) {
                        cell.classList.add('today');
                    }
                }

                row.appendChild(cell);
            }

            calendarBody.appendChild(row);
        }
    }

    prevMonthBtn.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar(currentDate);
    });

    nextMonthBtn.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar(currentDate);
    });

    renderCalendar(currentDate);
});
