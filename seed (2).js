require('dotenv').config();
const mongoose = require('mongoose');
const Artist = mongoose.model('Artist', new mongoose.Schema({
  name: String, slug: String, city: String, image: String, bio: String,
  platforms: { spotify: Number, youtube: Number, audiomack: Number, boomplay: Number },
  is_subscribed: Boolean, subscriptionPlan: String
}));

async function seed(){
  await mongoose.connect(process.env.MONGO_URI);
  await Artist.deleteMany({});
  await Artist.insertMany([
    { name: 'Asake Abuja', slug: 'asake-abuja', city: 'Abuja', image: 'https://picsum.photos/200?1', bio: 'Abuja Star', platforms: { spotify: 15000, youtube: 20000, audiomack: 12000, boomplay: 8000 }, is_subscribed: true, subscriptionPlan: 'pro' },
    { name: 'Seyi Vibez', slug: 'seyi-vibez', city: 'Lagos', image: 'https://picsum.photos/200?2', bio: 'Lagos Star', platforms: { spotify: 12000, youtube: 18000, audiomack: 10000, boomplay: 7000 }, is_subscribed: true, subscriptionPlan: 'spotlight' },
    { name: 'Bauchi Boy', slug: 'bauchi-boy', city: 'Bauchi', image: 'https://picsum.photos/200?3', bio: 'Bauchi upcoming', platforms: { spotify: 2000, youtube: 3000, audiomack: 5000, boomplay: 2000 }, is_subscribed: false, subscriptionPlan: 'free' },
    { name: 'PH King', slug: 'ph-king', city: 'PH', image: 'https://picsum.photos/200?4', bio: 'PH Star', platforms: { spotify: 5000, youtube: 6000, audiomack: 4000, boomplay: 3000 }, is_subscribed: false, subscriptionPlan: 'free' },
    { name: 'Kaduna Queen', slug: 'kaduna-queen', city: 'Kaduna', image: 'https://picsum.photos/200?5', bio: 'Kaduna Queen', platforms: { spotify: 8000, youtube: 9000, audiomack: 6000, boomplay: 5000 }, is_subscribed: true, subscriptionPlan: 'pro' },
    { name: 'Jos Hustler', slug: 'jos-hustler', city: 'Jos', image: 'https://picsum.photos/200?6', bio: 'Jos Hustler', platforms: { spotify: 3000, youtube: 4000, audiomack: 3000, boomplay: 2000 }, is_subscribed: false, subscriptionPlan: 'free' },
    { name: 'Kano Wave', slug: 'kano-wave', city: 'Kano', image: 'https://picsum.photos/200?7', bio: 'Kano Wave', platforms: { spotify: 11000, youtube: 13000, audiomack: 9000, boomplay: 6000 }, is_subscribed: true, subscriptionPlan: 'spotlight' },
    { name: 'Lagos Ruler', slug: 'lagos-ruler', city: 'Lagos', image: 'https://picsum.photos/200?8', bio: 'Lagos Ruler', platforms: { spotify: 4000, youtube: 5000, audiomack: 4000, boomplay: 3000 }, is_subscribed: false, subscriptionPlan: 'free' },
    { name: 'Abuja Princess', slug: 'abuja-princess', city: 'Abuja', image: 'https://picsum.photos/200?9', bio: 'Abuja Princess', platforms: { spotify: 9000, youtube: 11000, audiomack: 7000, boomplay: 5000 }, is_subscribed: false, subscriptionPlan: 'free' },
    { name: 'Bauchi Legend', slug: 'bauchi-legend', city: 'Bauchi', image: 'https://picsum.photos/200?10', bio: 'Bauchi Legend', platforms: { spotify: 18000, youtube: 22000, audiomack: 15000, boomplay: 10000 }, is_subscribed: true, subscriptionPlan: 'spotlight' },
  ]);
  console.log('✅ Seeded 10 artists');
  process.exit();
}
seed();