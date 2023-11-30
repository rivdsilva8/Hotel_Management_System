import adminRoutes from "./admin/index.js";
<<<<<<< Updated upstream
=======
import usersRoutes from "./user_routes.js";
>>>>>>> Stashed changes

const constructorMethod = (app) => {
  app.get("/", (req, res) => {
    res.render("home");
  });

  app.get("/login", (req, res) => {
    res.render("./login/UserLogin");
  });

  app.get("/register", (req, res) => {
    res.render("./login/UserCreate");
<<<<<<< Updated upstream
  });
=======
  });*/
  app.use("/", usersRoutes);
>>>>>>> Stashed changes

  //admin routes
  // TODO: middleware to check if user is actually an admin

  app.use("/admin", adminRoutes);

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
