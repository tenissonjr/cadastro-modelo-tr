import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import PrimeVue from 'primevue/config';
import Aura from '@primeuix/themes/aura';
import AppAccordion from './components/ui/AppAccordion/AppAccordion.vue';
import AppAccordionContent from './components/ui/AppAccordion/AppAccordionContent.vue';
import AppAccordionPanel from './components/ui/AppAccordion/AppAccordionPanel.vue';
import AppAccordionHeader from './components/ui/AppAccordion/AppAccordionHeader.vue';

const app = createApp(App)
const pinia = createPinia() 

app.use(pinia)
app.use(PrimeVue, {
    theme: {
        preset: Aura,
    }
});
app.component('AppAccordion', AppAccordion);
app.component('AppAccordionPanel', AppAccordionPanel);
app.component('AppAccordionHeader', AppAccordionHeader);
app.component('AppAccordionContent', AppAccordionContent);
app.mount('#app');