const express = require("express");
const categoryRouter = express.Router();

categoryRouter
  .route("/")
  .all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    next();
  })
  .get((req, res) => {
    res.end("Will send all the categories to you");
  })
  .post((req, res) => {
    res.end(
      `Will add the category: ${req.body.name} with description: ${req.body.description}`
    );
  })
  .put((req, res) => {
    res.statusCode = 403;
    res.end("PUT operation not supported on /categories");
  })
  .delete((req, res) => {
    res.end("Deleting all categories");
  });

categoryRouter
  .route("/:producId")
  .all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    next();
  })
  .get((req, res) => {
    res.end(
      `Will send details of the category: ${req.params.categoryId} to you`
    );
  })
  .post((req, res) => {
    res.statusCode = 403;
    res.end(
      `POST operation not supported on /categories/${req.params.categoryId}`
    );
  })
  .put((req, res) => {
    res.write(`Updating the category: ${req.params.categoryId}\n`);
    res.end(`Will update the category: ${req.body.name}
        with description: ${req.body.description}`);
  })
  .delete((req, res) => {
    res.end(`Deleting category: ${req.params.categoryId}`);
  });

module.exports = categoryRouter;
