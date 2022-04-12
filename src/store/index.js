import { createStore } from 'vuex';

const store = createStore({
    state() {
        return {
            currentTask: null,
            isFormExpanded: false,
            isDescriptionExpanded: false,
            isDateExpanded: false,
            taskList: []
        }
    },
    mutations: {
        formExpanded(state) {
            state.isFormExpanded = !state.isFormExpanded;
        },
        descriptionExpanded(state) {
            state.isDescriptionExpanded = !state.isDescriptionExpanded;
        },
        dateExpanded(state) {
            state.isDateExpanded = !state.isDateExpanded;
        },
        addTask(state, payload) {
            state.taskList.push(payload);
            console.log(state.taskList)
        },
        deleteTask(state, payload) {
            const ind = state.taskList.findIndex(task => task.item === payload); 
            state.taskList.splice(ind, 1);
        }
    },
    actions: {
        formExpanded(context) {
            context.commit('formExpanded');
        },
        descriptionExpanded(context) {
            context.commit('descriptionExpanded');
        },
        dateExpanded(context) {
            context.commit('dateExpanded');
        },
        addTask(context, payload) {
            context.commit('addTask', payload);
        },
        deleteTask(context, payload) {
            context.commit('deleteTask', payload);
        },
    }
});

export default store;