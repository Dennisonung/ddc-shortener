a=require;b=a('express');b().use(b.text()).get('/',(r,s)=>s.sendFile(__dirname+'/i.htm')).post('/c',(r,s)=>{d=r.body;h=a('md5')(d);a('fs').writeFileSync(h,d);s.send(h)}).get('/:h',(r,s)=>s.redirect(a('fs').readFileSync(r.params.h))).listen(8069)