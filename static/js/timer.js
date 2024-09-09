timer_text = document.getElementById('timer_text_first');
timer_time = document.getElementById('timer_text_second');
warning_text = document.getElementById('timer_text_message');

dayjs.extend(window.dayjs_plugin_relativeTime);

let eventsData;

async function fetchEvents() {
    try {
        const response = await fetch('/json/events.json');
        eventsData = await response.json();
    } catch (error) {
        console.error('Error Fetching Events:', error);
    }
}

function setWarning(text, classname = 'text-danger') {
    
    warning_text.classList.add(classname);
    warning_text.innerHTML = text;
    warning_text.hidden = false;
}

function setText(text) {
    timer_text.innerHTML = text;
    timer_text.hidden = false;
}

function setTime(text, strike = false) {
    timer_time.innerHTML = text;
    timer_time.hidden = false;

    if (strike) {
        timer_time.style.textDecoration = 'line-through';
    }

}


fetchEvents().then(() => {

    // Fing the next event
    let nextEvent = null;
    let currentTime = new Date();

    for (let i = 0; i < eventsData.length; i++) {
        let eventStartTime = new Date(eventsData[i].start);
        let eventEndTime = new Date(eventsData[i].end);

        if (eventEndTime > currentTime) {
            nextEvent = eventsData[i];
            break;
        }
    }

    console.log('Next Event:', nextEvent);

    if (nextEvent) {
        let eventTime = new Date(nextEvent.start);        
        let eventText = dayjs().to(dayjs(eventTime))

        console.log('Next event', eventText);

        setText('Next Event');
        setTime(eventText, nextEvent.cancelled);

        if (nextEvent.cancelled) {
            if (nextEvent.note) {
                setWarning(nextEvent.note);
            } else {
                setWarning('Event Cancelled');
            }
        }

        if (nextEvent.note) {
            setWarning(nextEvent.note, 'text-success');
        }

    }
});