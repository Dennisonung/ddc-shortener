a=require;
b=a('express');
e=b();
g=a('fs');
e.use(b.json());
e.get('',(r,s)=>s.sendFile(__dirname+"/i.htm"));
e.post('/c',(r,s)=>{d=r.body.u;e=a('md5')(d);g.writeFileSync(e,d);s.send(e)});
e.get('/:e',(r,s)=>s.redirect(g.readFileSync(r.params.e)));
e.listen(8069)