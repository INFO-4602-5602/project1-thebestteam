
Project1: TheBestTeam
---
**Team Members**: Taylor M., Elias, Dan N., Sigrunn, Chia-Lo <br />
> **Spatial** Dan, Taylor <br />
> **Non-Spatial** Caleb, Sigrunn <br />
> **Non-Spatial #2** Elias

## Visualizations
Information about your visualizations and what they show.
<br />
Include information about interactions as appropriate.

### Spatial
This is a map of Colorado Zayo Buildings and each of their respective products, color mapped. 

### Non-Spatial
The barchart displays the CPQ NPVs across buildings, using color to represent whether the building is already on the Zayo network or not. Interactions include detailed NPV information on hover, and each bar can be clicked to reveal detailed information about that particular building.

### Non-Spatial #2
This is a visualization that compares how much money Zayo is currently making per product group and how much money they could be making per product group.

## Design Process
Your design process (e.g., how did you go about designing, building, and refining your system? Why did you choose these representations?)

#### Spatial
We first created a prototype using pen and paper. We knew that we wanted to represent a region using the coordinates given to us by Zayo, and map it to another attribute in the data set that could show meaning. We first used D3.js as a starting point for our map, but after some trial and error, we found that D3 doesn't do a lot for you. Although D3 is a very powerful visualization tool, it is desinged for customization and has a steep learning curve. 

Caleb suggested a different visualization library called [Leaflet.js](http://leafletjs.com/) 

This is an open-source Javascript library for creating mobile-friendly interactive maps. 

We chose to represent industry of building with color and we plotted them within the Denver scope. We chose to zoom into this level because plotting all these points to show all regions of the data from GA, CO, and TX wouldn't be beneficial because it would be too zoomed out to recognize any discernable patterns.

#### Non-Spatial
We began exploring the data by loading it into a WSYWIG tool (Tableau) to see what attributes were available to us across the datasets. After gaining a better understanding of the data Zayo more interested in, we were able to narrow down the datasets we wanted to use and how we wanted to group & display the data.

Because the bar chart is built with D3, part of the refining process came naturally as a result of better understanding how D3 works and what it is capable of. After building the basic bar chart, we narrowed down some data attributes that Zayo finds compelling and decided to integrate them into our vis through interaction. Like Dan and Taylor, we narrowed the results to the state of Colorado in order to better display some of the high-value CPQs that Zayo should be concerned with.

#### Non-Spatial #2
At first I was looking through the data given to us and kept in mind that I want to show as much business insight as possible. I wanted an easy to "read" or easy to understand representation. One where the user (Zayo) could easily get all the necessary details in order to execute a plan in order to maximize profits.

I was thinking that a pie chart would work best here, at first. After some thought I decided that a bar graph would still be best to use. Some product groups like SONET and zColo would get too overshadowed by the other products that when put onto a pie chart, it would be really hard to see. In a bar chart however, you can clearl see the differences between the product groups. I was thinking about narrowing down the data to just CO as well but then I decided to just take in all the data.

## How to Run
How to run your project

```
git clone https://github.com/INFO-4602-5602/project1-thebestteam.git
```

```
$ cd project1-thebestteam
```

Use your favorite local server to host the directory locally. If you have Brackets installed, live preview ```index.html``` or if you have Python installed, use ```python -m SimpleHTTPServer 3000``` and go to your web browser and direct it to ```localhost:3000/index.html```
