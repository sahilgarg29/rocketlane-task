const activityReducer = (activities, action) => {
  switch (action.type) {
    case "ADD_ALL_ACTIVITES":
      action.payload.sort(function (a, b) {
        return b.id - a.id;
      });
      return [...action.payload];
    case "ADD_ACTIVITY":
      return [action.payload, ...activities];
    case "DELETE_ACTIVITY":
      return activities.filter((activity) => activity.id != action.payload);
    default:
      return activities;
  }
};

export default activityReducer;
