const express = require('express');
const app = express();

app.get('/error',  (req, res) => {
  throw new Error('This is a custom error message');
});

// Define a simple route that throws an error
app.use((err, req, res, next) => {
  // Log the error (optional)
  // console.error(err.stack);
  console.log('Error');

  // Set the response status code
  res.status(err.status || 401);

  // Send the error response
  res.json({
    message: err.message,
    // Add other error properties if needed
  });
})
// Custom error handling middleware
// app.use((err, req, res, next) => {
//   // Log the error (optional)
//   console.error(err.stack);

//   // Set the response status code
//   res.status(err.status || 500);

//   // Send the error response
//   res.json({
//     message: err.message,
//     // Add other error properties if needed
//   });
// });

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
