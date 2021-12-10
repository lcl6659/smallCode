import Antd from "ant-design-vue"
import "ant-design-vue/dist/antd.less"

const antd = {
  install(app) {
    app.use(Antd);
  },
};

export default antd;
