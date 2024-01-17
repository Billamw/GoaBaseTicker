import React, { useEffect, useState } from "react";

function Umkreis({ coordinates, radius }) {
    const [data, setData] = useState([]);

    // Haversine-Formel zur Berechnung der Entfernung zwischen zwei Punkten auf der Erdoberfläche
    const getDistanceFromLatLonInKm = (lat1, lon1, lat2, lon2) => {
        const R = 6371; // Radius der Erde in km
        const dLat = deg2rad(lat2 - lat1);
        const dLon = deg2rad(lon2 - lon1);
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(deg2rad(lat1)) *
                Math.cos(deg2rad(lat2)) *
                Math.sin(dLon / 2) *
                Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = R * c; // Entfernung in km
        return distance;
    };

    const deg2rad = (deg) => {
        return deg * (Math.PI / 180);
    };

    useEffect(() => {
        fetch("https://www.goabase.net/de/api/party/json/?nameTown=cologne")
            .then((response) => response.json())
            .then((data) => {
                const parties = data.partylist;

                if (Array.isArray(parties)) {
                    let filteredData = parties;
                    if (cityName) {
                        filteredData = parties.filter(
                            (party) => party.nameTown === cityName
                        );
                    }
                    if (coordinates) {
                        filteredData = filteredData.filter((party) => {
                            const distance = getDistanceFromLatLonInKm(
                                coordinates[0],
                                coordinates[1],
                                party.geoLat,
                                party.geoLon
                            );
                            return distance <= radius;
                        });
                    }
                    const sortedData = filteredData.sort((a, b) => {
                        const dateA = new Date(a.dateStart);
                        const dateB = new Date(b.dateStart);
                        return dateA - dateB;
                    });
                    setData(sortedData);
                    if (sortedData.length > 0) {
                        console.log(sortedData[0]);
                    }
                } else {
                    console.error("Error: Parties data is not an array");
                }
            })
            .catch((error) => console.error("Error:", error));
    }, [cityName, coordinates]);

    return null;
}

export default Umkreis;
