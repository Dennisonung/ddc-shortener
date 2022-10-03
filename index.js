const a = require('express')();
const { existsSync, writeFileSync, readFileSync, mkdirSync } = require('fs');
a.use(require('body-parser').json());
function g(h) {
    let k = h.slice(0, 4) === 'http' ? h : 'https://' + h;
    let e = require('js-sha512').sha512(k).slice(0, 7);
    !existsSync('./ShortData/') && mkdirSync('./ShortData/');
    existsSync(`./ShortData/${e}.json`) && !JSON.parse(readFileSync(`./ShortData/${e}.json`, 'utf8')).e == e && (e = sha(k).slice(0, 8));
    writeFileSync(`./ShortData/${e}.json`, JSON.stringify({url: k}), (err) => { console.log(err) });
    return "http://localhost:8069/" + e;
};
a.get('/', (_req, res) => {
    res.sendFile(__dirname + "/index.html");
});
a.post('/create', (req, res) => {
    (req.body.url.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g)) ? res.send(g(req.body.url)) : res.status(400).send("Invalid URL");
});
a.get('/:e', (req, res) => {
    existsSync(`./ShortData/${req.params.e}.json`) ? res.redirect(JSON.parse(readFileSync(`./ShortData/${req.params.e}.json`, 'utf8')).url) : res.redirect("/");
});
a.listen(8069);
