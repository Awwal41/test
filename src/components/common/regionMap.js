import { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polygon } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Link from "next/link";
import PrimaryButton from "@/components/elements/primaryButton";

export default function RegionMap({
  regions,
  mapHeight = "400px",
  buttonText = "Learn More",
  buttonLink = "/about-us",
}) {
  const [selectedRegion, setSelectedRegion] = useState(null);

  return (
    <div className="flex flex-col md:flex-row gap-8">
      <div className="md:w-1/3">
        <ul className="space-y-4">
          {regions.map((region, index) => (
            <li key={index}>
              <button
                onClick={() => setSelectedRegion(region)}
                className={`text-lg text-gray-700 hover:text-[#90651b] ${
                  selectedRegion?.name === region.name ? "font-bold" : ""
                }`}
              >
                {region.name}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="md:w-2/3">
        <div
          className="w-full rounded-lg overflow-hidden"
          style={{ height: mapHeight }}
        >
          <MapContainer
            center={[39.8283, -98.5795]} // Geographic center of USA
            zoom={4}
            style={{ height: "100%", width: "100%" }}
            className="z-0"
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {regions.map((region, index) => (
              <Marker
                key={index}
                position={region.center}
                eventHandlers={{
                  click: () => setSelectedRegion(region),
                }}
              >
                <Popup>
                  <div>
                    <h3 className="font-bold">{region.name}</h3>
                    <p>{region.description}</p>
                    <p>
                      Email:{" "}
                      <a href={`mailto:${region.contact.email}`}>
                        {region.contact.email}
                      </a>
                    </p>
                    <p>Phone: {region.contact.phone}</p>
                  </div>
                </Popup>
              </Marker>
            ))}
            {selectedRegion && (
              <Polygon
                positions={regions
                  .find((r) => r.name === selectedRegion.name)
                  .center.map((coord) => [coord, coord + 0.5])} // Simplified highlight
                pathOptions={{ color: "#90651b", fillOpacity: 0.3 }}
              />
            )}
          </MapContainer>
        </div>
        {selectedRegion && (
          <div className="mt-1">
            <h3 className="text-xl font-bold text-gray-700">
              {selectedRegion.name}
            </h3>
            <p className="text-sm md:text-base text-gray-700 mb-2">
              {selectedRegion.description}
            </p>
            <p className="text-sm md:text-base text-gray-700">
              Email:{" "}
              <a
                href={`mailto:${selectedRegion.contact.email}`}
                className="underline"
              >
                {selectedRegion.contact.email}
              </a>
            </p>
            <p className="text-sm md:text-base text-gray-700 mb-2">
              Phone: {selectedRegion.contact.phone}
            </p>
            <Link href={buttonLink}>
              <PrimaryButton customStyle="bg-[#90651b] hover:bg-[#a67a2a] px-6 py-2 text-base">
                {buttonText}
              </PrimaryButton>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
