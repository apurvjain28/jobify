import { UnAuthenticatedError } from "../errors/index.js";

const checkPermission = (requestUser, resourceUserId) => {
  // could be used to assign permissions for different role
  if (requestUser.userId === resourceUserId.toString()) return;

  throw new UnAuthenticatedError("Not authorized to access this route");
};

export default checkPermission;
