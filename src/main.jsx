import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider, Link, useNavigate, useParams } from 'react-router-dom'
import { supabase } from './supabase.js'

const css = `
* { margin:0; padding:0; box-sizing:border-box; }
body { background:#09090b; color:white; font-family:system-ui,sans-serif; }
a { text-decoration:none; color:inherit; }
button { cursor:pointer; border:none; }
.navbar { position:sticky; top:0; z-index:50; background:#000d9; backdrop-filter:blur(12px); border-bottom:1px solid #27272a; padding:0 16px; height:64px; display:flex; justify-content:space-between; align-items:center; }
.logo { display:flex; gap:8px; align-items:center; font-weight:900; font-size:20px; }
.logo-icon { width:32px; height:32px; background:#f97316; border-radius:8px; display:flex; align-items:center; justify-content:center; color:black; }
.nav-links { display:flex; gap:16px; align-items:center; }
.btn-admin { background:white; color:black; padding:8px 20px; border-radius:999px; font-weight:700; font-size:14px; }
.container { max-width:1280px; margin:0 auto; padding:24px 16px; }
.hero-title { font-size:36px; font-weight:900; }
.search { width:100%; background:#18181b; border:1px solid #27272a; border-radius:999px; padding:14px 20px; color:white; margin:16px 0 32px 0; outline:none; display:block; }
.grid { display:grid; grid-template-columns: repeat(2, 1fr); gap:16px; }
.card { background:#18181b; border:1px solid #27272a; border-radius:18px; padding:12px; }
.card img { width:100%; aspect-ratio:1; border-radius:12px; object-fit:cover; background:#27272a; display:block; }
.btn-play { margin-top:10px; background:white; color:black; text-align:center; padding:10px; border-radius:999px; font-weight:700; font-size:12px; }
.login-wrap { min-height:100vh; background:black; display:flex; align-items:center; justify-content:center; padding:16px; }
.login-card { width:100%; max-width:380px; background:#18181b; border:1px solid #27272a; border-radius:24px; padding:32px; }
.login-card h1 { font-size:26px; font-weight:900; margin-bottom:20px; }
.login-card input { width:100%; background:black; border:1px solid #333; border-radius:999px; padding:14px 20px; color:white; margin-bottom:16px; display:block; outline:none; }
.login-card button { width:100%; background:#f97316; color:black; font-weight:900; padding:14px; border-radius:999px; font-size:16px; }
.admin-header { background:#18181b; padding:14px 24px; display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid #27272a; }
.admin-grid { display:grid; grid-template-columns: 320px 1fr; gap:24px; margin-top:24px; }
.add-card { background:#18181b; border:1px solid #27272a; border-radius:16px; padding:20px; height:fit-content; }
.add-card input { width:100%; background:black; border:1px solid #333; border-radius:10px; padding:12px; color:white; margin-bottom:12px; display:block; }
.list-card { background:#18181b; border:1px solid #27272a; border-radius:16px; overflow:hidden; }
.artist-row { display:flex; gap:12px; align-items:center; padding:14px; border-bottom:1px solid #27272a; }
.artist-row img { width:48px; height:48px; border-radius:50%; object-fit:cover; }
.btn-del { background:#7f1d1d; color:white; padding:6px 12px; border-radius:8px; font-size:12px; margin-left:auto; }
@media (max-width: 800px) { .grid{grid-template-columns:repeat(2,1fr)} .admin-grid{grid-template-columns:1fr} .hero-title{font-size:28px} }
@media (min-width: 1024px) { .grid{grid-template-columns:repeat(5,1fr)} }
`

function Navbar(){
  return(
    <nav className="navbar">
      <Link to="/" className="logo"><div className="logo-icon">S</div>StreamSabi</Link>
      <div className="nav-links"><Link to="/">Home</Link><Link to="/admin-login" className="btn-admin">Admin</Link></div>
    </nav>
  )
}

function Home(){
  const [artists,setArtists]=useState([])
  const [search,setSearch]=useState('')
  useEffect(()=>{ supabase.from('artists').select('*').order('created_at',{ascending:false}).then(({data})=>setArtists(data||[])) },[])
  const filtered=artists.filter(a=>a.name?.toLowerCase().includes(search.toLowerCase()))
  return(
    <div>
      <style>{css}</style>
      <Navbar/>
      <div className="container">
        <h1 className="hero-title">Discover Nigerian Hits</h1>
        <p style={{color:'#71717a', marginBottom:'16px', fontSize:'14px'}}>{artists.length} artists • Live from Supabase</p>
        <input className="search" value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search Burna Boy, Wizkid..." />
        <div className="grid">
          {filtered.map(a=>{
            const img=a.image_url||a.image||'https://via.placeholder.com/400'
            return <Link key={a.id} to={`/artist/${a.id}`} className="card"><img src={img}/><h3 style={{marginTop:'10px', fontWeight:700}}>{a.name}</h3><p style={{fontSize:'12px', color:'#71717a'}}>{a.genre}</p><div className="btn-play">▶ Play</div></Link>
          })}
        </div>
      </div>
    </div>
  )
}

