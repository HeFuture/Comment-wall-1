


import { defineStore } from 'pinia'
import {ref} from 'vue'



const NewCardStore = defineStore("userId",()=>{
    const userIp=ref("")

    const chage=(value)=>{
        isCollapsed.value=value
    }

    return{
        userIp,
    }
})

export default NewCardStore