import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // 搜索的内容
    search_val:'',
    //  动态组件的选择
    base_component: 'information',
    //  搜索类型
    search_type: 1,
    //  表格loading
    table_loading:false,
    //  表格数据
    tableData:[]

  },
  mutations: {
    /**
     * 清空表格
     * @param state
     * @constructor
     * @return {Array}
     */
    ClearTableData(state){
      return state.tableData = []
    },
    /**
     * 往表格添加内容
     * @param state
     * @param val
     * @constructor
     */
    ChangeTableData(state, val){
      state.tableData.push(val)
    },
    /**
     * 修改搜索内容
     * @param state
     * @param val
     * @constructor
     */
    ChangeSearchVal(state, val){
      return state.search_val = val;
    },
    /**
     * 修改显示组件
     * @param state
     * @param val
     * @returns {*}
     * @constructor
     */
    ChangeComponent(state, val){
      return state.base_component = val
    },
    /**
     * 修改搜索类型
     * @param state
     * @param val
     * @returns {*}
     * @constructor
     */
    ChangeSearchType(state, val){
      return state.search_type = val
    },
    /**
     * 修改表格加载状态
     * @param state
     * @param val
     * @returns {*}
     * @constructor
     * @return {boolean}
     */
    ChangeTableLoading(state, val){
      if (val === 1){
        return state.table_loading = true
      }else if(val ===2){
        return state.table_loading = false
      }
    }

  },

  actions: {
  },

  modules: {
  }
})
