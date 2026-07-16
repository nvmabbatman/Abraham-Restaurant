import React, { useState, useEffect } from 'react';
import { APIProvider, Map, AdvancedMarker, Pin, InfoWindow } from '@vis.gl/react-google-maps';
import { Compass, Sparkles, MapPin, Info, Layers, ExternalLink } from 'lucide-react';

interface AddisLocation {
  id: string;
  name: string;
  address: string;
  description: string;
  lat: number;
  lng: number;
  city: string;
  vibe: string;
  phone: string;
}

const ADDIS_LOCATIONS: AddisLocation[] = [
  {
    id: "bole",
    name: "Abraham Bole Sanctuary (Main)",
    address: "Bole Road, Ward 03, Addis Ababa, Ethiopia",
    description: "Our flagship wood-fired culinary destination. Savor traditional slow-cooked cuisine in an elegant modern garden.",
    lat: 9.0012,
    lng: 38.7831,
    city: "Addis Ababa",
    vibe: "Flagship Wood-Fired Garden",
    phone: "+251 11 663 2121"
  },
  {
    id: "kazanchis",
    name: "Abraham Kazanchis Sanctuary",
    address: "Kazanchis, Guinea Conakry St, Addis Ababa, Ethiopia",
    description: "Savor premium charcoal-grilled Tibs and custom sourdough Injera in a beautiful historical-themed dining room.",
    lat: 9.0195,
    lng: 38.7663,
    city: "Addis Ababa",
    vibe: "Historical Sizzle Haven",
    phone: "+251 11 663 2122"
  },
  {
    id: "oldairport",
    name: "Abraham Old Airport Sanctuary",
    address: "Old Airport District, Addis Ababa, Ethiopia",
    description: "Relax in our lush outdoor garden oasis. Features live traditional coffee ceremonies and slow clay-pot simmering.",
    lat: 8.9892,
    lng: 38.7302,
    city: "Addis Ababa",
    vibe: "Lush Garden & Coffee Oasis",
    phone: "+251 11 663 2123"
  }
];

const API_KEY =
  process.env.GOOGLE_MAPS_PLATFORM_KEY ||
  (import.meta as any).env?.VITE_GOOGLE_MAPS_PLATFORM_KEY ||
  (globalThis as any).GOOGLE_MAPS_PLATFORM_KEY ||
  '';

const hasValidKey = Boolean(API_KEY) && API_KEY !== 'YOUR_API_KEY';

