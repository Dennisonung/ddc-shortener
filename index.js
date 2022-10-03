const app = require('express')();
const { existsSync, writeFileSync, readFileSync, mkdirSync } = require('fs');
app.use(require('body-parser').json());
const sha = require('js-sha512').sha512;
function CreateShortenURL(url) {
    let link = url.slice(0, 4) === 'http' ? url : 'https://' + url;
    let SavedURL = {url: link};
    let sURL = sha(link).slice(0, 7);
    !existsSync('./ShortData/') && mkdirSync('./ShortData/');
    existsSync(`./ShortData/${sURL}.json`) && !JSON.parse(readFileSync(`./ShortData/${sURL}.json`, 'utf8')).sURL == sURL && (sURL = sha(link).slice(0, 8));
    writeFileSync(`./ShortData/${sURL}.json`, JSON.stringify(SavedURL), (err) => { console.log(err) });
    return "http://localhost:8069/" + sURL;
};
app.get('/', (_req, res) => {
    res.sendFile(__dirname + "/index.html");
});
app.post('/create', (req, res) => {
    (req.body.url.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g)) ? res.send(CreateShortenURL(req.body.url)) : res.status(400).send("Invalid URL");
});
app.get('/:sURL', (req, res) => {
    existsSync(`./ShortData/${req.params.sURL}.json`) ? res.redirect(JSON.parse(readFileSync(`./ShortData/${req.params.sURL}.json`, 'utf8')).url) : res.redirect("/");
});
app.listen(8069);
