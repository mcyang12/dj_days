const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static('public'));

const albumsFilePath = path.join(__dirname, "data", "albums.json");

app.get('/api/albums', (req, res) => {
    fs.readFile(albumsFilePath, 'utf8', (err, data) => {
        if(err){
            console.error("Error reading albums data:", err)
            res.status(500).send('Error reading albums data.');
            return;
        }
        try {
            const albums = JSON.parse(data);
            res.json(albums);
        }catch (parseError){
            console.error("Error parsing albums data:", parseError);
            res.status(500).send("Error parsing albums data.");
        }
    });
})

app.post('/api/albums', (req, res) => {
    fs.readFile(albumsFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading albums data:', err);
            res.status(500).send('Error reading albums data.');
            return;
        }
        let albums;
        try {
            albums = JSON.parse(data); 
        } catch (parseError) {
            console.error('Error parsing albums data:', parseError);
            res.status(500).send('Error parsing albums data.');
            return;
        }
        albums.push(req.body); 
        
  
        fs.writeFile(albumsFilePath, JSON.stringify(album, null, 2), (writeErr) => {
            if (writeErr) {
                console.error('Error saving new album:', writeErr);
                res.status(500).send('Error saving new album.');
                return;
            }
            res.status(201).send('Album added.');
        });
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`); 
});