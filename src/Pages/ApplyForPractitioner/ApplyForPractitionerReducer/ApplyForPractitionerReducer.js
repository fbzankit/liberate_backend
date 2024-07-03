
const ApplyForPractitionerReducer=(state, { type, payload }) => {
    switch (type) {
    case payload.Type:
      return {...state,...payload}
    default:
      return state
    }
  }
  export default ApplyForPractitionerReducer;
