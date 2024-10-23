const express=require('express')

const app=express()
app.use(express.json())
let Livre=[
    {id:1,titre:'java',auteur:'Eric Michel',prix:700},
    {id:2,titre:'PHP',auteur:'Jean park',prix:500},
]

app.get('/livres',(req,res)=>{
    res.status(200).json(Livre)
})
app.get('/livres/:id',(req,res)=>{
    let {id}=req.params
    const livre=Livre.find(e => e.id==Number(id))
    if(!livre)
        res.status(404).json({message:"Livre n'existe pas"})
    else
        res.status(200).json(livre)
})
app.get('/livres/auteur/:auteur',(req,res)=>{
    let {auteur}=req.params
    auteur=auteur.replace('_',' ')
    const livre=Livre.filter(e => e.auteur.toLocaleLowerCase()==auteur.toLocaleLowerCase())
    if(livre.length>0)
        res.status(200).json(livre)
    else
        res.status(404).json({message:"Livres de cet auteur n'existent pas"})
})
app.post('/livres/add',(req,res)=>{
    let {id}=req.body
    const livre=Livre.find(e => e.id==id)
    if(livre)
        res.status(200).json({message:'ce livre est deja existe'})
    else
        {
            Livre.push(req.body)
            res.status(201).json({message:'cet livre est bien ajoute'})
        }
})
app.put('/livres/edit/:id',(req,res)=>{
    let {id}=req.params
    const livre=Livre.find( e => e.id==id)
    if(!livre)
        res.status(404).json({message:"ce livre n'existe pas"})
    else{
        livre.titre=req.body.titre
        livre.auteur=req.body.auteur
        livre.prix=req.body.prix
        res.status(200).json({message:"ce livre bien modifie"})
    }
})
app.delete('/livres/del/:id',(req,res)=>{
    let {id}=req.params
    let size=Livre.length
    Livre=Livre.filter(e =>e.id != id)
    if(size==Livre.length)
    res.status(404).json({message:"ce livre n'existe pas"})
    else
    res.status(200).json({message:"bien supprime"})
})
app.listen(3000,console.log('serveur is running'))