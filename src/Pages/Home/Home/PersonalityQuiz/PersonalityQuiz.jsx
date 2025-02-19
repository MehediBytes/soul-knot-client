import { useState } from "react";

const PersonalityQuiz = () => {
    const [answers, setAnswers] = useState({});
    const [result, setResult] = useState("");

    const questions = [
        {
            id: "q1",
            question: "What’s your ideal first date?",
            options: ["Romantic dinner", "Adventure trip", "Movie night", "Casual coffee chat"],
        },
        {
            id: "q2",
            question: "Which trait matters most in a partner?",
            options: ["Loyalty", "Sense of humor", "Ambition", "Kindness"],
        },
        {
            id: "q3",
            question: "How do you handle conflicts in a relationship?",
            options: ["Talk it out calmly", "Take time to cool off", "Find a compromise", "Avoid arguments"],
        },
    ];

    const handleChange = (questionId, answer) => {
        setAnswers((prev) => ({
            ...prev,
            [questionId]: answer,
        }));
    };

    const calculateMatch = () => {
        const values = Object.values(answers);
        if (values.length < questions.length) {
            setResult("Please answer all questions!");
            return;
        }

        // Simple logic to determine match type
        if (values.includes("Romantic dinner") && values.includes("Loyalty")) {
            setResult("You're a True Romantic! 💕");
        } else if (values.includes("Adventure trip") && values.includes("Sense of humor")) {
            setResult("You're an Adventurous Spirit! 🌍");
        } else if (values.includes("Movie night") && values.includes("Ambition")) {
            setResult("You're a Dream Chaser! 🎬");
        } else {
            setResult("You're a Kind Soul! 😊");
        }
    };

    const refreshQuiz = () => {
        setAnswers({});
        setResult("");
        document.querySelectorAll('input[type="radio"]').forEach((input) => (input.checked = false));
    };

    return (
        <section className="container mx-auto py-5">
            <div className="px-4">
                <h2 className="text-3xl font-bold text-center mb-2">Personality Match Quiz</h2>
                <p className="text-center text-gray-600 mb-5">Find out what is you personality. Its a fun caculator to show your personality.</p>
                <div className="grid grid-cols-1 lg:grid-cols-3">
                    {questions.map((q, index) => (
                        <div key={q.id} className="mb-6">
                            <h3 className="text-lg font-semibold">{index + 1}. {q.question}</h3>
                            <div className="mt-2 space-y-2">
                                {q.options.map((option) => (
                                    <label key={option} className="flex items-center space-x-2 cursor-pointer">
                                        <input
                                            type="radio"
                                            name={q.id}
                                            value={option}
                                            onChange={() => handleChange(q.id, option)}
                                            className="w-4 h-4"
                                        />
                                        <span className="text-gray-500">{option}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="flex justify-center items-center gap-5">
                    <button
                        onClick={calculateMatch}
                        className="px-8 bg-pink-500 text-white py-2 rounded-full text-md font-semibold hover:bg-pink-700"
                    >
                        Get My Match!
                    </button>
                    <button
                        onClick={refreshQuiz}
                        className="text-pink-500 py-2 px-8 rounded-full border border-pink-500 text-md font-semibold hover:bg-pink-500 hover:text-white"
                    >
                        Refresh Quiz
                    </button>
                </div>
                {result && <p className="mt-4 text-center text-xl font-semibold text-green-500">{result}</p>}
            </div>
        </section>
    );
};

export default PersonalityQuiz;
