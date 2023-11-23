const daysTag = document.querySelector(".days");
const currentDate = document.querySelector(".current-date");
const prevIcon = document.getElementById("prev");
const nextIcon = document.getElementById("next");

let date = new Date();
let currYear = date.getFullYear();
let currMonth = date.getMonth();

const months = [
  "January", "February", "March", "April", "May", "June", "July",
  "August", "September", "October", "November", "December"
];

const eventsData = {};

const renderCalendar = () => {
  const firstDayOfMonth = new Date(currYear, currMonth, 1).getDay();
  const lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate();
  const lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay();
  const lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate();
  let liTag = "";

  for (let i = firstDayOfMonth; i > 0; i--) {
    liTag += `<li class="inactive">${lastDateofLastMonth - i + 1}</li>`;
  }

  for (let i = 1; i <= lastDateofMonth; i++) {
    const dateKey = `${currYear}-${currMonth + 1}-${i}`;
    const events = eventsData[dateKey] || [];
    liTag += `<li data-date="${dateKey}" class="has-events">${i}`;
    if (events.length > 0) {
      liTag += `<ul class="events-list">${events.map((event, index) => `<li data-index="${index}">${event}</li>`).join("")}</ul>`;
    }
    liTag += `</span></li>`;
  }

  for (let i = lastDayofMonth; i < 6; i++) {
    liTag += `<li class="inactive">${i - lastDayofMonth + 1}</li>`;
  }

  currentDate.innerText = `${months[currMonth]} ${currYear}`;
  daysTag.innerHTML = liTag;

  daysTag.addEventListener("click", (event) => {
    if (event.target.classList.contains('delete-event')) {
      const dateKey = event.target.closest('li').getAttribute("data-date");
      const index = event.target.parentElement.getAttribute("data-index");
      if (dateKey && index !== null) {
        eventsData[dateKey].splice(index, 1);
        renderCalendar();
      }
    }
  });

  const dateElements = document.querySelectorAll(".has-events");
  dateElements.forEach(dateElement => {
    dateElement.addEventListener("click", (event) => {
      const dateKey = dateElement.getAttribute("data-date");
      const index = event.target.getAttribute("data-index");
      if (dateKey && index !== null) {
        if (confirm("Are you sure you want to delete this event?")) {
          eventsData[dateKey].splice(index, 1);
          renderCalendar(); 
        }
      }
    });

    dateElement.addEventListener("contextmenu", (event) => {
      event.preventDefault();
      const dateKey = dateElement.getAttribute("data-date");
      const index = dateElement.getAttribute("data-index");
      if (dateKey && index !== null) {
        if (confirm("Are you sure you want to delete this event?")) {
          eventsData[dateKey].splice(index, 1);
          renderCalendar(); 
        }
      }
    });
  });

  daysTag.addEventListener("click", (event) => {
    const dateKey = event.target.getAttribute("data-date");
    if (dateKey) {
      const eventName = prompt(`Add an event for ${dateKey}:`);
      if (eventName) {
        if (!eventsData[dateKey]) {
          eventsData[dateKey] = [eventName];
        } else {
          eventsData[dateKey].push(eventName);
        }
        renderCalendar(); 
      }
    }
  });
};

renderCalendar();

prevIcon.addEventListener("click", () => {
  currMonth -= 1;
  if (currMonth < 0) {
    currYear -= 1;
    currMonth = 11;
  }
  date = new Date(currYear, currMonth, 1);
  renderCalendar();
});

nextIcon.addEventListener("click", () => {
  currMonth += 1;
  if (currMonth > 11) {
    currYear += 1;
    currMonth = 0;
  }
  date = new Date(currYear, currMonth, 1);
  renderCalendar();
});
