import Antd from "ant-design-vue"
import "ant-design-vue/dist/antd.css"

const antd = {
  install(app) {
    app.use(Antd);
  },
};

export default antd;
