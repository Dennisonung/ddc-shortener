a=require;
b=a('express')();
c=JSON;     
g=a('fs');
b.use(a('body-parser').json());
b.get('',(r,s)=>s.sendFile(__dirname+"/i.htm"));
b.post('/c',(r,s)=>{d=r.body.u;e=a('js-sha512').sha512(d).slice(0,7);g.writeFileSync(e,`{"u":"${d}"}`);s.send(e)});
b.get('/:e',(r,s)=>s.redirect(c.parse(g.readFileSync(r.params.e)).u));
b.listen(8069)