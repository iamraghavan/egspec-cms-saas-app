const bcrypt = require('bcrypt');
const readline = require('readline');

// Create an interface for reading input from the terminal
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Function to hash a password
const hashPassword = async (password) => {
    try {
        const saltRounds = 10; // You can adjust the number of salt rounds
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        console.log('Hashed Password:', hashedPassword);
    } catch (error) {
        console.error('Error hashing password:', error);
    } finally {
        rl.close(); // Close the readline interface
    }
};

// Prompt user for password
rl.question('Enter the password to hash: ', (password) => {
    hashPassword(password);
});
