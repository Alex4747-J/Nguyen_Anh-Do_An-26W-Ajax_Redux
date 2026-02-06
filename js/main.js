(() => {
    const charList = document.querySelector("#character-list");
    const movieTemplate = document.querySelector("#movie-template");
    const movieCon = document.querySelector("#movie-con");
    const loader = document.querySelector("#loader");
    const baseUrl = "https://swapi.info/api";

    let loadedCharacters = [];

    function toggleLoading(isLoading) {
        if (isLoading) {
            loader.classList.remove("hidden");
            gsap.to("#loader img", { rotation: 360, repeat: -1, duration: 1, ease: "linear" });
        } else {
            loader.classList.add("hidden");
            gsap.killTweensOf("#loader img");
        }
    }

    function handleResponse(response) {
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        return response.json();
    }

    function handleError(error) {
        toggleLoading(false);
        console.error("Fetch Error:", error);
        movieCon.innerHTML = `
            <div class="error-msg">
                <h3>The Force is not strong with this request.</h3>
                <p>Error: ${error.message}</p>
            </div>
        `;
        gsap.from(".error-msg", { x: -10, repeat: 5, duration: 0.1, yoyo: true });
    }


    function getCharacters() {
        toggleLoading(true);

        fetch(`${baseUrl}/people`)
            .then(handleResponse)   
            .then(processCharacters)
            .catch(handleError);    
    }

    function processCharacters(results) {
        console.log("Characters loaded:", results);
        const characters = results.slice(0, 10);
        toggleLoading(false);

        loadedCharacters = characters.map(function (char) {
            return { name: char.name, url: char.url };
        });
        const preferredFilmIndex = {
            "Luke Skywalker": 2,      
            "C-3PO": 3,               
            "R2-D2": 4,               
            "Darth Vader": 1,         
            "Leia Organa": 3,         
            "Owen Lars": 1,           
            "Beru Whitesun lars": 2,  
            "Obi-Wan Kenobi": 3,      
        };

        characters.forEach(function (char) {
            const li = document.createElement("li");
            li.classList.add("col-span-4", "m-col-span-6", "l-col-span-3");
            const filmIdx = preferredFilmIndex[char.name] || 0;
            const safeIdx = filmIdx < char.films.length ? filmIdx : 0;
            li.innerHTML = `<a href="#" data-movie="${char.films[safeIdx]}" data-char-url="${char.url}">${char.name}</a>`;
            charList.appendChild(li);
        });

        gsap.from("#character-list li", {
            opacity: 0,
            y: 30,
            stagger: 0.08,
            duration: 0.5,
            ease: "power2.out"
        });

        attachCharacterListeners();
    }

    function attachCharacterListeners() {
        const links = document.querySelectorAll("#character-list li a");
        links.forEach(function (link) {
            link.addEventListener("click", getMovieDetails);
        });
    }

    function getMovieDetails(e) {
        e.preventDefault();
        const url = e.currentTarget.dataset.movie;

        toggleLoading(true);

        fetch(url)
            .then(handleResponse)   
            .then(processMovie)     
            .catch(handleError);    
    }

    function processMovie(movie) {
        console.log("Movie loaded:", movie);
        toggleLoading(false);

        movieCon.innerHTML = "";

        const clone = movieTemplate.content.cloneNode(true);
        const title = clone.querySelector(".movie-container__title");
        const crawl = clone.querySelector(".movie-container__crawl");
        const poster = clone.querySelector(".movie-container__img");
        const charListEl = clone.querySelector(".movie-container__characters");

        title.textContent = movie.title;
        crawl.textContent = movie.opening_crawl;
        poster.src = `images/film_${movie.episode_id}.jpg`;
        poster.alt = `Poster for ${movie.title}`;

        const movieCharUrls = movie.characters; // Array of character URLs from film data
        const matchingChars = loadedCharacters.filter(function (char) {
            return movieCharUrls.includes(char.url);
        });

        if (matchingChars.length > 0) {
            charListEl.innerHTML = `<strong>Characters in this film:</strong> ${matchingChars.map(function (c) { return c.name; }).join(", ")}`;
        } else {
            charListEl.innerHTML = `<strong>Characters in this film:</strong> Data unavailable`;
        }

        movieCon.appendChild(clone);

        highlightMatchingCharacters(movieCharUrls);

        if (window.innerWidth < 768) {
            const movieSection = document.querySelector("#movie-info");
            movieSection.scrollIntoView({ behavior: "smooth", block: "start" });
        }

        gsap.from(".movie-container", {
            opacity: 0,
            y: 20,
            duration: 0.5,
            ease: "power2.out"
        });
        gsap.from(".movie-container__img", {
            opacity: 0,
            scale: 0.9,
            duration: 0.6,
            delay: 0.15,
            ease: "back.out(1.4)"
        });
        gsap.from(".movie-container__title", {
            opacity: 0,
            x: -20,
            duration: 0.4,
            delay: 0.25
        });
        gsap.from(".movie-container__crawl", {
            opacity: 0,
            y: 15,
            duration: 0.5,
            delay: 0.35
        });
        gsap.from(".movie-container__characters", {
            opacity: 0,
            y: 10,
            duration: 0.4,
            delay: 0.45
        });
    }

    function highlightMatchingCharacters(movieCharUrls) {
        const allItems = document.querySelectorAll("#character-list li");
        allItems.forEach(function (li) {
            const link = li.querySelector("a");
            const charUrl = link.dataset.charUrl;
            li.classList.remove("active", "in-film");
            if (movieCharUrls.includes(charUrl)) {
                li.classList.add("in-film");
            }
        });
    }

    getCharacters();

})();