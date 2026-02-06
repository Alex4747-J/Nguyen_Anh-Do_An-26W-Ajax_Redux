# Star Wars Character & Movie Guide
An interactive web application that allows users to explore the Star Wars universe by connecting characters to their cinematic debuts. Built as a collaborative project for the [Insert Course Name, e.g., Web Development II] program.

## 👥 Collaborators
Anh Nguyen - Lead Developer / Logic & API Integration

An Do - Lead Developer / UI Design & Animation

## 🚀 Project Overview
This project utilizes the Star Wars API (SWAPI) to dynamically generate a list of characters. Users can interact with character names to trigger asynchronous requests that fetch specific movie details, including the opening crawl and curated movie posters.

### Key Features
Dynamic Data Fetching: Utilizes the Fetch API to handle multi-stage AJAX requests (Loading, Success, and Error states).

Template Rendering: Implements the HTML5 <template> element (or template literals) for efficient, reusable DOM manipulation.

Responsive Design: A mobile-first approach ensuring a seamless experience from smartphones to desktops.

Enhanced UX: Integrated GreenSock (GSAP) animations for smooth transitions and a custom loading icon to manage user expectations during data retrieval.

### 🛠️ Tech Stack
HTML5 (Template elements)

CSS3/SASS (Flexbox/Grid for responsiveness)

JavaScript (ES6+) (Asynchronous Fetch, Promises)

GSAP (UI enhancements)

SWAPI (External Data Source)

## Getting Started

1. Clone the repository
```bash
git clone https://github.com/Alex4747-J/Nguyen_Anh-Do_An-26W-Ajax_Redux
```

2. If you want to compile Sass:
```bash
npm install -g sass
sass --watch sass/main.scss css/main.css
```

## 📄 License

This project is for portfolio/educational purposes.