export default {
    template:`
        <div  class="fixed top-0 right-0 bg-zinc-50 h-full w-1/2 py-2 px-4"> 
            <div class='flex justify-between items-center'>
                <h1>{{ title }}</h1>
                nie wiem co z zamknieciem
                <button 
                    class="p-2"
                    @click="$emit('closeModal')"
                >&times;</button>
            </div>
            <input @input="task.title" placeholder="title">
            <textarea v-model="newTask.description" placeholder="description"></textarea>
            <label>
                Status
                <select v-model="newTask.status">
                    <option value="to do" selected="newTask.status==='to do'">To do</option>
                    <option value="in progress" selected="newTask.status==='in progress'">In progress</option>
                    <option value="done" selected="newTask.status==='done'">Done</option>
                </select>
            </label>
            <button 
                @click="$emit('changeTask', task)"
            >Create task</button>
        </div>
    `, 
    props: {
        title: String,
        task: Object
    }
}