<template>
    <section>
        <div class="list-item-container" :class="{completed: !taskIncomplete}">
            <div class="row">
                <div class="priority" :class="'' +  priority + ''">{{priority}}</div>
                <div v-if="dueDate" class="time-sensitive">{{date}}</div>
            </div>
            <div class="row list-item">
                <p class="name">{{name}}</p>
                <div class="row icon-container">
                    <div 
                        class="checkmark clickable" 
                        :class="{incomplete: taskIncomplete}"
                        @click="toggleStatus"
                    ></div>
                    <div class="trash clickable" @click="deleteItem(name)"></div>
                </div>
            </div>
            <div class="row list-item" v-if="description.length > 0">
                <p>{{ description }}</p>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    props: {
        name: {
            type: String,
            required: true
        },
        priority: {
            type: String,
            required: true
        },
        timeSensitive: {
            type: Boolean,
            required: true
        },
        dueDate: {
            type: Boolean,
            required: true
        },
        date: {
            type: String,
            required: false
        },
        description: {
            type: String,
            required: false
        }
    },
    data() {
        return {
            taskIncomplete: true
        }
    },
    methods: {
        toggleStatus() {
            this.taskIncomplete = !this.taskIncomplete;
        },
        deleteItem(item) {
            this.$store.dispatch('deleteTask', item);
        }
    },

}
</script>

<style scoped>
section {
    width: 100%;
}

.completed {
    background-color: #00ff99;
}

.row,
.list-item-container {
    display: flex;
    align-items: center;
    justify-content: center;
}

.row.list-item {
    justify-content: space-between;
    width: 100%;
}

.list-item-container {
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
}

.priority {
    color: #fff;
    background-color: #0E7DBA;
    border-radius: 30px;
    padding: 5px 20px;
    font-size: 12px;
}

.time-sensitive {
    font-size: 12px;
    margin: 0 0 0 10px;
}

.priority.critical {
    background-color: #b30000;
}

.priority.high {
    background-color: #ff4d4d;
}

.priority.low {
    background-color: green;
}

.icon-container div {
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    height: 30px;
    width: 30px;
    margin: 0 5px;
}

.name {
    font-size: 24px;
    margin: 7px 0;
}

.checkmark {
    background-image: url(https://s3.amazonaws.com/jebbit-assets/images/GyIlxwsk/business-images/Kob6z8mJR6O6G6Aj4Awi_check_success_checkmark_approve.png);
}

.incomplete {
    filter: grayscale(0.80);
}

.trash {
    background-image: url(https://s3.amazonaws.com/jebbit-assets/images/GyIlxwsk/business-images/xaTUEmecTgG0p0ozHIJx_trash_bin_delete_remove.png);
}

</style>