<template>
    <div>
        <label for="file" class="btn">Excel</label>
        <input type="file" id="file" style="display:none" @change="fileChange" ref="excelinputer">

        <table border="1" contenteditable="true">
            <tr v-for="(item,index) in dataSource" v-if="index === 0">
                <template v-for="(sub,subindex) in item">
                    <th>{{ (subindex === 0 ? "" : String.fromCharCode(65+subindex-1)) }}</th>
                </template>
            </tr>
        </table>
    </div>
</template>

<script>
import * as XLSX from 'xlsx/xlsx.mjs'
import * as $ from 'jquery'
    export default {
        data() {
            return {
                dataSource:[]
            }
        },
        methods: {
            //获取本地文件
            fileChange(){
                let files = document.getElementById("file").files
                /* console.log(files) */
                this.fileReader(files[0])
            },
            fileReader(file){
                //   console.log(file)
                let that = this;
                if(file.length === 0) return;
                //test返回ture或者false
                if(!/\.xlsx?$/g.test(file.name)){
                    this.$message.warning("上传格式不正确，请上传xls或xlsx格式")
                    return;
                }
                //调用本地读取excel的方法
                that.readWorkbookFromLocalFile(file,(workbook)=>{
                    console.log(workbook)
                    //处理获取到的数据
                    that.readWorkbook(workbook)
                })
            },
            //封装读取本地的excel文件
            readWorkbookFromLocalFile(file,callback){
                var reader = new FileReader();
                reader.onload=function(e){
                    var data = e.target.result;
                    var workbook = XLSX.read(data,{type:"binary"});
                    if(callback) callback(workbook)
                }
                reader.readAsBinaryString(file);
            },
            //封装处理数据的方法
            readWorkbook(workbook){
                var sheetNames = workbook.SheetNames; //工作表名称集合
                var worksheet = workbook.Sheets[sheetNames[0]];//这里我们只读取第一张sheet
                var csv = XLSX.utils.sheet_to_csv(worksheet);
                //console.log(csv)
                //把拿到的数据转化为表格并输出
                var rows = csv.split("\n");
                //console.log(rows)  
                var arr =[];
                rows.forEach((row,idx)=>{
                    var columns = row.split(",");
                    columns.unshift(idx + 1);
                    arr.push(columns)
                })
                this.dataSource = arr;
                console.log(arr)
            },
        },
    }
</script>

<style lang="less" scoped>
.btn{
    line-height: 1;
    cursor: pointer;
    border: 1px solid blue;
    text-align: center;
    padding: 12px 20px;
    border-radius: 0.25rem;
    margin: 20px;
}
table{
    border-collapse: collapse;
    margin-top: 30px;
}
th,td{
    border: 1px solid #d6d6d6;
    padding: 5px 10px;
}
th{
    text-align: center !important;
}
</style>