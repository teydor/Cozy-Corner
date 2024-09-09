import json
import datetime
import zoneinfo

times = []

# Filepath to the JSON file
file_path = "../static/json/events.json"


# Year we are generating the dates for
year = 2024

# The start time for the events
# 24-hour time format pls :D
start_time = "19:00"

# The end time for the events
end_time = "22:00"

# Start date for the events
current_date = datetime.date(year, 9, 14)

# Keep track of the amount of mondays so we can check if it's the second one
mondays = 0

while current_date.year == year:  # Loop until the year changes
    # Check if the day is a monday
    if current_date.weekday() == 0:
        # Is it a second monday?
        if mondays % 2 == 1:
            start_datetime = datetime.datetime.strptime(
                f"{current_date}T{start_time}", "%Y-%m-%dT%H:%M")

            end_datetime = datetime.datetime.strptime(
                f"{current_date}T{end_time}", "%Y-%m-%dT%H:%M")

            start_datetime = start_datetime.replace(tzinfo=zoneinfo.ZoneInfo("Europe/Berlin"))
            end_datetime = end_datetime.replace(tzinfo=zoneinfo.ZoneInfo("Europe/Berlin"))

            # Add the current date to the times dictionary
            times.append({
                "start": start_datetime.isoformat(),
                "end": end_datetime.isoformat(),
                "note": "",
                "cancelled": False
            })
        mondays += 1

    # Increment the current date by one day
    current_date += datetime.timedelta(days=1)

# Write the times to a file
with open(file_path, "w") as f:
    json.dump(times, f, indent=4)