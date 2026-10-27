import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'

export default function ArtistPage(){
  const { slug } = useParams()
  const [artist, setArtist] = useState(null)
  
  useEffect(()=>{
    fetch(`http://localhost:5000/api/artists/${slug}`)
      .then(r=>r.json())
      .then(setArtist)
  }, [slug])

  if(!artist) return <div className="bg-black min-h-screen text-white p-10 flex items-center justify-center">Loading {slug}...</div>

  const total = (artist.platforms?.spotify||0) + (artist.platforms?.youtube||0) + (artist.platforms?.audiomack||0) + (artist.platforms?.boomplay||0)

  return (
    <div className="bg-[#0A0A0A] min-h-screen text-white">
      <div className="max-w-5xl mx-auto p-6">
        <Link to="/" className="text-zinc-400 text-sm hover:text-white">← Back to Leaderboard</Link>
        
        <div className="flex gap-6 mt-8 items-center bg-[#121212] p-6 rounded-2xl border border-[#1E1E1E]">
          <img src={artist.image} className="w-24 h-24 rounded-full object-cover" />
          <div>
            <h1 className="text-3xl font-black">{artist.name}</h1>
            <p className="text-zinc-400">{artist.city} • {artist.bio}</p>
            <p className="text-[#FF4D00] font-bold mt-1">{total.toLocaleString()} Total Streams</p>
            <span className={`text-xs px-2 py-1 rounded mt-2 inline-block ${artist.is_subscribed ? 'bg-green-600' : 'bg-zinc-700'}`}>
              {artist.is_subscribed ? artist.subscriptionPlan.toUpperCase() : 'FREE'}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <div className="bg-[#121212] p-4 rounded-xl border border-[#1E1E1E]"><p className="text-zinc-500 text-xs">Spotify</p><p className="text-xl font-bold text-green-400">{artist.platforms?.spotify?.toLocaleString()}</p></div>
          <div className="bg-[#121212] p-4 rounded-xl border border-[#1E1E1E]"><p className="text-zinc-500 text-xs">YouTube</p><p className="text-xl font-bold text-red-400">{artist.platforms?.youtube?.toLocaleString()}</p></div>
          <div className="bg-[#121212] p-4 rounded-xl border border-[#1E1E1E]"><p className="text-zinc-500 text-xs">Audiomack</p><p className="text-xl font-bold text-orange-400">{artist.platforms?.audiomack?.toLocaleString()}</p></div>
          <div className="bg-[#121212] p-4 rounded-xl border border-[#1E1E1E]"><p className="text-zinc-500 text-xs">Boomplay</p><p className="text-xl font-bold text-blue-400">{artist.platforms?.boomplay?.toLocaleString()}</p></div>
        </div>

        <div className="mt-8 bg-[#121212] p-6 rounded-2xl border border-[#1E1E1E]">
          <h2 className="font-bold">Day 5 Complete! 🎉</h2>
          <p className="text-zinc-400 text-sm mt-2">Your API works: http://localhost:5000/api/artists/{slug}<br/>Works for ALL artists now!</p>
        </div>
      </div>
    </div>
  )
}