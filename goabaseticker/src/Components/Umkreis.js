import React, { useEffect, useState } from "react";
import { getDistanceFromLatLonInKm2 } from "/utils/ConvertLatLonToDistance.js";
import { coordinates } from "/utils/Coordinates.js";

function Umkreis({ coordinates, radius }) {
    const [data, setData] = useState([]);

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
                            const distance = getDistanceFromLatLonInKm2(
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
