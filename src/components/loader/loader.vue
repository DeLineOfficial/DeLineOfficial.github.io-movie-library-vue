<script setup>
import { computed } from 'vue'

const props = defineProps({
    size: {
        type: String,
        default: 'medium',
        validator: (value) => ['small', 'medium', 'large'].includes(value)
    },
    text: {
        type: String,
        default: ''
    },
    inline: {
        type: Boolean,
        default: false
    }
})

const sizeClass = computed(() => `size-${props.size}`)
</script>

<template>
    <div class="loader" :class="[sizeClass, { inline: inline }]">
        <div class="spinner"></div>
        <span v-if="$slots.default || text" class="loader-text">
            <slot>{{ text }}</slot>
        </span>
    </div>
</template>


<style scoped lang="scss">
.loader {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 1rem;
    
    &.inline {
        flex-direction: row;
        gap: 0.5rem;
        padding: 0.5rem;
    }
    .spinner {
        border: 3px solid var(--background-secondary);
        border-top: 3px solid var(--background-accent);
        border-radius: 50%;
        animation: spin 1s linear infinite;
    }
}



.size-small .spinner {
    width: 20px;
    height: 20px;
}

.size-medium .spinner {
    width: 40px;
    height: 40px;
}

.size-large .spinner {
    width: 60px;
    height: 60px;
}

.loader-text {
    margin-top: 16px;
    color: var(--text-disable);
    font-size: 0.9rem;
}

.inline .loader-text {
    margin-top: 0;
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}
</style>