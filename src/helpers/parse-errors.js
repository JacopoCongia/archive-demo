export function parseErrors(currentError) {
  if (currentError.includes("invalid-credential)")) {
    return "Wrong Email or Password";
  }
  if (currentError.includes("invalid-email")) {
    return "The Email Address does not exist";
  }
}
