import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'
import ArtistPage from './pages/ArtistPage'
import AdminPage from './pages/admin'
import AdminLoginPage from './pages/adminlogin'
import Compare from './pages/Compare'

const CITIES = ['All','Abuja','Lagos','Bauchi','PH','Kaduna','Jos','Kano']

function Home() {
  const [artists, setArtists] = useState([])
  const [city, setCity] = useState('All')
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  useEffect(() => {
    fetch('http://localhost:5000/api/artists').then(r=>r.json()).then(d=>{setArtists(d); setLoading(false)})
  },[])
  const filtered = artists.filter(a => (city==='All'||a.city===city) && a.name.toLowerCase().includes(search.toLowerCase()))
  return (
    <div className="min-h-screen bg-black text-white p-4">
      <h1 className="text-2xl font-black">StreamSabi</h1>
      <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search..." className="bg-zinc-900 border px-4 py-2 rounded-full mt-4" />
      <div className="flex gap-2 mt-4 overflow-x-auto">{CITIES.map(c=><button key={c} onClick={()=>setCity(c)} className="px-3 py-1 bg-zinc-900 rounded-full text-sm">{c}</button>)}</div>
      <div className="grid grid-cols-2 gap-4 mt-4">{filtered.map(a=><div key={a.slug} onClick={()=>navigate(`/artist/${a.slug}`)} className="bg-zinc-900 p-3 rounded-2xl cursor-pointer">{a.name}</div>)}</div>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/artist/:slug" element={<ArtistPage />} />
        <Route path="/admin-login" element={<AdminLoginPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/compare" element={<Compare />} />
      </Routes>
    </BrowserRouter>
  )
}