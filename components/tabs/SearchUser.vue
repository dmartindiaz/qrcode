<template>
    <!--h1 title component-->
    <h1 class="font-bold text-xl text-primary mb-5">
        <Icon name="material-symbols:person-search" class="mr-2" />Usuarios encontrados
    </h1>
    <!--Tab users show-->
    <div class="flex w-full overflow-x-auto">
        <table class="table-hover table">
            <thead>
                <tr>
                    <th></th>
                    <th>Nombre</th>
                    <th>Email</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <template v-for="(user, i) in userStore.searchUser" :key="i">
                    <tr v-if="i >= state.pageStart && i < (state.pageStart + state.limitPage)">
                        <th>
                            {{ i + 1 }}
                        </th>
                        <td>{{ user.name }} {{ user.lastname }}</td>
                        <td>{{ user.email }}</td>
                        <td>
                            <div class="flex flex-row gap-2">
                                <div class="flex flex-row items-center gap-2">
                                    <label @click="userStore.user = user" for="general-modal-3" class="btn btn-primary">
                                        <Icon name="ic:baseline-payment" class="text-lg" />
                                    </label>
                                </div>
                                <div class="flex flex-row items-center gap-2">
                                    <router-link to = "/pay/historial" @click="userStore.user = user" for="general-modal-3" class="btn">
                                        <Icon name="carbon:ibm-bluepay" class="text-lg" />
                                    </router-link>
                                </div>
                            </div>
                        </td>
                    </tr>
                </template>
            </tbody>
        </table>
    </div>
    <!--Alert-->
    <CommonsAlerts :title="state.titleAlert" :msg="state.msgAlert" :show="state.showAlert" :type="state.typeAlert"
        class="mt-5" />
    <!--Pagination Tab-->
    <div class="pagination mt-5">
        <button @click="Pagination(`back`)" class="btn">
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M12.2574 5.59165C11.9324 5.26665 11.4074 5.26665 11.0824 5.59165L7.25742 9.41665C6.93242 9.74165 6.93242 10.2667 7.25742 10.5917L11.0824 14.4167C11.4074 14.7417 11.9324 14.7417 12.2574 14.4167C12.5824 14.0917 12.5824 13.5667 12.2574 13.2417L9.02409 9.99998L12.2574 6.76665C12.5824 6.44165 12.5741 5.90832 12.2574 5.59165Z"
                    fill="#969696" />
            </svg>
        </button>
        <button class="btn btn-active"><span class="p-2">Página {{ state.page }}</span></button>
        <button @click="Pagination(`next`)" class="btn">
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M7.74375 5.2448C7.41875 5.5698 7.41875 6.0948 7.74375 6.4198L10.9771 9.65314L7.74375 12.8865C7.41875 13.2115 7.41875 13.7365 7.74375 14.0615C8.06875 14.3865 8.59375 14.3865 8.91875 14.0615L12.7437 10.2365C13.0687 9.91147 13.0687 9.38647 12.7437 9.06147L8.91875 5.23647C8.60208 4.9198 8.06875 4.9198 7.74375 5.2448Z"
                    fill="#969696" />
            </svg>
        </button>
    </div>
    <!--Modal
	<ModalsQrShow />
	<ModalsGeneralModal :title="state.deleteModalTitle" :msg="state.deleteModalMsg" :buttonTitle="state.deleteButtonTitle"
		:action="DeleteRow" />
    -->
</template>
<script setup lang = "ts">
import { User } from "../../classes/User"
import { user } from "../../stores/user"

//Dinamic variables
const state = reactive({
    user: new User(),

    page: 1,
    limitPage: 10,
    pageStart: 0,

    deleteModalTitle: "Eliminar usuario" as string,
    deleteModalMsg: "¿Estás seguro de que deseas eliminar este usuario?" as string,
    deleteButtonTitle: "Si, eliminar",

    titleAlert: "No hay usuarios.",
    msgAlert: "No se ha encontrado o buscado ningún usuario.",
    showAlert: true,
    typeAlert: "info"
})

//Store pinia variables
const userStore = user()

const Pagination = (type: "back" | "next") => {
    if (type === "back") {
        if (state.page > 1) {
            state.page -= 1
            state.pageStart -= state.limitPage
        }
    } else {
        if ((userStore.searchUser.length - state.limitPage) > (state.pageStart)) {
            state.page += 1
            state.pageStart += state.limitPage
        }
    }
}

onMounted(() => {
    if (userStore.searchUser.length > 0) {
        state.showAlert = false
    } else {
        state.showAlert = true
    }
})

watch(userStore, () => {
    console.log(userStore.searchUser.length)
    if (userStore.searchUser.length > 0) {
        state.showAlert = false
    } else {
        state.showAlert = true
    }
})




</script>