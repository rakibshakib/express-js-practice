const Poll = require("./Poll");
exports.createPollGetController = (req, res, next) => {
  res.render("form");
};

exports.createPollPostController = async (req, res, next) => {
  let { title, description, option } = req?.body;
  option = option.map((opt) => {
    return {
      name: opt,
      vote: 0,
    };
  });
//   console.log({option})
  let poll = new Poll({
    title,
    description,
    option,
  });
//   console.log("poll", poll)
  try {
    await poll.save();
    res.redirect("./polls");
  } catch (e) {
    console.log("error", e);
  }
  //   console.log(option);
};
