import React, { useEffect, useState } from "react";

function GoaBase({ cityName, coordinates }) {
    const [data, setData] = useState([]);

    const [starredParties, setStarredParties] = useState(() => {
        const saved = localStorage.getItem("starredParties");
        const initialValue = JSON.parse(saved);
        return initialValue || [];
    });

    const toggleStar = (party) => {
        const isStarred = starredParties.includes(party);
        const newStarredParties = isStarred
            ? starredParties.filter((p) => p !== party)
            : [...starredParties, party];
        setStarredParties(newStarredParties);
    };

    useEffect(() => {
        localStorage.setItem("starredParties", JSON.stringify(starredParties));
    }, [starredParties]);

    useEffect(() => {
        fetch("https://www.goabase.net/de/api/party/json/?nameTown=cologne")
            .then((response) => response.json())
            .then((data) => {
                // Zugriff auf das 'partylist' Feld des JSON-Objekts
                const parties = data.partylist;

                // Überprüfen, ob 'partylist' ein Array ist
                if (Array.isArray(parties)) {
                    const filteredData = parties.filter(
                        (party) => party.nameTown === cityName
                    );
                    const sortedData = filteredData.sort((a, b) => {
                        // Konvertieren der 'dateStart'-Strings in Date-Objekte für den Vergleich
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
    }, []);

    const convertDate = (date) => {
        const dateObj = new Date(date);
        const options = { year: "numeric", month: "long", day: "numeric" };
        return dateObj.toLocaleDateString("de-DE", options);
    };

    return (
        <div>
            {data.map((item, index) => (
                <div className="party" key={index}>
                    <img
                        src={item.urlImageFull}
                        alt="Bild"
                        style={{ height: "300px" }}
                    />
                    <h2>{item.nameParty}</h2>
                    <h3>
                        {" "}
                        {convertDate(item.dateStart)}, {item.nameTown},{" "}
                        <a
                            href={item.urlPartyHtml}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Website
                        </a>
                    </h3>
                    <i
                        className="material-icons"
                        style={{
                            color: starredParties.includes(item.nameParty)
                                ? "yellow"
                                : "none",
                            position: "relative",
                            bottom: 0,
                            right: 0,
                            cursor: "pointer",
                        }}
                        onClick={() => toggleStar(item.nameParty)}
                    >
                        star
                    </i>
                </div>
            ))}
        </div>
    );
}

export default GoaBase;
