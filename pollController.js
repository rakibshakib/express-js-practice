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
exports.getAllPolls = async (req, res, next) => {
  try {
    let polls = await Poll.find();
    res.render("polls", { polls });
  } catch (err) {
    console.log(err);
  }
};
exports.getPollsViewControlller = async (req, res) => {
  const id = req?.params?.id;
  try {
    let poll = await Poll.findById(id);
    const option = [...poll.option];
    let result = [];
    option.forEach(opt => {
        let parcentage = ((opt.vote * 100)/ poll.totalVote).toFixed(0);
        result.push({
          ...opt._doc,
          parcentage: parcentage ? parcentage : 0
        })
    });
    res.render("viewPolls", { poll, result });
  } catch (e) {
    console.log(e);
  }
};
exports.postPollsViewControlller = async (req, res) => {
  const id = req?.params?.id;
  const optionId = req.body.option;
  try {
    let poll = await Poll.findById(id);
    const option = [...poll.option];
    const index = option.findIndex((o) => o.id === optionId);
    option[index].vote++;
    const totalVote = poll.totalVote+1;

    await Poll.findOneAndUpdate({ _id: id }, { $set: { option, totalVote } });

    res.redirect("/polls/" + id);
  } catch (e) {
    console.log(e);
  }
};
