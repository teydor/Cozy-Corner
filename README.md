# Cozy Corner

This is the main content and code repository for `cozy-fulda.de`

The entire thing is purely staticly generated using Hugo and hosted using github pages to be as cheap and stable as possible.

You can build the entire site locally. All that is required is:

`hugo` - The static page generator, can be downloaded here: https://gohugo.io/installation/\
_(If you use Windows as your dev machine, make sure to get `hugo-extended`)_

`npm` - We use it to pull down bootstrap and bootstrap-icons that we use on the page.

`python3` - If you want to generate event json files. More info about that in: `scripts/README.md`


### Install
First you must install the NPM dependencies:

Run  `npm install` in the terminal in the root directory of the project.

Now running `hugo server -D` in the terminal should setup a development server!

## Editing and contents

Everything apart from the main landing page is written in markdown files with HUGO templates mixed in. They are available in the `content/` folder and can be edited easily using VSCode or Notepad, or any markdown editor.

The markdown files are then used to generate HTML via Hugo that then gets shown to users.

### Events 
Event data is pulled from the `/static/json/events.json` file. This file can be edited to add extra events, and add messages to the main landing page.

The events are generated ahead of time using a python script that is available in: `script/generate_times.py`

This data gets pulled by the client side scripts to dynamically generate the time remaining untill the next event.

### Map

The About page embeds a map from uMap: https://umap.openstreetmap.fr/en/
This uses openstreetmap under the hood and means we dont have to worry about quotas or other things if we were using Google Maps or Mapbox.
_(Plus... OpenStreetMap <3)_