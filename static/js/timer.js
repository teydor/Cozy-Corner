// Simple script to show the next event on the homepage and About page

// Made at 3AM by Mednis... With <3 (Although Slightly Sleepy)
// https://mednis.id.lv 

timer_text = document.getElementById('timer_text_first');
timer_date = document.getElementById('timer_text_date');
timer_time = document.getElementById('timer_text_second');
warning_text = document.getElementById('timer_text_message');


dayjs.extend(window.dayjs_plugin_relativeTime);

console.log('Timer Script Loaded');
console.log('Look at you, looking at the console! Hope you are having a great day... or night... or whatever! - Mednis');

let eventsData;

async function fetchEvents() {
    try {
        // Fetch the events JSON file
        const response = await fetch('/json/events.json');

        // Parse the JSON file
        eventsData = await response.json();

    } catch (error) {
        // Log any errors, do nothing else #YOLO
        console.error('Error Fetching Events:', error);
    }
}

function setWarning(text, classname = 'text-danger') {
    // Add a class from the caller
    warning_text.classList.add(classname);

    // Set the text and show it
    warning_text.innerHTML = text;
    warning_text.hidden = false;
}

function setText(text) {
    // Set the text and show it
    timer_text.innerHTML = text;
    timer_text.hidden = false;
}

function setTime(text, strike = false) {
    // Set the text
    timer_time.innerHTML = text;

    // If the event is cancelled, strike through the text
    if (strike) {
        timer_time.style.textDecoration = 'line-through';
    }

    // Show the text
    timer_time.hidden = false;

}

function setDate(text, strike = false) {
    timer_date.innerHTML = text;

    // If the event is cancelled, strike through the text
    if (strike) {
        timer_date.style.textDecoration = 'line-through';
    }

    timer_date.hidden = false;
}


function updateTimer() {

    fetchEvents().then(() => {

        
        let nextEvent = null; // The next event, to be found in the loop
        let currentTime = new Date(); // Current time, to compare with the event times

        // Find the next event
        for (let i = 0; i < eventsData.length; i++) {

            // Get the start and end times of the event
            let eventStartTime = new Date(eventsData[i].start);
            let eventEndTime = new Date(eventsData[i].end);

            // If the event has not ended yet, set it as the next event
            if (eventEndTime > currentTime) {
                nextEvent = eventsData[i];
                break;
            }
        }

        console.log('Next Meetup:', nextEvent);

        if (nextEvent) {
            // Get the time of the event
            let eventTime = new Date(nextEvent.start);
            
            // Get the relative time
            let eventText = dayjs().to(dayjs(eventTime))

            // Format the date nicely
            let eventDate = dayjs(eventTime).format('MMMM D - HH:mm');

            console.log('Next meetup', eventText, "(", eventDate, ")");
            
            // Set the text
            setText('Next Meetup');
            setTime(eventText, nextEvent.cancelled);
            setDate("(" + eventDate + ")", nextEvent.cancelled);

            // If the event is cancelled, show a warning
            if (nextEvent.cancelled) {

                if (nextEvent.note) {
                    // Show the note
                    setWarning(nextEvent.note);
                } else {
                    // Show a generic message
                    setWarning('Meetup Cancelled');
                }
            
            }

            // If the event has a note, show it
            if (nextEvent.note) {

                // Green text for good news
                setWarning(nextEvent.note, 'text-success');
            }

        }
    });
}

// Run the timer on page load and every minute
window.onload = function () {
    console.log('!! Updating Timer');
    updateTimer();
    setInterval(updateTimer, 60000);
}

// Update the timer if the page is focused
document.addEventListener('visibilitychange', function () {
    if (document.visibilityState === 'visible') {
        console.log('!! Updating Timer');
        updateTimer();
    }
});