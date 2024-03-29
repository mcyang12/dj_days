document.addEventListener("DOMContentLoaded", function() {
    // DOM elements
    const albumList = document.getElementById("albums");
    const addAlbumForm = document.getElementById("add-album-form");
    const nowPlayingCover = document.getElementById("album-cover");
    const nowPlayingTitle = document.getElementById("album-title");
    const nowPlayingArtist = document.getElementById("album-artist");
    const stockMessage = document.getElementById("stock-message");

    // Initial albums (JSON data)
    const initialAlbums = [
        {
            title: "Album 1",
            artist: "Artist 1",
            genre: "Genre 1",
            coverUrl: "https://via.placeholder.com/150"
        },
        {
            title: "Album 2",
            artist: "Artist 2",
            genre: "Genre 2",
            coverUrl: "https://via.placeholder.com/150"
        },
        {
            title: "Album 3",
            artist: "Artist 3",
            genre: "Genre 3",
            coverUrl: "https://via.placeholder.com/150"
        },
        {
            title: "Album 4",
            artist: "Artist 4",
            genre: "Genre 4",
            coverUrl: "https://via.placeholder.com/150"
        },
        {
            title: "Album 5",
            artist: "Artist 5",
            genre: "Genre 5",
            coverUrl: "https://via.placeholder.com/150"
        }
    ];

    // Load initial albums
    initialAlbums.forEach(addAlbumToList);

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
    });

    // Function to add album to the list
    function addAlbumToList(album) {
        const li = document.createElement("li");
        li.innerHTML = `
            <img src="${album.coverUrl}" alt="${album.title} - ${album.artist}">
            <div>
                <h3>${album.title}</h3>
                <p>${album.artist}</p>
            </div>
        `;
        li.addEventListener("click", function() {
            updateNowPlaying(album);
        });
        albumList.appendChild(li);
        checkStock();
    }

    // Function to update the now playing display
    function updateNowPlaying(album) {
        nowPlayingCover.src = album.coverUrl;
        nowPlayingTitle.textContent = album.title;
        nowPlayingArtist.textContent = album.artist;
    }

    // Function to check stock and update message
    function checkStock() {
        const totalAlbums = albumList.childElementCount;
        if (totalAlbums < 10) {
            stockMessage.textContent = "You need more albums to play a full set.";
        } else {
            stockMessage.textContent = "You're ready to start playing your DJ set!";
        }
    }
});
