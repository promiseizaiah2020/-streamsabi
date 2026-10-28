// =================================================================
// FILE: src/pages/Artists.jsx - SINGLE FILE FOR ALL ARTIST PAGES
// CONTAINS: Signup, Login, Dashboard with Edit Profile, Public Page
// SEPARATE FROM main.jsx - EASY TO UPGRADE FOR THOUSANDS OF USERS
// =================================================================

import { useState, useEffect, useRef } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { supabase } from '../supabase.js'

// =================== CSS FOR ARTIST AREA ===================
const css = `
.input { width:100%; background:#0f0f0f; border:1px solid #2a2a2a; border-radius:10px; padding:12px 14px; color:white; margin-bottom:10px; outline:none; }
.input:focus{border-color:#d4af37}
.label { font-size:11px; color:#aaa; margin:10px 0 4px 2px; display:block; font-weight:600; }
.social-grid { display:grid; grid-template-columns:1fr 1fr; gap:10px; }
@media(max-width:600px){ .social-grid{grid-template-columns:1fr} }
@keyframes spin { from{transform:rotate(0)} to{transform:rotate(360deg)} }
`

let globalPlayer = { setSong: null }
export { globalPlayer }

// =================== ARTIST SIGNUP PAGE AREA - WITH ALL SOCIALS ===================
export function ArtistSignup(){
  const [form,setForm]=useState({ name:'', email:'', password:'', confirm:'', genre:'', image:'', bio:'', phone:'', instagram:'', facebook:'', twitter:'', tiktok:'', youtube:'', spotify:'', apple_music:'', audiomack:'', boomplay:'' })
  const [show,setShow]=useState(false)
  const [loading,setLoading]=useState(false)
  const nav=useNavigate()

  async function signup(e){
    e.preventDefault()
    if(!form.name || !form.email || !form.password) return alert('Name, Email, Password required')
    if(form.password!==form.confirm) return alert('Passwords no match')
    setLoading(true)
    const {data:exists}=await supabase.from('artists').select('id').eq('email',form.email).maybeSingle()
    if(exists){ alert('Email exists, login'); setLoading(false); nav('/artist-login'); return }
    const {data, error}=await supabase.from('artists').insert([{
      name:form.name, email:form.email, password:form.password, genre:form.genre||'Afrobeats',
      image:form.image||`https://ui-avatars.com/api/?name=${encodeURIComponent(form.name)}&background=d4af37&color=000&size=300`,
      bio:form.bio, phone:form.phone,
      instagram:form.instagram, facebook:form.facebook, twitter:form.twitter, tiktok:form.tiktok,
      youtube:form.youtube, spotify:form.spotify, apple_music:form.apple_music, audiomack:form.audiomack, boomplay:form.boomplay
    }]).select().single()
    setLoading(false)
    if(error) alert(error.message)
    else { localStorage.setItem('artist_id',data.id); localStorage.setItem('artist_login','yes'); alert(`Welcome ${data.name}! 🔥`); nav(`/artist-dashboard/${data.id}`) }
  }

  return(
    <div style={{minHeight:'100vh', background:'#0a0a0a', display:'flex', justifyContent:'center', padding:'20px'}}>
      <style>{css}</style>
      <div style={{width:'100%', maxWidth:'560px', background:'#18181b', border:'1px solid #27272a', borderRadius:'24px', padding:'28px', height:'fit-content'}}>
        <h1 style={{fontSize:'26px', fontWeight:900, textAlign:'center'}}>Create Artist Account</h1>
        <p style={{color:'#71717a', fontSize:'12px', textAlign:'center', marginBottom:'16px'}}>Add all your platforms</p>
        <form onSubmit={signup}>
          <span className="label">STAGE NAME *</span><input className="input" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="Bauchi Boy" required/>
          <span className="label">EMAIL *</span><input type="email" className="input" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} placeholder="you@email.com" required/>
          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'10px'}}><div><span className="label">PASSWORD *</span><div style={{position:'relative'}}><input type={show?"text":"password"} className="input" value={form.password} onChange={e=>setForm({...form,password:e.target.value})} placeholder="6+ chars" required style={{paddingRight:'36px'}}/><button type="button" onClick={()=>setShow(!show)} style={{position:'absolute', right:'8px', top:'10px', background:'none'}}>{show?"🙈":"👁️"}</button></div></div><div><span className="label">CONFIRM *</span><input type="password" className="input" value={form.confirm} onChange={e=>setForm({...form,confirm:e.target.value})} placeholder="Confirm" required/></div></div>
          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'10px'}}><select value={form.genre} onChange={e=>setForm({...form,genre:e.target.value})} className="input"><option value="">Genre</option><option>Afrobeats</option><option>Hip-Hop</option><option>Arewa</option><option>Gospel</option><option>Amapiano</option></select><input className="input" value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} placeholder="Phone"/></div>
          <input className="input" value={form.image} onChange={e=>setForm({...form,image:e.target.value})} placeholder="Profile Image URL"/>
          <span className="label">BIO</span><textarea value={form.bio} onChange={e=>setForm({...form,bio:e.target.value})} style={{width:'100%', background:'#0f0f0f', border:'1px solid #2a2a2a', borderRadius:'10px', padding:'12px', color:'white', minHeight:'60px'}} placeholder="Tell fans..."/>
          <span className="label" style={{marginTop:'16px', color:'#d4af37'}}>🔗 SOCIAL & PLATFORMS (Fill if you have)</span>
          <div className="social-grid"><input className="input" value={form.instagram} onChange={e=>setForm({...form,instagram:e.target.value})} placeholder="Instagram"/><input className="input" value={form.facebook} onChange={e=>setForm({...form,facebook:e.target.value})} placeholder="Facebook"/><input className="input" value={form.twitter} onChange={e=>setForm({...form,twitter:e.target.value})} placeholder="Twitter/X"/><input className="input" value={form.tiktok} onChange={e=>setForm({...form,tiktok:e.target.value})} placeholder="TikTok"/><input className="input" value={form.youtube} onChange={e=>setForm({...form,youtube:e.target.value})} placeholder="YouTube"/><input className="input" value={form.spotify} onChange={e=>setForm({...form,spotify:e.target.value})} placeholder="Spotify"/><input className="input" value={form.apple_music} onChange={e=>setForm({...form,apple_music:e.target.value})} placeholder="Apple Music"/><input className="input" value={form.audiomack} onChange={e=>setForm({...form,audiomack:e.target.value})} placeholder="Audiomack"/><input className="input" value={form.boomplay} onChange={e=>setForm({...form,boomplay:e.target.value})} placeholder="Boomplay"/></div>
          <button type="submit" disabled={loading} style={{width:'100%', background: loading?'#333':'linear-gradient(to right,#d4af37,#ff6b00)', color: loading?'#888':'black', fontWeight:900, padding:'14px', borderRadius:'999px', marginTop:'16px'}}>{loading?'Creating...':'Create Account →'}</button>
        </form>
        <div style={{textAlign:'center', marginTop:'14px', fontSize:'12px'}}><Link to="/artist-login" style={{color:'#d4af37'}}>Already have account? Login</Link> • <Link to="/" style={{color:'#666'}}>Home</Link></div>
      </div>
    </div>
  )
}

