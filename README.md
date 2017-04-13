
Project1: TheBestTeam
---
**Team Members**: Taylor M., Elias, Dan N., Sigrunn, Chia-Lo <br />
**Roles**

## Visualizations
Information about your visualizations and what they show.
<br />
Include information about interactions as appropriate.

### Spatial
This is a map of Colorado Zayo Buildings and each of their respective industries, color mapped. 

### Non-Spatial

### Elias

## Design Process
Your design process (e.g., how did you go about designing, building, and refining your system? Why did you choose these representations?)

### Spatial
We first created a prototype using pen and paper. We knew that we wanted to represent a region using the coordinates given to us by Zayo, and map it to another attribute in the data set that could show meaning. We first used D3.js as a starting point for our map, but after some trial and error, we found D3 doesn't do a lot for you. Although D3 is a very powerful visualization tool, it is desinged for customization and has a steep learning curve. 

Caleb suggested a different visualization library called [Leaflet.js](http://leafletjs.com/) 

This is an open-source Javascript library for creating mobile-friendly interactive maps. 

We chose to represent industry of building with colro and we plotted them within the Denver scope. We chose to zoom into this level because plotting all these points to show all regions of the data from GA, CO, and TX wouldn't be beneficial because it would be too zoomed out to recognize any discernable patterns.  

## How to Run
How to run your project

```
git clone https://github.com/INFO-4602-5602/project1-thebestteam.git
```

```
$ cd project1-thebestteam
```

Use your favorite local server to host the directory locally. If you have Brackets installed, live preview ```index.html``` or if you have Python installed, use ```python -m SimpleHTTPServer 3000``` and go to your web browser and direct it to ```localhost:3000/index.html```