const roles = [
  {
    name: "System Admin",
    permissions: [
      "ManageRestaurants",
      "ManageRestaurantAdmins",
      "ManageBranches",
      "ManageBranchManagers",
      "ManageEmployees",
      "ManageMenus",
      "ViewMenus",
    ],
  },
  {
    name: "Restaurant Admin",
    permissions: [
      "ManageBranches",
      "ManageBranchManagers",
      "ManageEmployees",
      "ManageMenus",
    ],
  },
  { name: "Branch Manager", permissions: ["ManageEmployees", "ManageMenus"] },
  { name: "Employee", permissions: ["ViewMenus"] },
];

const permissions = [
  { name: "ManageRestaurants" },
  { name: "ManageRestaurantAdmins" },
  { name: "ManageBranches" },
  { name: "ManageBranchManagers" },
  { name: "ManageEmployees" },
  { name: "ManageMenus" },
  { name: "ViewMenus" },
];

const script = async () => {
  console.log(global.models.Roles);
  await global.models.Roles.deleteMany({});
  await global.models.Users.deleteMany({});
  await global.models.Permissions.deleteMany({});

  await global.models.Permissions.insertMany(permissions);
  const insertedPermissions = await global.models.Permissions.find();
  const permissionsMap = insertedPermissions.reduce((acc, permission) => {
    acc[permission.name] = permission.id;
    return acc;
  }, {});

  const rolesWithPermissions = roles.map((role) => {
    return {
      name: role.name,
      permissions: role.permissions.map(
        (permission) => permissionsMap[permission]
      ),
    };
  });

  await global.models.Roles.insertMany(rolesWithPermissions);
};

module.exports = script;
