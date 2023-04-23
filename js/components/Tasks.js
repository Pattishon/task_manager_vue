import TasksList from "./TasksList.js"
import TaskEditor from "./TaskEditor.js"
export default {
    components: { TasksList, TaskEditor },
    template: `
        <div class="flex gap-2 mt-48 relative">

            <tasks-list title="To do" :tasks="toDoTasks" @showModal="showEditTask" v-if="toDoTasks.length"/> 
            <tasks-list title="In Progress" :tasks="inProgressTasks" @showModal="showEditTask" v-if="inProgressTasks.length" /> 
            <tasks-list title="Done" :tasks="doneTasks" @showModal="showEditTask" v-if="doneTasks.length"/> 
            
            <button
                class="absolute z-90 bottom-10 right-0 bg-blue-600 w-10 h-10 rounded-full drop-shadow-lg flex justify-center items-center text-white text-xl hover:bg-blue-700 hover:drop-shadow-2xl hover:animate-bounce duration-300"
                @click="showCreateTask"
            >+</button>
            <task-editor
                v-if="showModal"    
                @updateTask="updateTask"
                @createTask="createTask"
                @closeModal="showModal=false;currentTask={}"
                :currentTask="currentTask"
            ></task-editor>
            
        </div>
    `, 
    created() {
        fetch("http://localhost:3001/tasks")
            .then(res=> res.json())
            .then(data=> {
                this.tasks = data
            })
    },
    data () {
        return {
            tasks: [],
            showModal: false,
            currentTask: {}
        }
    }, 
    computed: {
        toDoTasks () {
            return this.tasks.filter(t => t.status === "to do")
        },
        inProgressTasks () {
            return this.tasks.filter(t => t.status === "in progress")
        },
        doneTasks () {
            return this.tasks.filter(t => t.status === "done")
        },
    },
    methods: {
        showCreateTask() {
            this.showModal = true
        },        
        showEditTask(id) {
            this.currentTask = this.tasks.find(t=>t.id===id)
            this.showModal = true
        },        
        createTask (task){
            this.tasks.push({...task, id:this.tasks.length+1})
            this.currentTask = {}
        },
        updateTask(task) {
            this.tasks = this.tasks.map(t => {
                if(t.id===task.id){
                    return task
                } else {
                    return t
                }
            })
            this.currentTask = {}
            // call to db
        }
        
    }
}