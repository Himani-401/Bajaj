const express = require("express");
const app = express();
app.use(express.json());

app.post("/bfhl", (req, res) => {
    const data = req.body.data;
    if (!Array.isArray(data)) {
        return res.status(400).json({ is_success: false, message: "Invalid input format" });
    }

    const odd_numbers = [], even_numbers = [], alphabets = [], special_characters = [];
    let sum = 0;
    let alpha_concat = "";

    for (const item of data) {
        if (/^\d+$/.test(item)) {
            const num = parseInt(item);
            sum += num;
            (num % 2 === 0 ? even_numbers : odd_numbers).push(item);
        } else if (/^[a-zA-Z]+$/.test(item)) {
            alphabets.push(item.toUpperCase());
            alpha_concat += item;
        } else {
            special_characters.push(item);
        }
    }

    const reversed = alpha_concat.split("").reverse();
    let concat_string = "";
    for (let i = 0; i < reversed.length; i++) {
        concat_string += i % 2 === 0 ? reversed[i].toUpperCase() : reversed[i].toLowerCase();
    }

    const response = {
        is_success: true,
        user_id: "your_name_ddmmyyyy", 
        email: "email@example.com",
        roll_number: "ROLL123",
        odd_numbers,
        even_numbers,
        alphabets,
        special_characters,
        sum: sum.toString(),
        concat_string,
    };

    res.status(200).json(response);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
