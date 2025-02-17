export const CheckRole = async () => {

  const roleResponse = await fetch(`${import.meta.env.VITE_PRODUCTION_API_URI}/api/auth/user/role`, {
    method: "GET",
    credentials: "include",

  });
  const roleData = await roleResponse.json();
  if (roleData.role.includes('admin')) {
    console.log("Admin Role")
  } else {
    console.log("User Role")
  }

}