function AdminLogin(){
  const [pass,setPass]=useState('')
  const [show,setShow]=useState(false)
  const nav=useNavigate()
  return(
    <div className="login-wrap">
      <style>{css}</style>
      <div className="login-card">
        <h1>Admin Login</h1>
        <div style={{position:'relative'}}>
          <input 
            type={show ? "text" : "password"} 
            value={pass} 
            onChange={e=>setPass(e.target.value)} 
            placeholder="streamsabi2026" 
            style={{paddingRight:'50px'}}
          />
          <button 
            type="button"
            onClick={()=>setShow(!show)}
            style={{
              position:'absolute', 
              right:'14px', 
              top:'12px', 
              background:'none', 
              fontSize:'20px',
              padding:'0',
              width:'30px'
            }}
          >
            {show ? "👁️" : "🙈"}
          </button>
        </div>
        <button onClick={()=>{ if(pass==='streamsabi2026'){localStorage.setItem('admin','yes'); nav('/admin')} else alert('Wrong!')}}>Login</button>
        <Link to="/" style={{display:'block', textAlign:'center', color:'#71717a', fontSize:'12px', marginTop:'16px'}}>← Back Home</Link>
      </div>
    </div>
  )
}

function Admin(){
  const nav=useNavigate()
  const [artists,setArtists]=useState([])
  const [form,setForm]=useState({name:'',genre:'',image:''})
  useEffect(()=>{ if(localStorage.getItem('admin')!=='yes') nav('/admin-login'); load() },[])
  async function load(){ const {data}=await supabase.from('artists').select('*').order('created_at',{ascending:false}); setArtists(data||[]) }
  async function add(e){ e.preventDefault(); if(!form.name) return alert('Name needed'); await supabase.from('artists').insert([{name:form.name, genre:form.genre, image:form.image}]); setForm({name:'',genre:'',image:''}); load() }
  async function del(id){ if(!confirm('Delete?')) return; await supabase.from('artists').delete().eq('id',id); load() }
  return(
    <div>
      <style>{css}</style>
      <div className="admin-header"><h1 style={{fontWeight:800}}>Admin <span style={{color:'#22c55e'}}>• LIVE</span></h1><div style={{display:'flex', gap:'8px'}}><Link to="/" style={{background:'#27272a', padding:'7px 14px', borderRadius:'20px', fontSize:'13px'}}>View Home</Link><button onClick={()=>{localStorage.removeItem('admin'); nav('/admin-login')}} style={{background:'white', color:'black', padding:'7px 14px', borderRadius:'20px', fontWeight:700, fontSize:'13px'}}>Logout</button></div></div>
      <div className="container">
        <div className="admin-grid">
          <form onSubmit={add} className="add-card"><h2 style={{marginBottom:'16px', fontWeight:700}}>Add Artist</h2><input value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="Wizkid"/><input value={form.genre} onChange={e=>setForm({...form,genre:e.target.value})} placeholder="Afrobeats"/><input value={form.image} onChange={e=>setForm({...form,image:e.target.value})} placeholder="Image URL"/><button style={{width:'100%', background:'#f97316', color:'black', fontWeight:700, padding:'12px', borderRadius:'999px'}}> + Add</button></form>
          <div className="list-card">{artists.map(a=>{const img=a.image_url||a.image; return <div key={a.id} className="artist-row"><img src={img||'https://via.placeholder.com/100'}/><div><p style={{fontWeight:700, fontSize:'14px'}}>{a.name}</p><p style={{fontSize:'11px', color:'#888'}}>{a.genre}</p></div><button className="btn-del" onClick={()=>del(a.id)}>Delete</button></div>})}</div>
        </div>
      </div>
    </div>
  )
}

function ArtistPage(){
  const {id}=useParams()
  const [artist,setArtist]=useState(null)
  useEffect(()=>{ supabase.from('artists').select('*').eq('id',id).single().then(({data})=>setArtist(data)) },[id])
  if(!artist) return <div style={{padding:'24px'}}><style>{css}</style>Loading... <Link to="/" style={{color:'#f97316'}}>Home</Link></div>
  const img=artist.image_url||artist.image
  return(
    <div><style>{css}</style><Navbar/><div style={{height:'320px', background:`linear-gradient(rgba(0,0,0,0.3), #09090b), url(${img}) center/cover`, display:'flex', alignItems:'flex-end', padding:'28px'}}><div style={{display:'flex', gap:'20px', alignItems:'center'}}><img src={img} style={{width:'120px', height:'120px', borderRadius:'50%', border:'4px solid #f97316'}}/><div><p style={{fontSize:'12px', color:'#f97316', letterSpacing:'2px'}}>VERIFIED ARTIST</p><h1 style={{fontSize:'48px', fontWeight:900, textTransform:'capitalize'}}>{artist.name}</h1><p style={{color:'#a1a1aa'}}>{artist.genre}</p></div></div></div><div style={{padding:'24px'}}><Link to="/" style={{color:'#71717a'}}>← Back</Link></div></div>
  )
}

const router=createBrowserRouter([{path:"/",element:<Home/>},{path:"/artist/:id",element:<ArtistPage/>},{path:"/admin-login",element:<AdminLogin/>},{path:"/admin",element:<Admin/>}])
ReactDOM.createRoot(document.getElementById('root')).render(<RouterProvider router={router}/>)