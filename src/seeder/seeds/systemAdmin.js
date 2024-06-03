const { default: mongoose } = require("mongoose");

const script = async () => {
  await mongoose.models.Users.deleteMany({
    username: "a@a.com",
  });
  const systemAdminRole = await mongoose.models.Roles.findOne({
    name: "System Admin",
  });
  const systemAdmin = {
    username: "a@a.com",
    password: "123456",
    role: systemAdminRole.id,
  };
  await mongoose.models.Users.create(systemAdmin);
  console.log("System Admin created");
};

module.exports = script;
