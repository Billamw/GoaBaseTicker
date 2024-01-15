import React, { useEffect, useState } from "react";

function GoaBase() {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch("https://www.goabase.net/de/api/party/json/")
            .then((response) => response.json())
            .then((data) => {
                // Zugriff auf das 'parties' Feld des JSON-Objekts
                const parties = data.parties;

                // Überprüfen, ob 'parties' ein Array ist
                if (Array.isArray(parties)) {
                    const sortedData = parties.sort((a, b) => {
                        if (a.country < b.country) {
                            return -1;
                        }
                        if (a.country > b.country) {
                            return 1;
                        }
                        return 0;
                    });
                    setData(sortedData);
                } else {
                    console.error("Error: Parties data is not an array");
                }
            })
            .catch((error) => console.error("Error:", error));
    }, []);

    return (
        <div>
            {data.map((item, index) => (
                <div key={index}>
                    <h2>{item.country}</h2>
                    {/* Add other fields you want to display */}
                </div>
            ))}
        </div>
    );
}

export default GoaBase;