// =================== ARTIST LOGIN PAGE AREA ===================
export function ArtistLogin(){
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const nav=useNavigate()
  async function login(){
    const {data, error}=await supabase.from('artists').select('*').eq('email',email).eq('password',password).single()
    if(error || !data) return alert('Wrong email/password')
    localStorage.setItem('artist_id',data.id); localStorage.setItem('artist_login','yes'); nav(`/artist-dashboard/${data.id}`)
  }
  return(
    <div style={{minHeight:'100vh', background:'black', display:'grid', placeItems:'center', padding:'16px'}}>
      <style>{css}</style>
      <div style={{background:'#18181b', padding:'28px', borderRadius:'20px', width:'360px', border:'1px solid #222'}}>
        <h1 style={{fontWeight:900, marginBottom:'12px'}}>Artist Login</h1><input className="input" value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email"/><input type="password" className="input" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password"/><button onClick={login} style={{width:'100%', background:'#d4af37', padding:'12px', borderRadius:'999px', fontWeight:700, color:'black'}}>Login</button>
        <div style={{marginTop:'12px', textAlign:'center'}}><Link to="/artist-signup" style={{color:'#d4af37', fontSize:'12px'}}>No account? Create one</Link></div>
      </div>
    </div>
  )
}

// =================== ARTIST DASHBOARD AREA - WITH EDIT PROFILE ===================
export function ArtistDashboard(){
  const {id}=useParams()
  const nav=useNavigate()
  const [artist,setArtist]=useState(null)
  const [songs,setSongs]=useState([])
  const [form,setForm]=useState({title:'', audio_url:'', duration:''})
  const [isEditing,setIsEditing]=useState(false)
  const [editForm,setEditForm]=useState({})
  const [saving,setSaving]=useState(false)

  useEffect(()=>{ if(localStorage.getItem('artist_id')!==id && localStorage.getItem('admin')!=='yes'){ nav('/artist-login'); return } load() },[id])
  async function load(){ const {data}=await supabase.from('artists').select('*').eq('id',id).single(); setArtist(data); setEditForm(data); const {data:s}=await supabase.from('songs').select('*').eq('artist_id',id).order('created_at',{ascending:false}); setSongs(s||[]) }
  async function addSong(e){ e.preventDefault(); if(!form.title||!form.audio_url) return alert('Title + MP3 needed'); await supabase.from('songs').insert([{artist_id:id, title:form.title, audio_url:form.audio_url, duration:form.duration||'3:24'}]); setForm({title:'', audio_url:'', duration:''}); load() }
  async function saveProfile(e){ e.preventDefault(); setSaving(true); const {error}=await supabase.from('artists').update({ name:editForm.name, genre:editForm.genre, image:editForm.image, bio:editForm.bio, phone:editForm.phone, instagram:editForm.instagram, facebook:editForm.facebook, twitter:editForm.twitter, tiktok:editForm.tiktok, youtube:editForm.youtube, spotify:editForm.spotify, apple_music:editForm.apple_music, audiomack:editForm.audiomack, boomplay:editForm.boomplay }).eq('id',id); setSaving(false); if(error) alert(error.message); else { alert('Profile Updated! ✅'); setIsEditing(false); load() } }

  if(!artist) return <div style={{padding:'20px', color:'white'}}><style>{css}</style>Loading...</div>

  return(
    <div style={{background:'#0a0a0a', minHeight:'100vh', color:'white'}}>
      <style>{css}</style>
      <div style={{background:'#18181b', padding:'14px 20px', display:'flex', justifyContent:'space-between', borderBottom:'1px solid #222', position:'sticky', top:0, zIndex:10}}>
        <div style={{display:'flex', gap:'12px', alignItems:'center'}}><img src={artist.image_url||artist.image} style={{width:'42px', height:'42px', borderRadius:'50%'}}/><div><h1 style={{fontWeight:800, fontSize:'15px'}}>{artist.name} Dashboard</h1><p style={{fontSize:'11px', color:'#888'}}>{songs.length} songs</p></div></div>
        <div style={{display:'flex', gap:'8px'}}><button onClick={()=>setIsEditing(!isEditing)} style={{background: isEditing ? '#27272a' : '#d4af37', color: isEditing ? 'white' : 'black', padding:'8px 14px', borderRadius:'999px', fontWeight:700, fontSize:'12px'}}>{isEditing ? '✕ Cancel' : '✎ Edit Profile'}</button><Link to={`/artist/${id}`} style={{background:'#27272a', padding:'8px 14px', borderRadius:'999px', fontSize:'12px'}}>View Public</Link><button onClick={()=>{localStorage.clear(); nav('/artist-login')}} style={{background:'white', color:'black', padding:'8px 14px', borderRadius:'999px', fontSize:'12px'}}>Logout</button></div>
      </div>

      <div style={{maxWidth:'1100px', margin:'0 auto', padding:'20px 16px'}}>
        {isEditing && (
          <div style={{background:'#18181b', border:'2px solid #d4af37', borderRadius:'16px', padding:'20px', marginBottom:'20px'}}>
            <h2>✎ Edit Profile & All Socials</h2><form onSubmit={saveProfile}><span className="label">NAME</span><input className="input" value={editForm.name||''} onChange={e=>setEditForm({...editForm,name:e.target.value})} /><div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'10px'}}><select value={editForm.genre||''} onChange={e=>setEditForm({...editForm,genre:e.target.value})} className="input"><option>Afrobeats</option><option>Hip-Hop</option><option>Arewa</option><option>Gospel</option><option>Amapiano</option></select><input className="input" value={editForm.phone||''} onChange={e=>setEditForm({...editForm,phone:e.target.value})} placeholder="Phone"/></div><input className="input" value={editForm.image||editForm.image_url||''} onChange={e=>setEditForm({...editForm,image:e.target.value})} placeholder="Image URL"/><textarea value={editForm.bio||''} onChange={e=>setEditForm({...editForm,bio:e.target.value})} style={{width:'100%', background:'#0f0f0f', border:'1px solid #2a2a2a', borderRadius:'10px', padding:'12px', color:'white', minHeight:'60px'}}/>
            <span className="label" style={{color:'#d4af37', marginTop:'12px'}}>🔗 SOCIAL PLATFORMS</span><div className="social-grid"><input className="input" value={editForm.instagram||''} onChange={e=>setEditForm({...editForm,instagram:e.target.value})} placeholder="Instagram"/><input className="input" value={editForm.facebook||''} onChange={e=>setEditForm({...editForm,facebook:e.target.value})} placeholder="Facebook"/><input className="input" value={editForm.twitter||''} onChange={e=>setEditForm({...editForm,twitter:e.target.value})} placeholder="Twitter"/><input className="input" value={editForm.tiktok||''} onChange={e=>setEditForm({...editForm,tiktok:e.target.value})} placeholder="TikTok"/><input className="input" value={editForm.youtube||''} onChange={e=>setEditForm({...editForm,youtube:e.target.value})} placeholder="YouTube"/><input className="input" value={editForm.spotify||''} onChange={e=>setEditForm({...editForm,spotify:e.target.value})} placeholder="Spotify"/><input className="input" value={editForm.apple_music||''} onChange={e=>setEditForm({...editForm,apple_music:e.target.value})} placeholder="Apple"/><input className="input" value={editForm.audiomack||''} onChange={e=>setEditForm({...editForm,audiomack:e.target.value})} placeholder="Audiomack"/><input className="input" value={editForm.boomplay||''} onChange={e=>setEditForm({...editForm,boomplay:e.target.value})} placeholder="Boomplay"/></div>
            <div style={{display:'flex', gap:'10px', marginTop:'16px'}}><button type="submit" disabled={saving} style={{flex:1, background: saving?'#333':'linear-gradient(to right,#d4af37,#ff6b00)', color: saving?'#888':'black', fontWeight:900, padding:'12px', borderRadius:'999px'}}>{saving?'Saving...':'Save ✅'}</button><button type="button" onClick={()=>setIsEditing(false)} style={{background:'#27272a', color:'white', padding:'12px 20px', borderRadius:'999px'}}>Cancel</button></div></form></div>
        )}
        <div style={{display:'grid', gridTemplateColumns:'340px 1fr', gap:'20px'}}><div><div style={{background:'#18181b', border:'1px solid #222', borderRadius:'16px', padding:'20px'}}><h3>🎵 Add Song</h3><input className="input" value={form.title} onChange={e=>setForm({...form,title:e.target.value})} placeholder="Title"/><input className="input" value={form.audio_url} onChange={e=>setForm({...form,audio_url:e.target.value})} placeholder="MP3 Link"/><input className="input" value={form.duration} onChange={e=>setForm({...form,duration:e.target.value})} placeholder="3:45"/><button onClick={addSong} style={{width:'100%', background:'linear-gradient(to right,#d4af37,#ff6b00)', color:'black', fontWeight:700, padding:'12px', borderRadius:'999px'}}>Upload</button></div></div><div style={{background:'#18181b', border:'1px solid #222', borderRadius:'16px'}}>{songs.map((s,i)=><div key={s.id} style={{display:'flex', gap:'12px', padding:'14px', borderBottom:'1px solid #1e1e1e'}}><span>{i+1}</span><p style={{flex:1}}>{s.title}</p><button onClick={async()=>{await supabase.from('songs').delete().eq('id',s.id); load()}} style={{background:'#7f1d1d', color:'white', padding:'6px 10px', borderRadius:'6px', fontSize:'11px'}}>Del</button></div>)}</div></div>
      </div>
    </div>
  )
}

