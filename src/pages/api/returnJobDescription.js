const generateDescription = async ({ jobTitle, industry, keyword, numWords, tone }) => {
    try {
        const response = await fetch("https://api.openai.com/v1/engines/text-davinci-003/completions", {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${process.env.OPEN_AI_SECRET}`,
            },
            body: JSON.stringify({
                prompt: `Write a job description for a  ${jobTitle} role 
                ${industry ? `in the ${industry} industry` : ""} that is around ${numWords || 200
                    } words in a ${tone || "neutral"} tone. ${keyword ? `Incorporate the following keywords: ${keyword}.` : ""
                    }. The job position should be described in a way that is SEO friendly, highlighting its unique features and benefits`,
                max_tokens: 200,
                temperature: 0.5,
            }),
        }
        );
        const data = await response.json();
        return data.choices[0].text;
    }
    catch (err) {
        console.log(err);
    }
}

export default async function handler(req, res) {
    const { jobTitle, industry, keyword, tone, numWords } = req.body;
    const data = await generateDescription({ jobTitle, industry, keyword, numWords, tone });
    res.status(200).json({
        data,
    });
}
