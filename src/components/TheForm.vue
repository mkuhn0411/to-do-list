<template>
    <section>
        <div>
            <div class="title-container">
                <p class="title">Add a to do list item</p>
                <div 
                    class="title-icon clickable" 
                    :class="{active: $store.state.isFormExpanded}"
                    @click="toggleForm"
                ></div>
            </div>
            <form v-if="$store.state.isFormExpanded" @submit.prevent="checkForm">     
                <div class="inner-form">
                    <div class="form-control">
                        <label for="task-name">Task Name</label>
                        <input 
                            id="task-name" 
                            name="task-name" 
                            v-model.trim="taskName"
                            @input="checkError"
                        >
                        <p class="error" v-if="errors.task">Please fill out task</p>
                    </div>
                    <div class="form-control">
                        <div class="inner-row">
                            <label for="task-description">Task Description</label>
                            <div 
                                class="description-icon clickable" 
                                :class="{active: $store.state.isDescriptionExpanded}"
                                @click="toggleDescription"
                            >&nbsp;</div>
                        </div>
                        <textarea 
                            v-if="$store.state.isDescriptionExpanded"
                            rows="4" 
                            id="task-description" 
                            name="task-description" 
                            v-model.trim="taskDescription"
                            @input="checkError"
                        ></textarea>
                        <p class="error" v-if="errors.description">Please fill out description</p>
                    </div>
                    <div class="form-control">
                        <label for="priority">Priority Level</label>
                        <select id="priority" name="priority" v-model="priority">
                            <option value="low">Low</option>
                            <option value="normal">Normal</option>
                            <option value="high">High</option>
                            <option value="critical">Critical</option>
                        </select>
                    </div>
                    <div class="checkbox-container">
                        <input 
                            type="checkbox" 
                            id="due-date" 
                            name="due-date" 
                            v-model="dueDate" 
                            @change="toggleDueDate($event)"
                        />
                        <label for="due-date">Does this task have a due date?</label>
                    </div>
                    <div v-if="$store.state.isDateExpanded" class="date-container">
                        <Datepicker 
                            v-model="date"
                            class="startDate"
                            :is24="false"
                        ></Datepicker>
                        <p class="error" v-if="errors.date && date === null">Please pick a date</p>
                    </div>
                    <button class="submit">Submit</button>
                </div>
            </form>
        </div>
    </section>
</template>

<script>
import Datepicker from 'vue3-date-time-picker';
import 'vue3-date-time-picker/dist/main.css';
// import { mapActions} from 'vuex';

export default {
    components: 
    { Datepicker },

    data() {
        return {
            taskName: '',
            taskDescription: '',
            priority: 'normal',
            date: null,
            errors: {
                task: false,
                description: false,
                dueDate: false
            }
    
        }
    },
    computed: {
        handleStatus() {
            return {active: this.formShown}
        },
    },
    methods: {
        checkForm() {
            if (this.taskName.length === 0) {
                this.errors.task = true;
            }

            if (this.$store.state.isDescriptionExpanded && this.taskDescription.length === 0) {
                this.errors.description = true;
            }

            console.log(this.$store.state.isDateExpanded)
            if (this.$store.state.isDateExpanded && this.date === null) {
                this.errors.date = true;
            }

            if (!this.errors.task && !this.errors.description && !this.errors.date) {
                this.submitForm();
            }
        },
        checkError() {
            if (this.errors.task && this.taskName.length > 0) {
                this.errors.task = false;
            }

            if (this.errors.description) {
                if (this.taskDescription.length > 0 || !this.$store.state.isDescriptionExpanded)
                this.errors.description = false;
            }

            if (this.errors.date) {
                if (this.date || !this.$store.state.isDateExpanded)
                this.errors.date = false;
            }

        },
        submitForm() {

            let object = {
                item: this.taskName,
                description: this.taskDescription ? this.taskDescription : false,
                priority: this.priority,
                dueDate: this.date ? true : false,
                date: this.date ? this.date.toLocaleString("en-US", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' }) : false
            }

            console.log(object)
            this.$store.dispatch('addTask', object);
          
            this.taskName = '';
            this.priority = 'normal';
            this.taskDescription = '';
            this.descriptionShown = false;
            this.date = null,
            this.dueDate = false;
            this.dateShown = false;
        },
        // ...mapActions(['formExpanded']),
        toggleForm() {
            this.$store.dispatch('formExpanded');
        },
        toggleDescription() {
            this.$store.dispatch('descriptionExpanded');
            this.checkError();
        },
        toggleDueDate() {
            this.$store.dispatch('dateExpanded');
        }
    }
}
</script>

<style >
 .dp__cell_inner {
    height: 20px;
}

.dp__pointer {
    width: 80%;
}

.form-row,
section {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
}

.row {
    justify-content: flex-start;
}

section > div {
    width: 500px;
    display: flex;
    flex-direction: column;
}

.controls-container,
.title-container,
.inner-row {
    display: flex;
    align-items: center;
    justify-content: flex-start;
}

.title-container {
    justify-content: space-between;
    background-color: #5AACDA;
    padding: 7px 0;
}

.title-icon,
.description-icon  {
    background-image: url(https://s3.amazonaws.com/jebbit-assets/images/GyIlxwsk/business-images/nu1DJyivRui74Xbu3BH1_plus_add_.png);
    background-size: 70%;
    background-repeat: no-repeat;
    background-position: center;
    height: 40px;
    width: 40px;
    margin: 0 8px 0 0;
}

.description-icon {
    height: 20px;
    width: 20px;
    margin: 1em 0 .28em 0;
    background-size: 80%;
}

.title-icon.active,
.description-icon.active {
    background-image: url(https://s3.amazonaws.com/jebbit-assets/images/GyIlxwsk/business-images/MlkVESgRTkOTqPn7AWdA_minus_remove_minimize.png);
}

.title {
    font-size: 20px;
    margin: 0 0 0 16px;
}

form {
  margin: 0;
  max-width: 40rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
}

.inner-form {
    padding: 0 2rem 1rem;
}

.form-control {
  margin: 0.5rem 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start
}

.checkbox-container {
    display: flex;
    align-items: center;
    justify-content: flex-start;
}

input {
    width: 80%;
    height: 30px;
    padding: 0;
}

textarea {
    width: 80%;
}

#due-date {
    width: 17px;
    height: 17px;
    margin: 0 5px 0 0;
}

select {
    width: 40%;
    height: 30px;
}

.checkbox-container {
    margin: 2em 0 .28em 0;
}

.checkbox-container label {
    margin: 0;
}

label {
    font-size: 12px;
    margin: 1em 0 .28em 0;
}

button {
    border: none;
    background-color: #0370A6;
    color: #fff;
    padding: 10px 80px;
    margin: 22px 0 0;
    border-radius: 20px;
}

.week .port {
    width: 20px;
    height: 20px;
}

.error {
    display: block;
    margin: 5px 0 0;
    color: red;
    font-size: 12px;
}

</style>