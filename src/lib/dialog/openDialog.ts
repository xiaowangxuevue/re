import Dialog from "./index.vue";
import { createApp, h } from "vue";

export const openDialog = (
  options = {
    title: () => "标题",
    content: "这是一条消息",
    confirm: () => {},
    cancel: () => {},
  }
) => {
  const { title, content, confirm, cancel } = options;
  const div = document.createElement("div");
  document.body.appendChild(div);

  const close = () => {
    app.unmount();
    div.remove();
  };

  const app = createApp({
    render() {
      return h(
        Dialog,
        {
          modelValue: true,
          "onUpdate:modelValue": (newVisible: boolean) => {
            if (newVisible === false) {
              close();
            }
          },    // onUpdate:modelValue 为属性名，对应到'Dialog'组件中的一个prop,这个函数作为该PROP的监听器，当'modelValue'发生变化，该函数将调用
          confirm,
          cancel,
        },
        {
          title,
          content,
        }
      );
    },
  });

  app.mount(div);
};