import type { NextApiRequest, NextApiResponse } from "next";


export default async function handler(req: NextApiRequest, res:NextApiResponse) {

    if(req.method==="GET") {
        try {

            const location = req.query.location;

            const apiKey = process.env.WEATHER_API_KEY;
            const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=${apiKey}`;
            const response = await fetch(url);

            if(!response.ok) {
                throw new Error(`Error fetching data: ${response.statusText}`)
            }

            const data = await response.json();

            res.status(200).json(data);

        } catch(error) {
            console.log("Error:", error);
            res.status(500).json({ error: "Something went wrong." });
        }
    } else {
        console.error('Unauthorized method');
        res.status(405).json({ error: "Method not allowed. Use GET." });
    }
}