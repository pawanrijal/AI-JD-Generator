import { useState } from "react";

export default function Dashboard() {
    const [jobTitle, setJobTitle] = useState("");
    const [industry, setIndustry] = useState("");
    const [keyword, setKeyword] = useState("");
    const [tone, setTone] = useState("");
    const [numWords, setNumWords] = useState("");
    const [generatedText, setGeneratedText] = useState("");
    const [isGenerating, setIsGenerating] = useState(false);

    const handleForm = async (e) => {
        e.preventDefault();
        setIsGenerating(true);
        const res = await fetch("/api/returnJobDescription", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                jobTitle,
                industry,
                keyword,
                tone,
                numWords,
            }),
        });
        const data = await res.json();
        setIsGenerating(false);
        setGeneratedText(data.data.trim());
    }

    return (
        <div className="flex justify-center items-center">
            <div className="w-1/2 p-4 ">
                <form className="bg-white p-6 rounded-lg shadow-md" onSubmit={handleForm}>
                    <h2 className="text-lg font-medium mb-4">Enter Fields</h2>
                    <div className="mb-4">
                        <label className="block font-medium mb-2" htmlFor="name">
                            Job Title
                        </label>
                        <input className="w-full p-2 border border-gray-400 rounded-lg" id="jobTitle" type="text"
                            onChange={(e) => { setJobTitle(e.target.value) }}
                            value={jobTitle} />
                    </div>
                    <div className="mb-4">
                        <label className="block font-medium mb-2" htmlFor="email">
                            Industry
                        </label>
                        <input className="w-full p-2 border border-gray-400 rounded-lg" id="industry" type="text"
                            onChange={(e) => { setIndustry(e.target.value) }}
                            value={industry} />

                    </div>
                    <div className="mb-4">
                        <label className="block font-medium mb-2" htmlFor="message">
                            Keywords
                        </label>
                        <input className="w-full p-2 border border-gray-400 rounded-lg" id="keywords" type="text"
                            onChange={(e) => { setKeyword(e.target.value) }}
                            value={keyword} />
                    </div>
                    <div className="mb-4">
                        <label className="block font-medium mb-2" htmlFor="message">
                            Tone
                        </label>
                        <select className="w-full p-2 border border-gray-400 rounded-lg" onChange={(e) => { setTone(e.target.value) }}
                            value={tone}>
                            <option value="default">Select Tone (Optional)</option>
                            <option value="casual">Casual</option>
                            <option value="friendly">Friendly</option>
                            <option value="professional">Professional</option>
                            <option value="formal">Formal</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block font-medium mb-2" htmlFor="message">
                            No of Words
                        </label>
                        <input className="w-full p-2 border border-gray-400 rounded-lg" id="keywords" type="number" onChange={(e) => { setNumWords(e.target.value) }}
                            value={numWords} />
                    </div>
                    <button type="submit" className={`bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-2 px-4 rounded-lg  ${isGenerating || jobTitle === ""
                        ? "cursor-not-allowed opacity-50"
                        : ""
                        }`}>
                        {isGenerating ? "Generating....." : "Generate"}
                    </button>
                </form>
            </div >
            <div className="w-1/2 p-4">
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <label className="block font-medium mb-2" htmlFor="message">
                        Generated JD
                    </label>
                    <textarea className="w-full p-2 border border-gray-400 rounded-lg" id="keywords" type="text"
                        value={generatedText} readOnly={true} rows="20" ></textarea>
                </div>
            </div>
        </div >
    );
}

