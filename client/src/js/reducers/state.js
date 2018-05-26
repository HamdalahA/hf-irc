

export default (state = true) => {
  const newState = state;
  switch ('type') {
    case 'SIGNUP_USER_SUCCESS':
      return {
        currentUser: 'user'
      };
    default:
      return newState;
  }
};
