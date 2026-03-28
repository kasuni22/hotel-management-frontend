import { Shield, ChefHat, Sparkles, Clock, Leaf, Wifi } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '../../components/header/header.jsx';
import Footer from '../../components/footer/Footer.jsx';
const about1 = "https://res.cloudinary.com/dgdpuo8og/image/upload/v1774679203/about1_zbdv5z.jpg";
const about2 = "https://res.cloudinary.com/dgdpuo8og/image/upload/v1774679243/about2_zsb0pq.jpg";
const about3 = "https://res.cloudinary.com/dgdpuo8og/image/upload/v1774683766/hotel_g5dmlc.jpg";

export default function About() {
  const features = [
    {
      icon: Shield,
      title: 'Award Winning',
      text: 'Recognized globally for luxury excellence.',
    },
    {
      icon: ChefHat,
      title: 'World Class Dining',
      text: 'Curated menus by internationally trained chefs.',
    },
    {
      icon: Sparkles,
      title: 'Luxury Spa',
      text: 'Premium wellness treatments and therapies.',
    },
    {
      icon: Clock,
      title: '24/7 Concierge',
      text: 'Round the clock dedicated personal service.',
    },
    {
      icon: Leaf,
      title: 'Eco Friendly',
      text: 'Sustainable luxury with green practices.',
    },
    {
      icon: Wifi,
      title: 'Free High Speed WiFi',
      text: 'Seamless connectivity throughout property.',
    },
  ];

  const team = [
    {
      initials: 'RP',
      name: 'Rohan Perera',
      role: 'General Manager',
      text: '20+ years in luxury hospitality across Asia and Europe.',
    },
    {
      initials: 'NS',
      name: 'Nimali Silva',
      role: 'Head of Guest Relations',
      text: 'Dedicated to creating personalized memorable experiences.',
    },
    {
      initials: 'KF',
      name: 'Kamal Fernando',
      role: 'Executive Chef',
      text: 'Michelin trained with expertise in fusion cuisine.',
    },
  ];

  const timeline = [
    {
      year: '2005',
      title: 'Founded',
      text: 'Kaelura Grand Hotel opens its doors with 20 rooms.',
    },
    {
      year: '2010',
      title: 'Expansion',
      text: 'Added luxury spa, infinity pool and fine dining restaurant.',
    },
    {
      year: '2018',
      title: 'Recognition',
      text: 'Awarded Best Luxury Hotel in Sri Lanka.',
    },
    {
      year: '2024',
      title: 'Today',
      text: '50+ rooms, 500+ happy guests and still growing.',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#3D1C3A] font-sans">
      <Header />

      {/* Hero Banner */}
      <section className="relative overflow-hidden bg-[#3D1C3A]">
        <img src={about3} alt="Hero Background" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-[#3D1C3A]/75"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-28 pb-24 md:pt-36 md:pb-28 text-center">
          <span className="inline-block text-[#C9A86C] tracking-[0.35em] text-xs md:text-sm font-semibold uppercase mb-5">
            OUR STORY
          </span>

          <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
            Where Heritage{' '}
            <span className="italic font-serif text-[#C9A86C]">Meets Hospitality</span>
          </h1>

          <div className="w-24 h-[3px] bg-[#C9A86C] mx-auto mt-6 mb-5 rounded-full"></div>

          <div className="text-[#F0E6D3]/80 text-sm md:text-base">
            Home &gt; About
          </div>
        </div>
      </section>

      {/* Stats Row */}
      <section className="relative z-10 -mt-10 md:-mt-14 px-6">
        <div className="max-w-7xl mx-auto bg-gradient-to-r from-[#D4B57B] via-[#C9A86C] to-[#D4B57B] rounded-3xl shadow-[0_20px_60px_rgba(61,28,58,0.18)] border border-[#e7d1a8]/70 overflow-hidden">
          <div className="grid grid-cols-2 md:grid-cols-4">
            {[
              ['20+', 'Years of Service'],
              ['500+', 'Happy Guests'],
              ['50+', 'Luxury Rooms'],
              ['4.9★', 'Average Rating'],
            ].map(([value, label], index) => (
              <div
                key={label}
                className={`px-6 py-8 md:py-10 text-center ${
                  index !== 3 ? 'md:border-r md:border-[#3D1C3A]/15' : ''
                } ${index === 0 || index === 2 ? 'border-r border-[#3D1C3A]/15' : ''} ${
                  index < 2 ? 'border-b md:border-b-0 border-[#3D1C3A]/15' : ''
                }`}
              >
                <h3 className="text-3xl md:text-4xl font-bold text-[#3D1C3A]">{value}</h3>
                <p className="text-[#3D1C3A]/85 font-medium text-sm md:text-base mt-2">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 md:py-28 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          {/* Images */}
          <div className="relative">
            <div className="absolute -top-5 -left-5 w-28 h-28 border border-[#C9A86C]/60 rounded-2xl hidden md:block"></div>

            <div className="relative rounded-[2rem] overflow-hidden shadow-[0_18px_50px_rgba(61,28,58,0.18)] border border-[#eadbc2] bg-white p-3">
              <img
                src={about1}
                alt="Kaelura Grand Hotel exterior"
                className="w-full h-80 lg:h-[33rem] object-cover rounded-[1.4rem]"
              />
            </div>

            <div className="absolute -bottom-8 right-0 md:-right-8 w-44 h-44 md:w-64 md:h-64 rounded-[1.75rem] overflow-hidden shadow-[0_20px_50px_rgba(61,28,58,0.25)] border-[6px] border-white bg-white">
              <img
                src={about2}
                alt="Luxury interior detail"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Text */}
          <div className="pt-8 lg:pt-0">
            <span className="inline-block text-[#C9A86C] tracking-[0.35em] text-xs font-bold uppercase mb-4">
              A LEGACY OF EXCELLENCE
            </span>

            <h2 className="text-3xl md:text-5xl font-bold text-[#3D1C3A] leading-tight mb-6">
              About Kaelura{' '}
              <span className="italic font-serif text-[#C9A86C]">Grand Hotel</span>
            </h2>

            <div className="w-20 h-1 bg-[#C9A86C] rounded-full mb-8"></div>

            <div className="space-y-5 text-gray-600 leading-8 text-[15px] md:text-base">
              <p>
                Founded on the principles of unrivaled luxury and timeless charm, Kaelura Grand Hotel stands as a beacon of excellence in the heart of Sri Lanka. From its inception, the vision has always been to weave the rich, cultural heritage of the island into an experience of modern sophistication and world-class comfort.
              </p>
              <p>
                Every detail of our property, from the grandiose architecture to the meticulously curated interior decor, reflects our dedication to creating an atmosphere that feels both regal and inviting. With over 20 years of unmatched hospitality, we strive to exceed expectations at every single touchpoint of our guests&apos; journey.
              </p>
              <p>
                Our sanctuary offers sanctuary and serenity, equipped with state-of-the-art amenities, breathtaking views, and curated culinary delights. Kaelura Grand Hotel isn&apos;t just a place to stay&mdash;it&apos;s an unforgettable experience where memories are forged and legacies continue.
              </p>
            </div>

            <div className="mt-10">
              <Link
                to="/categories"
                className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-[#3D1C3A] text-[#F0E6D3] font-semibold tracking-wide shadow-lg shadow-[#3D1C3A]/20 hover:bg-[#2c1229] transition-all duration-300 hover:-translate-y-0.5"
              >
                Explore Our Rooms
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="relative overflow-hidden bg-[#3D1C3A] py-20 md:py-24 px-6">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(201,168,108,0.14),transparent_30%)]"></div>
        <div className="max-w-7xl mx-auto relative">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-5xl font-bold text-[#F0E6D3] font-serif">
              Why Choose Kaelura
            </h2>
            <div className="w-20 h-1 bg-[#C9A86C] rounded-full mx-auto mt-5"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {features.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="group rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm p-8 shadow-[0_12px_30px_rgba(0,0,0,0.12)] transition-all duration-300 hover:-translate-y-1 hover:bg-white/[0.07]"
                >
                  <div className="w-14 h-14 rounded-2xl bg-[#C9A86C]/10 border border-[#C9A86C]/30 flex items-center justify-center mb-5">
                    <Icon className="text-[#C9A86C] w-7 h-7" strokeWidth={1.8} />
                  </div>
                  <h3 className="text-[#F0E6D3] font-bold text-xl mb-3">{item.title}</h3>
                  <p className="text-[#F0E6D3]/75 text-sm leading-7">{item.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Meet Our Team */}
      <section className="py-20 md:py-24 px-6 bg-[#FAF7F2]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-5xl font-bold text-[#3D1C3A] font-serif">
              Our Leadership Team
            </h2>
            <div className="w-20 h-1 bg-[#C9A86C] rounded-full mx-auto mt-5"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
            {team.map((member) => (
              <div
                key={member.name}
                className="bg-white rounded-[2rem] border border-[#eadbc2] shadow-[0_16px_40px_rgba(61,28,58,0.10)] p-8 text-center hover:-translate-y-1 transition-all duration-300"
              >
                <div className="mx-auto w-24 h-24 rounded-full bg-[#3D1C3A] flex items-center justify-center shadow-lg border-[3px] border-[#C9A86C] mb-5">
                  <span className="text-[#C9A86C] text-2xl font-bold font-serif">
                    {member.initials}
                  </span>
                </div>

                <h4 className="text-2xl font-bold text-[#3D1C3A] mb-2">{member.name}</h4>
                <p className="text-[#C9A86C] text-xs md:text-sm uppercase font-bold tracking-[0.25em] mb-4">
                  {member.role}
                </p>
                <p className="text-gray-500 text-sm leading-7 max-w-xs mx-auto">{member.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="relative overflow-hidden bg-[#3D1C3A] py-20 md:py-24 px-6">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(201,168,108,0.12),transparent_28%)]"></div>

        <div className="relative max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-[#F0E6D3] font-serif">
              Our Journey
            </h2>
            <div className="w-20 h-1 bg-[#C9A86C] rounded-full mx-auto mt-5"></div>
          </div>

          <div className="relative">
            <div className="absolute left-4 md:left-1/2 top-0 h-full w-[2px] bg-gradient-to-b from-[#C9A86C]/10 via-[#C9A86C]/70 to-[#C9A86C]/10 md:-translate-x-1/2"></div>

            <div className="space-y-10">
              {timeline.map((item, index) => (
                <div
                  key={item.year}
                  className={`relative grid md:grid-cols-2 gap-6 items-start ${
                    index % 2 === 0 ? '' : ''
                  }`}
                >
                  <div
                    className={`${
                      index % 2 === 0
                        ? 'md:pr-12 md:text-right'
                        : 'md:order-2 md:pl-12 md:text-left'
                    } pl-12 md:pl-0`}
                  >
                    <span className="inline-block text-[#C9A86C] text-2xl md:text-3xl font-bold font-serif tracking-[0.2em] mb-2">
                      {item.year}
                    </span>
                  </div>

                  <div
                    className={`${
                      index % 2 === 0
                        ? 'md:pl-12'
                        : 'md:order-1 md:pr-12 md:text-right'
                    } pl-12 md:pl-0`}
                  >
                    <div className="bg-white/5 border border-white/10 rounded-3xl p-6 md:p-7 backdrop-blur-sm shadow-[0_10px_30px_rgba(0,0,0,0.12)]">
                      <h4 className="text-[#F0E6D3] text-xl font-bold mb-2">{item.title}</h4>
                      <p className="text-[#F0E6D3]/70 text-sm leading-7">{item.text}</p>
                    </div>
                  </div>

                  <div className="absolute left-4 top-3 w-4 h-4 rounded-full bg-[#C9A86C] shadow-[0_0_18px_rgba(201,168,108,0.9)] md:left-1/2 md:-translate-x-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-[#C9A86C] py-20 md:py-24 px-6">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.20),transparent_30%)]"></div>

        <div className="relative max-w-4xl mx-auto text-center bg-white/20 backdrop-blur-sm border border-white/30 rounded-[2rem] p-10 md:p-14 shadow-[0_18px_40px_rgba(61,28,58,0.14)]">
          <h2 className="text-3xl md:text-5xl font-bold text-[#3D1C3A] mb-4 font-serif leading-tight">
            Ready for an Unforgettable Stay?
          </h2>
          <p className="text-[#6B3F68] text-lg font-medium mb-10">
            Book your room today and experience true luxury
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/categories"
              className="px-8 py-4 rounded-full bg-[#3D1C3A] text-[#C9A86C] font-bold text-sm tracking-[0.2em] uppercase hover:bg-[#2A1227] transition-all duration-300 shadow-lg"
            >
              Book Now
            </Link>

            <Link
              to="/contact"
              className="px-8 py-4 rounded-full border-2 border-[#3D1C3A] text-[#3D1C3A] font-bold text-sm tracking-[0.2em] uppercase hover:bg-[#3D1C3A] hover:text-[#C9A86C] transition-all duration-300"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}