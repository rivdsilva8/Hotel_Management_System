import accountRoutes from "./guest/account.js";

const constructorMethod = (app) => {
  app.use("/", accountRoutes);

  app.use("*", (req, res) => {
    res.render("error", {
      title: "Error",
      code: 404,
      hasError: true,
      error: "page not found",
    });
  });
};

export default constructorMethod;
