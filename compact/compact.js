let a=require('express')()
let j=JSON
let {existsSync,writeFileSync,readFileSync}=require('fs')
a.use(require('body-parser').json())
function g(h){
let k=h.slice(0,4)==='http'?h:'https://'+h
let e=require('js-sha512').sha512(k).slice(0,7)
writeFileSync(`./Data/${e}.json`,j.stringify({u:k}),(err)=>console.log(err))
return"http://localhost:8069/"+e}
a.get('/',(r,s)=>s.sendFile(__dirname+"/index.html"))
a.post('/create',(r,s)=>s.send(g(r.body.url)))
a.get('/:e',(r,s)=>{
existsSync(`./Data/${r.params.e}.json`)?s.redirect(j.parse(readFileSync(`./Data/${r.params.e}.json`,'utf8')).u):s.redirect("/")
})
a.listen(8069)
