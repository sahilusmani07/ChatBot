require('dotenv').config();  
const app = require('./src/app');

const PORT = "https://chatbot-fefn.onrender.com"; // 

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
