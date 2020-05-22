import Vue from "vue";

const requireComponent = require.context("@/components", true, /\.vue$/);

requireComponent.keys().forEach(fileName => {
    const componentConfig = requireComponent(fileName);
    const componentName = fileName
        .toLowerCase()
        .replace(/^\.\//, "")
        .replace(/\.\w+$/, "")
        .replace("/", "-");
    Vue.component(componentName, componentConfig.default || componentConfig);
});