// =================== ARTIST PUBLIC PAGE AREA - WITH SOCIAL ICONS ===================
export function ArtistPage(){
  const {id}=useParams()
  const [artist,setArtist]=useState(null)
  const [songs,setSongs]=useState([])
  const [playingId,setPlayingId]=useState(null)
  const audioRef=useRef(null)
  const [isPlaying,setIsPlaying]=useState(false)
  const [currentSong,setCurrentSong]=useState(null)

  useEffect(()=>{ 
    supabase.from('artists').select('*').eq('id',id).single().then(({data})=>setArtist(data))
    supabase.from('songs').select('*').eq('artist_id',id).order('created_at',{ascending:false}).then(({data})=>setSongs(data||[]))
  },[id])

  function play(s){
    setCurrentSong({title:s.title, audio_url:s.audio_url, artist_name:artist.name, artist_img:artist.image_url||artist.image})
    setPlayingId(s.id)
    setTimeout(()=>{ audioRef.current?.play(); setIsPlaying(true) },100)
  }

  if(!artist) return <div style={{padding:'20px'}}><style>{css}</style>Loading artist...</div>
  
  const socials = [
    {key:'instagram', label:'IG', url: artist.instagram},
    {key:'facebook', label:'FB', url: artist.facebook},
    {key:'twitter', label:'X', url: artist.twitter},
    {key:'tiktok', label:'TikTok', url: artist.tiktok},
    {key:'youtube', label:'YT', url: artist.youtube},
    {key:'spotify', label:'Spotify', url: artist.spotify},
    {key:'apple_music', label:'Apple', url: artist.apple_music},
    {key:'audiomack', label:'Audiomack', url: artist.audiomack},
    {key:'boomplay', label:'Boomplay', url: artist.boomplay},
  ].filter(s=>s.url)

  return(
    <div style={{background:'#0a0a0a', minHeight:'100vh', color:'white', paddingBottom:'90px'}}>
      <style>{css}</style>
      <div style={{background:'#18181b', padding:'12px 20px', borderBottom:'1px solid #222'}}><Link to="/" style={{fontWeight:900}}>← StreamSabi</Link></div>
      
      <div style={{height:'340px', background:`linear-gradient(to bottom, transparent, #0a0a0a), url(${artist.image_url||artist.image}) center/cover`, display:'flex', alignItems:'flex-end', padding:'24px'}}>
        <img src={artist.image_url||artist.image} style={{width:'130px', height:'130px', borderRadius:'50%', border:'4px solid #d4af37', objectFit:'cover'}}/>
        <div style={{marginLeft:'16px'}}><h1 style={{fontSize:'42px', fontWeight:900}}>{artist.name}</h1><p style={{color:'#aaa'}}>{artist.genre} • {songs.length} songs</p><div style={{display:'flex', gap:'6px', marginTop:'8px', flexWrap:'wrap'}}>{socials.map(s=><a key={s.key} href={s.url?.startsWith('http')?s.url:`https://${s.url}`} target="_blank" rel="noreferrer" style={{background:'#18181b', border:'1px solid #333', padding:'4px 10px', borderRadius:'999px', fontSize:'11px'}}>{s.label}</a>)}</div></div>
      </div>

      <div style={{maxWidth:'800px', margin:'0 auto', padding:'20px'}}>
        {artist.bio && <p style={{color:'#aaa', fontSize:'14px', marginBottom:'16px', background:'#18181b', padding:'14px', borderRadius:'12px'}}>{artist.bio}</p>}
        <div style={{background:'#111', borderRadius:'16px', overflow:'hidden', border:'1px solid #1e1e1e'}}>
          <div style={{display:'flex', padding:'12px 16px', color:'#666', fontSize:'11px', borderBottom:'1px solid #1e1e1e'}}><span style={{width:'24px'}}>#</span><span style={{flex:1}}>TITLE</span><span>DURATION</span></div>
          {songs.map((s,i)=><div key={s.id} onClick={()=>play(s)} style={{display:'flex', alignItems:'center', gap:'12px', padding:'14px 16px', borderBottom:'1px solid #1e1e1e', cursor:'pointer', background: playingId===s.id ? 'rgba(212,175,55,0.1)' : 'transparent'}}><span style={{width:'24px', color: playingId===s.id ? '#d4af37' : '#666'}}>{playingId===s.id ? "▶" : i+1}</span><div style={{flex:1}}><p style={{fontWeight:600, fontSize:'14px'}}>{s.title}</p><p style={{fontSize:'11px', color:'#888'}}>{artist.name}</p></div><span style={{fontSize:'12px', color:'#888'}}>{s.duration}</span></div>)}
        </div>
      </div>

      {/* PLAYER INSIDE ARTIST FILE */}
      {currentSong && (
        <div style={{position:'fixed', bottom:0, left:0, right:0, height:'84px', background:'#18181b', borderTop:'1px solid #222', display:'flex', justifyContent:'space-between', alignItems:'center', padding:'0 16px', zIndex:100}}>
          <div style={{display:'flex', gap:'12px', alignItems:'center'}}><img src={currentSong.artist_img} style={{width:'52px', height:'52px', borderRadius:'8px', animation: isPlaying ? 'spin 8s linear infinite' : 'none'}}/><div><p style={{fontWeight:700}}>{currentSong.title}</p><p style={{fontSize:'11px', color:'#888'}}>{currentSong.artist_name}</p></div></div>
          <div style={{display:'flex', gap:'10px'}}><button onClick={()=>setIsPlaying(!isPlaying)} style={{width:'42px', height:'42px', background:'white', color:'black', borderRadius:'50%', fontWeight:900}}>{isPlaying?"⏸":"▶"}</button><button onClick={()=>setCurrentSong(null)} style={{background:'none', color:'#666'}}>✕</button></div>
          <audio ref={audioRef} src={currentSong.audio_url} onEnded={()=>setIsPlaying(false)} />
        </div>
      )}
    </div>
  )
}