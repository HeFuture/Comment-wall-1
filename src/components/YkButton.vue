<template>
    <div>
        <button :class="[size,nom]" class="yk-btn"><slot></slot></button>
    </div>
</template>

<script setup>

    const props=defineProps({
        size:{
            type:String,
            default:'base'
        },
        nom:{
            type:String,
            default:'primary'
        },
    })
</script>


<style lang="scss" scoped>
    @import '../styles/commons.scss';
    .yk-btn{
        text-align: center;
        border: none;
        cursor: pointer;
        &:hover{
            transition: $tr;
            box-shadow: 1px 1px 4px 1px rgba(0, 0, 0, 0.3);
        }
    }

    // size
    .max{
        min-width: 100px;
        height: 48px;
        border-radius: 24px;
        padding: 0 24px;
    }
    .base{
        width: 80px;
        height: 36px;
        border-radius: 24px;
        padding: 0 20px;
    }
    .small{
        min-width: 72px;
        height: 32px;
        border-radius: 24px;
        padding: 0 20px;
    }

    .primary{
        background: $gray-0;
        color: $gray-4;
    }
    .secondary{
        background: none;
        color: $gray-1;
        border: 1px solid $gray-1;
    }
    .cprimary{
        background: $primary-color;
        color: $gray-4;
        font-weight: 600;
    }
    .csecondary{
        background: $gray-4;
        color: $gray-1;
    }
</style>