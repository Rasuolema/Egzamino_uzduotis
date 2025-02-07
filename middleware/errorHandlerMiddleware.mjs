const errorHandler = (err, req, res) => {
    res.status(500).json({
      status: "error",
      message: `Internal Server Error, ${err.message}`,
    });
  };
  
  export default errorHandler;