<template>
    <section>
        <div>
            <p class="list-title">Your do list:</p>
            <ListItem
                v-for="tasks in taskList"
                :key="tasks.item"
                :name="tasks.item"
                :priority="tasks.priority"
                :dueDate="tasks.dueDate"
                :date="tasks.date"
                :description="tasks.description"
            ></ListItem>
        </div>
    </section>
</template>

<script>
import ListItem from './ListItem.vue';

export default {
    components: {
        ListItem
    },
    props: {
        taskList: {
            type: Array,
            required: true
        }
    }
}
</script>

<style scoped>
    section {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    div {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 60%;
        max-width: 500px;
    }

    .list-title {
        background-color: #000;
        color: #fff;
        width: 100%;
        font-size: 30px;
        padding: 10px 0;
    }
</style>