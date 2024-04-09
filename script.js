document.addEventListener("DOMContentLoaded", function() {
    // DOM elements
    const albumList = document.getElementById("albums");
    const addAlbumForm = document.getElementById("add-album-form");
    const nowPlayingCover = document.getElementById("album-cover");
    const nowPlayingTitle = document.getElementById("album-title");
    const nowPlayingArtist = document.getElementById("album-artist");
    const stockMessage = document.getElementById("stock-message");

    // Load initial albums from JSON file
    fetch("album.json")
        .then(response => response.json())
        .then(albums => {
            albums.forEach(album => {
                addAlbumToList(album);
            });
            checkStock(albums.length); // Pass the length of albums array to checkStock function
        })
        .catch(error => console.error("Error loading albums:", error));

    // Add new album
    addAlbumForm.addEventListener("submit", function(event) {
        event.preventDefault();
        const title = document.getElementById("title").value;
        const artist = document.getElementById("artist").value;
        const genre = document.getElementById("genre").value;
        const coverUrl = document.getElementById("cover-url").value;
        const album = { title, artist, genre, coverUrl };
        addAlbumToList(album);
        addAlbumForm.reset();
        checkStock(albumList.children.length + 1); // Increment the count by 1 for the new album
    });

    // Function to add album to the list
    function addAlbumToList(album) {
        const div = document.createElement("div");
        div.classList.add("retro-wrap");
        div.innerHTML = `
            <div class="retro">
                <img src="${album.coverUrl}" alt="${album.title}">
                <div class="content">
                    <h3>${album.title}</h3>
                    <p>${album.artist}</p>
                </div>
            </div>
        `;
        div.addEventListener("click", function() {
            updateNowPlaying(album);
        });
        albumList.appendChild(div);
    }

    // Function to update the now playing display
    function updateNowPlaying(album) {
        nowPlayingCover.src = album.coverUrl;
        nowPlayingTitle.textContent = album.title;
        nowPlayingArtist.textContent = album.artist;
    }

    // Function to check stock and update message
    function checkStock(albumCount) {
        if (albumCount < 10) {
            stockMessage.innerText = "You need more albums to play a full set.";
        } else {
            stockMessage.innerText = "You're ready to start playing your DJ set.";
        }
    }
});
