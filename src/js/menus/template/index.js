/*
    menu - template
*/
import $ from '../../util/dom-core.js'
import { getRandom, arrForEach, ajax } from '../../util/util.js'
import Panel from '../panel.js'

// 构造函数
function Template(editor) {
    this.editor = editor
    this.$elem = $('<div class="w-e-menu"><i class="w-e-icon-page-break"><i/></div>')
    this.type = 'panel'

    // 当前是否 active 状态
    this._active = false
    
    this.loadTemplate()
}

Template.prototype = {
    constructor: Template,

    loadTemplate: function(){
        const _this = this
        
        //模板列表
        this.templates = []

        ajax({
            url: _this.editor.config.template + '/data.json',
            type: 'GET',
            success: function(data){
                if(data){
                    data = JSON.parse(data)

                    //初始化图片路径
                    for(let i=0;i<data.length;i++){
                        let tplItem = data[i]
                        tplItem.img = _this.editor.config.template + '/' + tplItem.img
                    }

                    _this.templates = data
                }
            }
        })

    },

    //通过id获取模板内容
    getTemplateHtmlById: function(id){
        for(let i=0, ilen = this.templates.length; i < ilen; i++){
            let tpl = this.templates[i]
            if(tpl.id === id){
                return tpl.html
            }
        }
        return null
    },

    //输出模板列表
    getTemplateHtml: function(){
        let html = '<div><ul class="template-list">'
        for(let i=0, ilen = this.templates.length; i < ilen; i++){
            let tpl = this.templates[i]
            html += `<li class="tpl-demo" data-id="${tpl.id}"><img data-id="${tpl.id}" src="${tpl.img}"></li>`
        }
        html += '</ul></div>'
        return html
    },

    onClick: function() {
        this._createInsertPanel()
    },

    _createInsertPanel: function () {
        const _this = this
        const editor = this.editor
        //id
        const upTriggerId = getRandom('up-trigger')

        //tabs 的配置
        const tabsConfig = [
            {
                title: '元素模板',
                tpl: this.getTemplateHtml(),
                events: [
                    {
                        selector: '.tpl-demo',
                        type: 'click',
                        fn: (e) => {
                            let target = e.target
                            const id = target.getAttribute('data-id')
                            const html = _this.getTemplateHtmlById(id)
                            editor.cmd.do('insertHTML', html) // + '<p><br></p>'
                            return true
                        }
                    }
                ]
            }
        ]

        //创建 panel 并显示
        const panel = new Panel(this, {
            width: 300,
            tabs: tabsConfig
        })
        panel.show()

        this.panel = panel
    }

}

export default Template