export default function GMap() {
  const [location, setLocation] = useState<AddisLocation>(ADDIS_LOCATIONS[0]);
  const [isSpinning, setIsSpinning] = useState(false);
  const [infoWindowOpen, setInfoWindowOpen] = useState(true);
  const [showConfigHint, setShowConfigHint] = useState(false);

  // Pick a random location on mount
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * ADDIS_LOCATIONS.length);
    setLocation(ADDIS_LOCATIONS[randomIndex]);
  }, []);

  const selectRandomLocation = () => {
    if (isSpinning) return;
    setIsSpinning(true);
    setInfoWindowOpen(false);

    let count = 0;
    const interval = setInterval(() => {
      setLocation(ADDIS_LOCATIONS[count % ADDIS_LOCATIONS.length]);
      count++;
    }, 120);

    setTimeout(() => {
      clearInterval(interval);
      const remainingList = ADDIS_LOCATIONS.filter(r => r.name !== location.name);
      const chosen = remainingList[Math.floor(Math.random() * remainingList.length)] || ADDIS_LOCATIONS[0];
      setLocation(chosen);
      setIsSpinning(false);
      setInfoWindowOpen(true);
    }, 1200);
  };

  // OpenStreetMap embed coordinates bounding box calculator
  const deltaLng = 0.012;
  const deltaLat = 0.008;
  const minLng = location.lng - deltaLng;
  const minLat = location.lat - deltaLat;
  const maxLng = location.lng + deltaLng;
  const maxLat = location.lat + deltaLat;
  const osmUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${minLng}%2C${minLat}%2C${maxLng}%2C${maxLat}&layer=mapnik&marker=${location.lat}%2C${location.lng}`;

  return (
    <div className="relative bg-[#F5F2EA] border border-natural-border p-5 md:p-6 rounded-[40px] shadow-lg flex flex-col w-full space-y-4">
      {/* Header section with location details */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-natural-border/60 pb-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-widest text-natural-sage bg-white px-2.5 py-1 rounded-full border border-natural-border/40 flex items-center gap-1.5 font-mono shadow-2xs">
              <Sparkles className="w-3 h-3 text-natural-sage animate-pulse" />
              {hasValidKey ? 'Google Maps Mode' : 'Live Interactive Map'}
            </span>
            <button 
              onClick={() => setShowConfigHint(!showConfigHint)}
              className="text-natural-mutedtext hover:text-natural-sage transition-colors p-1 rounded-full bg-white/50 border border-natural-border/30 cursor-pointer"
              title="Map Configuration Info"
            >
              <Info className="w-3.5 h-3.5" />
            </button>
          </div>
          <h3 className="serif-display text-xl font-black text-natural-dark uppercase mt-1">
            {location.name}
          </h3>
          <p className="text-xs text-natural-mutedtext font-medium leading-relaxed max-w-xl">
            {location.description}
          </p>
        </div>
        
        <button
          onClick={selectRandomLocation}
          disabled={isSpinning}
          className="flex-shrink-0 px-4 py-2.5 bg-natural-sage hover:bg-natural-moss text-white rounded-full font-bold text-[10px] uppercase tracking-widest hover:scale-102 active:scale-98 transition-all cursor-pointer flex items-center gap-1.5 border-0 shadow-md disabled:opacity-50"
        >
          <Compass className={`w-3.5 h-3.5 ${isSpinning ? 'animate-spin' : ''}`} />
          {isSpinning ? 'Choosing...' : 'Random Sanctuary'}
        </button>
      </div>

      {/* Info Configuration Tip panel */}
      {showConfigHint && (
        <div className="bg-amber-50/75 border border-amber-200/60 p-4 rounded-3xl text-xs text-amber-900 space-y-2 animate-fadeIn">
          <p className="font-bold uppercase tracking-wider flex items-center gap-1">
            <Layers className="w-3.5 h-3.5" /> Developer Maps Integration Info:
          </p>
          <p className="leading-relaxed opacity-90">
            This map defaults to a beautiful, interactive <strong>OpenStreetMap</strong> integration that runs natively without API configuration. If you have a Google Maps Platform key, you can activate premium styled Google maps by adding <code className="bg-white px-1.5 py-0.5 rounded border border-amber-300 font-mono text-xs">GOOGLE_MAPS_PLATFORM_KEY</code> under the <strong>Settings (⚙️) &gt; Secrets</strong> panel.
          </p>
        </div>
      )}

      {/* Selection Tabs for Quick Swapping */}
      <div className="grid grid-cols-3 gap-2">
        {ADDIS_LOCATIONS.map((loc) => {
          const isSelected = location.id === loc.id;
          return (
            <button
              key={loc.id}
              onClick={() => {
                setLocation(loc);
                setInfoWindowOpen(true);
              }}
              className={`py-2 px-1 text-center rounded-2xl border transition-all cursor-pointer flex flex-col justify-center items-center gap-0.5 ${
                isSelected
                  ? 'bg-natural-sage border-natural-sage text-white shadow-sm font-bold'
                  : 'bg-white border-natural-border text-natural-mutedtext hover:border-natural-sage/50 hover:text-natural-dark font-semibold'
              }`}
            >
              <span className="text-[10px] uppercase tracking-wider block leading-none">
                {loc.id === 'bole' ? 'Bole (Main)' : loc.id === 'kazanchis' ? 'Kazanchis' : 'Old Airport'}
              </span>
              <span className={`text-[8px] opacity-75 hidden sm:inline-block uppercase tracking-widest font-mono mt-0.5`}>
                {loc.id === 'bole' ? 'East' : loc.id === 'kazanchis' ? 'Center' : 'Southwest'}
              </span>
            </button>
          );
        })}
      </div>

      {/* Live Map Stage Area */}
      <div className="relative w-full h-[360px] bg-white border border-natural-border rounded-3xl overflow-hidden shadow-inner flex items-center justify-center">
        {hasValidKey ? (
          // Google Maps Engine
          <APIProvider apiKey={API_KEY} version="weekly">
            <Map
              defaultCenter={{ lat: location.lat, lng: location.lng }}
              center={{ lat: location.lat, lng: location.lng }}
              defaultZoom={14}
              zoom={14}
              mapId="DEMO_MAP_ID"
              internalUsageAttributionIds={['gmp_mcp_codeassist_v1_aistudio']}
              style={{ width: '100%', height: '100%' }}
              gestureHandling="greedy"
              disableDefaultUI={false}
            >
              {ADDIS_LOCATIONS.map((loc, idx) => (
                <AdvancedMarker 
                  key={idx}
                  position={{ lat: loc.lat, lng: loc.lng }} 
                  onClick={() => {
                    setLocation(loc);
                    setInfoWindowOpen(true);
                  }}
                >
                  <Pin 
                    background={location.name === loc.name ? "#8C8873" : "#C3C0B5"} 
                    borderColor={location.name === loc.name ? "#4A4A35" : "#8C8873"} 
                    glyphColor="#fff" 
                    scale={location.name === loc.name ? 1.25 : 1.0} 
                  />
                </AdvancedMarker>
              ))}

              {infoWindowOpen && (
                <InfoWindow 
                  position={{ lat: location.lat, lng: location.lng }} 
                  onCloseClick={() => setInfoWindowOpen(false)}
                >
                  <div className="p-1 max-w-[200px] text-natural-dark">
                    <h4 className="font-bold text-xs uppercase tracking-tight text-natural-moss">{location.name}</h4>
                    <p className="text-[10px] font-semibold text-natural-lightsage mt-0.5 font-mono">{location.vibe}</p>
                    <p className="text-[10px] leading-relaxed mt-1 text-natural-dark opacity-90">{location.description}</p>
                    <p className="text-[9px] font-medium text-natural-mutedtext mt-1.5 border-t border-natural-border/60 pt-1">{location.address}</p>
                  </div>
                </InfoWindow>
              )}
            </Map>
          </APIProvider>
        ) : (
          // OpenStreetMap Fully Interactive Fallback iframe
          <div className="relative w-full h-full">
            <iframe
              title="Addis Ababa Sanctuary Map"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              src={osmUrl}
              allowFullScreen
              loading="lazy"
            />
            
            {/* Small subtle branding overlay badge */}
            <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-xs px-2.5 py-1.5 rounded-xl border border-natural-border shadow-md flex items-center gap-1.5 pointer-events-auto">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[9px] font-bold uppercase tracking-wider text-natural-dark">
                Live OpenStreetMap Connected
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Map legend / Details bar */}
      <div className="bg-white rounded-2xl border border-natural-border p-3.5 flex flex-col sm:flex-row justify-between gap-3 text-xs text-natural-dark font-medium shadow-2xs">
        <div className="space-y-0.5">
          <span className="text-[9px] font-black uppercase tracking-wider text-natural-lightsage font-mono block">ADDRESS</span>
          <span className="text-natural-dark font-semibold text-xs leading-relaxed">{location.address}</span>
        </div>
        <div className="sm:border-l border-natural-border/60 sm:pl-4 space-y-0.5 min-w-[120px]">
          <span className="text-[9px] font-black uppercase tracking-wider text-natural-lightsage font-mono block font-bold">CONTACT PHONE</span>
          <a href={`tel:${location.phone.replace(/\s+/g, '')}`} className="text-natural-sage hover:text-natural-moss transition-colors font-bold text-xs">
            {location.phone}
          </a>
        </div>
      </div>
    </div>
  );
}
