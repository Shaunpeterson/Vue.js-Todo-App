function sortList() {
  var list, i, switching, b, shouldSwitch;
  list = document.getElementById("id01");
  switching = true;
  while (switching) {
    switching = false;
    b = list.getElementsByTagName("LI");
    for (i = 0; i < (b.length - 1); i++) {
      shouldSwitch = false;
      if (b[i].innerHTML.toLowerCase() > b[i + 1].innerHTML.toLowerCase()) {
        shouldSwitch = true;
        break;
      }
    }
    if (shouldSwitch) {
      b[i].parentNode.insertBefore(b[i + 1], b[i]);
      switching = true;
    }
  }
}

const STORAGE_KEY = 'vue-todo-app-storage';
 	var todolist = new Vue({
    el: '#todo-list',
        data : {
        state : 'edit',
        completedButton: null,
        activeButton: null,
        allButton: "selected",
        newItem: '',
        
        savelbl: "",
        newdate: '',
        priority: '',
        items:  [{
            		label: 	'submit Vue todo app for review',
                    date:'2021-07-12' ,
                    priority: 'high',
                  },
                ]},

    methods: 	{

	    	saveItem: function(){
	    		if (this.newItem != ''){

	            this.items.push({
	            label:this.newItem,
	            todoCompletionState: "incomplete",
	            todoCompletionToggleButtonState: "",
	            activeButton: null,
	            allButton: "selected",
	            completedButton: null,
	            date : this.newdate,
	            editing: false,
	            priority: this.priority
	            });

	            this.newItem = '';
	            this.newdate = '';
	        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.items))
	          	}
	      	},
	      	changeState: function(newState){
            this.state = newState;
            this.newItem = '';
            this.newdate = '';
            },

	    	sortFunc: function (){
	  			return this.items.slice().sort(function(a, b){
	    		return (a.priority > b.priority) ? 1 : -1;
	  			});
			},

			onChange(){
			console.log('The new value is: ', this.priority)
			},

			toggleTodoCompletionState(item) {
            if (item.todoCompletionToggleButtonState === "" || item.todoCompletionToggleButtonState === false) {
                item.todoCompletionToggleButtonState = "checked";
                item.todoCompletionState = "completed";
            } else if (item.todoCompletionToggleButtonState === "checked" || item.todoCompletionToggleButtonState === true) {
                item.todoCompletionToggleButtonState = "";
                item.todoCompletionState = "incomplete";
            }
            localStorage.setItem(STORAGE_KEY, JSON.stringify(this.items));
        },
        showActive() {
            this.item = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");

            if (this.item.filter(function(item) { return item.todoCompletionState.includes("incomplete") }).length) {
                this.items = this.item.filter(function(item) {
                    return item.todoCompletionState.includes("incomplete");
                });

                this.allButton = null;
                this.activeButton = "selected";
                this.completedButton = null;
                
            } else {
                alert("No active todos found!");
            }
        },
        showCompleted() {
            this.item = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");

            if (this.item.filter(function(item) { return item.todoCompletionState.includes("completed") }).length) {
                this.items = this.item.filter(function(item) {
                    return item.todoCompletionState.includes("completed");
                });
                this.allButton = null;
                this.activeButton = null;
                this.completedButton = "selected";
            } else {
                alert("No completed todos found!");
            }
        },
        showAll() {
            this.items = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");

            this.allButton = "selected";
            this.activeButton = null;
            this.completedButton = null;
        },

			editTodo: function(item) {
		    	item.savelbl = item.label;
		    	item.editing = true;
		    },

			doneEdit: function(item) {
		    	if (item.label != "") item.editing = false;
		    	else alert("task cannot be empty");
		    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.items))
		    },

        	removeitems(item){
        		this.items.splice(this.items.indexOf(item), 1);
            	// this.items.splice(index,1);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(this.items))
          	},

        	clearcompleted (){
        		this.items = this. items.filter(function(item){
        			return item.todoCompletionState.includes("incomplete");

        			this.activeButton = null;
        			this.completedButton = null;
        			this.allButton = "selected";

        		})
            	localStorage.setItem(STORAGE_KEY, JSON.stringify(this.items))
            	// this.items = this.items.filter(function(item) {
          //       return item.todoCompletionState.includes("incomplete");
          	},

        	clearAll: function(){
            this.items = [ ];
            localStorage.setItem(STORAGE_KEY, JSON.stringify(this.items))
          	}
          }, 

		computed: {
	
	        			},
	        
	        created(){
	        	this.items = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
	        },	
      });