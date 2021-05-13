
const initialState = {
    todos:[],
    id:0
}
function rootReducer(state = initialState, action) {
    switch(action.type){
        case "ADD_TODO":
          var newState = {...state};
          newState.id++;
          return{
              ...newState,
              todos:[...newState.todos, { task: action.task, id:newState.id}]
          }
        case "REMOVE_TODO": 
            var todos = state.todos.filter(todo => todo.id !== +action.id)
            return {...state, todos}
        default: 
            return state;
    }
}

var store = Redux.createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()) 

$(document).ready(function(){
    $("ul").on("click", "button", function(e){
        store.dispatch({
            type: "REMOVE_TODO",
            id: $(e.target).attr("id")
        })
        $(e.target).parent().remove() //gets the parent of  item that the event was triggered on and remove
    })

    $("form").on("submit", (e) => {
        e.preventDefault();
        let newTask = $("#task").val();
        store.dispatch({
            type: "ADD_TODO",
            task: newTask //note we can call this anything 
        });
        let currentState = store.getState()
        let newButton = $("<button>", {
            text:"X",
            id: currentState.id
        })
        let newTodoItem = $("<li>", {
            text: newTask
        });
        $(newTodoItem).append(newButton)
        $("#todos").append(newTodoItem)
        $("form").trigger("reset");
    })
})

