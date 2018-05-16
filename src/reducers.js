export default function reducer(state = { markersArray: [] }, action) {
    if (action.type == "RECEIVE_FRIENDS_AND_WANNABES") {
        state = Object.assign({}, state, {
            friends: action.friends
        });
    }
    if (action.type == "REMOVE_FRIEND") {
        state = {
            ...state,
            friends: state.friends.map((friend) => {
                if (friend.id == action.id) {
                    return {
                        ...friend,
                        status: 4
                    };
                } else {
                    return friend;
                }
            })
        };
    }
    if (action.type == "ACCEPT_FRIEND") {
        state = {
            ...state,
            friends: state.friends.map((friend) => {
                if (friend.id == action.id) {
                    return {
                        ...friend,
                        status: 3
                    };
                } else {
                    return friend;
                }
            })
        };
    }
    if (action.type == "DENY_FRIEND") {
        state = {
            ...state,
            friends: state.friends.map((friend) => {
                if (friend.id == action.id) {
                    return {
                        ...friend,
                        status: 5
                    };
                } else {
                    return friend;
                }
            })
        };
    }

    if (action.type == "ONLINE_USERS") {
        state = {
            ...state,
            onlineUsers: action.onlineUsers
        };
    }

    if (action.type == "USER_JOINED") {
        state = {
            ...state,
            onlineUsers: [...state.onlineUsers, action.newUser]
        };
    }
    if (action.type == "USER_LEFT") {
        state = {
            ...state,
            onlineUsers: state.onlineUsers.filter((user) => {
                return user.id != action.userId;
            })
        };
    }
    if (action.type == "INSERT_PIN_INFO") {
        state = {
            ...state,
            markersArray: state.markersArray.concat(action.pinInfo)
        };
    }
    if (action.type == "GET_PIN_INFO") {
        console.log("REDUCER:action in GET_PIN_INFO");
        state = {
            ...state,
            markersArray: [...action.pinsArray]
        };
    }
    if (action.type == "GET_USER_PIN_INFO") {
        console.log("REDUCER:action in GET_USER_PIN_INFO");
        state = {
            ...state,
            markersArray: [...action.pinsArray]
        };
    }
    if (action.type == "SELECT_CATEGORY") {
        state = {
            ...state,
            markersArray: [...action.pinsArray]
        };
    }
    if (action.type == "DELETE_PIN") {
        state = {
            ...state,
            markersArray: state.markersArray.filter((marker) => {
                return marker.id != action.deletedPinObj.id;
            })
        };
    }
    if (action.type == "SAVE_USER_INFO") {
        state = {
            ...state,
            user: action.user
        };
    }

    return state;
}
