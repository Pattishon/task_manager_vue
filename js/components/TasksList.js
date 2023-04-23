import Task from "./Task.js"

export default {
    components: { Task },
    template: `
    <section class="w-72">
        <h2 class="font-bold mb-3">{{ title }}</h2>
        <ul class="space-y-2">
            <task 
                v-for="task in tasks" 
                :key="task.id"
                :task="task"
                @showModal="$emit('showModal', $event)"
            />
           
        </ul>
    </section>
    `,
    props: {
        tasks: Array,
        title: String
    }
}