---
title: "Earth Sandwich"
description: "A simple tool I built to find the antipode of any location on Earth."
date: "2025-06-01"
author: "Sonu Singh"
tags: ["Geography", "Side Projects", "React", "Maps", "Leaflet"]
category: "Projects"
---

## What’s on the Other Side of the World?

At some point, I started wondering: _what’s directly on the other side of the Earth from here?_ It’s the kind of random question you think about once, laugh at, and forget. But for some reason, I couldn’t shake it.

I wanted to know—_if I dug a hole straight down through the Earth, where would I come out?_ That question turned into something more specific: how could I find the **antipode** (the point exactly opposite a location on the globe)? Could I visualize it easily? And also, what if you wanted to make an **Earth Sandwich**—put a slice of bread on one side of the planet and match it with another on the opposite side?

So, I built a tool for it.

### The Tool

It’s a simple website with two maps side by side. You click anywhere on one pane, and the other pane instantly shows you the opposite point on Earth.

For example, click somewhere in Argentina and you might land in China. Click in most of Europe or the U.S., and—surprise—you’ll likely end up in the middle of the Indian Ocean.

The tool lets you explore that in a way that’s fast, visual, and intuitive.

### How It Works

The app shows two maps side by side. When you click a location on one side, the other pane updates to show the **antipode**—the point on the globe directly opposite it.

To calculate the antipode, I used a simple formula:

- **Latitude** is inverted: `antipodeLat = -lat`
- **Longitude** is flipped across the 180° meridian:
  `antipodeLng = (lng > 0) ? lng - 180 : lng + 180`

So for example, if you click somewhere at `37.7749°N, 122.4194°W` (San Francisco), you get:

- Latitude: `-37.7749`
- Longitude: `57.5806°E`

That lands you somewhere in the Indian Ocean—not quite China.

### Why Bother?

Honestly, just for fun. I wasn’t trying to solve a problem—just satisfy a random curiosity. But once I got into it, I realized how satisfying it is to see the actual antipodal relationships between places.

It’s also a weirdly effective way to better understand the shape of the Earth—not just in theory, but in terms of how land and water are distributed.

If you’re curious too, or just want to see where you'd end up if you dug through the planet, give it a try:<br>
👉 [https://earth-sandwich.bhpcv252.workers.dev/](https://earth-sandwich.bhpcv252.workers.dev/)

The source code is available on GitHub if you want to explore or fork it:<br>
🔗 [https://github.com/bhpcv252/earth-sandwich](https://github.com/bhpcv252/earth-sandwich)
