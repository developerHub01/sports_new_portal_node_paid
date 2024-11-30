const AboutUsServices = require("../services/aboutUsServices");

class AboutUsControllers {
  async update(req, res) {
    try {
      console.log(req.body);
      
      const updatedAboutUs = AboutUsServices.update(req.body);

      if (!updatedAboutUs || typeof updatedAboutUs === "string")
        throw new Error(updatedAboutUs);

      res.redirect("/dashboard/about-us"); // Redirect to login after successful registration
    } catch (err) {
      console.error(err);
      res.status(500).send("Server error");
    }
  }
}

module.exports = new AboutUsControllers();
