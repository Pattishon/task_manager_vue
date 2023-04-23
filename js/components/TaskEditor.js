export default {
    template: `
    <div 
        class="fixed top-0 right-0 w-full h-full flex justify-end bg-opacity-60 bg-zinc-800 grow"
        @click.self="$emit('closeModal')"
    >   
        
        <form 
            class="bg-zinc-100 h-full w-1/2 py-2 px-4 flex flex-col gap-y-3"
            @submit.prevent="submitTask"
        > 
                <div class='flex justify-between items-center'>
                    <h1 class="text-sm">{{task.id?"Update":"Create new"}} task</h1>
                    <span 
                        class="p-2 cursor-pointer"
                        @click="$emit('closeModal')"
                    >&times;</span>
                </div>
                <input
                    class="border rounded border-zinc-300 py-1 px-2 bg-white drop-shadow-md" 
                    v-model="task.title" placeholder="title">
                <textarea 
                rows=6
                    class="border rounded border-zinc-300 py-1 px-2  bg-white drop-shadow-md"     
                    v-model="task.description" placeholder="description"></textarea>
                <label>
                    Status: 
                    <select 
                        class="border rounded border-zinc-300 py-1 px-2 bg-white drop-shadow-md"
                        v-model="task.status">
                        <option value="to do" selected="task.status==='to do'">To do</option>
                        <option value="in progress" selected="task.status==='in progress'">In progress</option>
                        <option value="done" selected="task.status==='done'">Done</option>
                    </select>
                </label>
                <button
                    class="bg-blue-600 hover:bg-blue-700 rounded-lg text-white w-72 py-2 px-3 mt-2" 
                    type="submit">{{task.id?"Update task":"Create task"}}</button>
            </form>
        </div>
    `,
    props:{
        currentTask: Object
    }, 
    computed:{
            task(){
                return  this.currentTask.id?{...this.currentTask}:{
                    title: "",
                    description: "",
                    status: "to do",
                    // tags: []
                }
            }
        },
    methods: {
        submitTask () {
            if(this.task.id){
                this.$emit('updateTask', this.task)
            } else {
                this.$emit('createTask', this.task)                
            }
            this.$emit('closeModal')
        }
        
    }
}